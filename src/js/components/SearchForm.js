import BaseComponent from './BaseComponent';

import setSubmitButtonState from '../utils/set-submit-button-state';

import USER_NAME from '../constants/user';
import {
  SEARCHING_TEXT,
  SEARCH_TEXT,
} from '../constants/buttons-content';

import {
  REQUIRED_CHARS_TEXT_ERR_MSG,
  REQUIRED_FIELD_ERR_MSG,
} from '../constants/error-messages';

export default class SearchForm extends BaseComponent {
  constructor(form) {
    super();
    this._form = form;
    this._button = this._form.querySelector('.button_theme_search');
    this._input = this._form.querySelector('.search__form-input');
    this._errorSpan = this._form.querySelector('.search__form-error');
  }

  setDependecies({ api, cardList }) {
    this._newsApiLink = api;
    this._newsCardList = cardList;
  }

  render() {
    this._setEventListeners();
  }

  _handleButtonClick(e) {
    e.preventDefault();
    this._checkInputValidity(this._input, this._errorSpan);
    if (this._input.value) {
      const options = { isLoggedin: USER_NAME, page: 'main', keyWord: this._input.value };
      this._newsCardList.clear();
      this._newsCardList.renderNotFound(false);
      this._newsCardList.renderCards(false, options);
      this._newsCardList.renderError(false);
      this._newsCardList.renderLoader(true);
      this._button.textContent = SEARCHING_TEXT;
      this._button.disabled = true;
      this._newsApiLink.getNews()
        .then((res) => {
          this._newsCardList.renderLoader(false);
          this._button.disabled = false;
          this._button.textContent = SEARCH_TEXT;
          return res;
        })
        .then((res) => {
          if (res.articles.length !== 0) {
            this._newsCardList.renderCards(res.articles, options);
          } else {
            this._newsCardList.renderNotFound(true);
          }
        })
        .catch((err) => {
          this._newsCardList.renderLoader(false);
          this._newsCardList.renderError(err.message);
          this._button.disabled = false;
          this._button.textContent = SEARCH_TEXT;
        });
    }
  }

  _checkInputValidity(input, errSpan) {
    const errorElem = errSpan;

    if (input.validity.valueMissing) {
      errorElem.textContent = REQUIRED_FIELD_ERR_MSG;
    } else if (input.validity.valid) {
      errorElem.textContent = '';
    } else if (input.validity.tooShort || input.validity.tooLong) {
      errorElem.textContent = REQUIRED_CHARS_TEXT_ERR_MSG;
    }
    setSubmitButtonState(this._form, this._button);
  }

  _setEventListeners() {
    super._setHandlers([
      { element: this._input, event: 'input', handler: () => this._checkInputValidity(this._input, this._errorSpan) },
      { element: this._button, event: 'click', handler: (e) => this._handleButtonClick(e) },
    ]);
  }
}
