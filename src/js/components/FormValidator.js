import BaseComponent from './BaseComponent';

import makeArrayFrom from '../utils/make-array-from';
import setSubmitButtonState from '../utils/set-submit-button-state';

import {
  REQUIRED_CHARS_PASSWORD_ERR_MSG,
  REQUIRED_CHARS_TEXT_ERR_MSG,
  WRONG_FORMAT_ERR_MSG,
  REQUIRED_FIELD_ERR_MSG,
} from '../constants/error-messages';

export default class FormValidator extends BaseComponent {
  constructor(form) {
    super();
    this._form = form;
    this._button = this._form.querySelector('button');
    this._inputs = this._form.querySelectorAll('.popup__input');
    this._errorSpans = this._form.querySelectorAll('.popup__error');
  }

  render() {
    this._checkInitialInputValidity();
    this.clear();
  }

  _checkInitialInputValidity() {
    makeArrayFrom(this._form.elements).forEach((input) => {
      const errorMsgElem = this._form.querySelector(`.popup__error[data-for="${input.name}"]`);
      if (!input.classList.contains('button') && !input.classList.contains('popup__change-popup-button')) {
        this._checkInputValidity(input, errorMsgElem);
        this._setEventListeners(input, errorMsgElem);
      }
    });
  }

  _setEventListeners(input, errorMsg) {
    super._setHandlers([
      { element: input, event: 'input', handler: () => this._checkInputValidity(input, errorMsg) },
    ]);
  }

  _checkInputValidity(input, errorMsgElem) {
    const errorElem = errorMsgElem;
    if (input.type === 'text' || input.type === 'password') {
      if (input.validity.valueMissing) {
        errorElem.textContent = REQUIRED_FIELD_ERR_MSG;
      } else if (input.validity.patternMismatch) {
        errorElem.textContent = WRONG_FORMAT_ERR_MSG;
      } else if (input.validity.valid) {
        errorElem.textContent = '';
      }
    }
    if (input.validity.tooShort || input.validity.tooLong) {
      errorElem.textContent = input.type === 'password' ? REQUIRED_CHARS_PASSWORD_ERR_MSG : REQUIRED_CHARS_TEXT_ERR_MSG;
    }

    setSubmitButtonState(this._form, this._button);
  }

  clear() {
    this._resetContent();
    this._resetErrorMsg();
    setSubmitButtonState(this._form, this._button);
  }

  getInfo() {
    const arr = [];
    makeArrayFrom(this._inputs).forEach((input) => {
      arr.push(input.value);
    });
    return arr;
  }

  _resetContent() {
    makeArrayFrom(this._inputs).forEach((input) => {
      const inputElement = input;
      inputElement.value = '';
    });
  }

  _resetErrorMsg() {
    makeArrayFrom(this._errorSpans).forEach((error) => {
      const errorElement = error;
      errorElement.textContent = '';
    });
  }
}
