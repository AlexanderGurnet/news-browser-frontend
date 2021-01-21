import Popup from './Popup';

import {
  LOADING_TEXT,
  SIGNUP_TEXT,
} from '../constants/buttons-content';

export default class RegPopup extends Popup {
  constructor(initialOptions) {
    super(initialOptions);
    this._serverError = this._container.querySelector('.popup__error_centered');
  }

  setDependecies(
    {
      popup,
      form,
      api,
      successPopup,
    },
  ) {
    super.setDependecies({ popup, form, api });
    this._successPopupLink = successPopup;
  }

  setServerError(msg = '') {
    this._serverError.textContent = msg;
  }

  open() {
    super.open();
    super._setHandlers([
      { element: this.button, event: 'click', handler: (e) => this._handleUserSending(e) },
    ]);
  }

  _handleUserSending(e) {
    e.preventDefault();
    const arr = super.getInfo();
    const userObj = {
      email: arr[0],
      password: arr[1],
      name: arr[2],
    };
    this.button.textContent = LOADING_TEXT;
    this.setServerError();
    this._apiLink.createUser(userObj)
      .then(() => {
        this.button.textContent = SIGNUP_TEXT;
      })
      .then(() => {
        this._successPopupLink.open();
        this.close();
      })
      .catch((err) => {
        this.button.textContent = SIGNUP_TEXT;
        this.setServerError(err.message);
      });
  }
}
