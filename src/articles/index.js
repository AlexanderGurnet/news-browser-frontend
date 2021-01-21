import './style.css';

import MainApi from '../js/api/MainApi';
import Header from '../js/components/Header';
import ArticlesInfo from '../js/components/ArticlesInfo';

import { MAIN_API_CONFIG } from '../js/constants/api-configs';
import USER_NAME from '../js/constants/user';

const mainApi = new MainApi(MAIN_API_CONFIG);
const header = new Header({ headerTheme: 'articles' });
const articlesInfo = new ArticlesInfo();

articlesInfo.setDependecies({ api: mainApi });

if (!USER_NAME) {
  window.location.href = '../';
}

header.render({ isLoggedIn: true, userName: USER_NAME });
articlesInfo.render();
