import './style.css';

import {
  REG_POPUP_FORM,
  LOGIN_POPUP_FORM,
  SEARCH_FORM,
} from '../js/constants/popup-elements';

import {
  MAIN_API_CONFIG,
  NEWS_API_CONFIG,
} from '../js/constants/api-configs';

import USER_NAME from '../js/constants/user';

import {
  initialRegPopupOptions,
  initialLoginPopupOptions,
  initialSuccessPopupOptions,
  initialHeaderOptions,
  cardsToInitialRender,
} from '../js/constants/main-page-config';

import Header from '../js/components/Header';
import LoginPopup from '../js/components/LoginPopup';
import RegPopup from '../js/components/RegPopup';
import SuccessPopup from '../js/components/SuccessPopup';
import FormValidator from '../js/components/FormValidator';
import SearchForm from '../js/components/SearchForm';
import NewsCardList from '../js/components/NewsCardList';
import MainApi from '../js/api/MainApi';
import NewsApi from '../js/api/NewsApi';

const successPopup = new SuccessPopup(initialSuccessPopupOptions);
const loginPopup = new LoginPopup(initialLoginPopupOptions);
const regPopup = new RegPopup(initialRegPopupOptions);
const newsCardList = new NewsCardList({ cardsToInitialRender });

const mainApi = new MainApi(MAIN_API_CONFIG);
const newsApi = new NewsApi(NEWS_API_CONFIG);

const header = new Header(initialHeaderOptions);
const regPopupForm = new FormValidator(REG_POPUP_FORM);
const loginPopupForm = new FormValidator(LOGIN_POPUP_FORM);
const searchForm = new SearchForm(SEARCH_FORM);

// Dependecies settings

regPopup.setDependecies(
  {
    popup: loginPopup,
    form: regPopupForm,
    api: mainApi,
    successPopup,
  },
);
loginPopup.setDependecies(
  {
    popup: regPopup,
    form: loginPopupForm,
    api: mainApi,
    header,
  },
);
successPopup.setDependecies({ popup: loginPopup });
header.setDependecies({ handler: regPopup.open.bind(regPopup) });
searchForm.setDependecies({ api: newsApi, cardList: newsCardList });
newsCardList.setDependecies({ api: mainApi });

// Elements rendering

searchForm.render();

if (USER_NAME) {
  header.render({ isLoggedIn: true, userName: USER_NAME });
} else {
  header.render({ isLoggedIn: false, userName: '' });
}

loginPopupForm.render();
regPopupForm.render();
