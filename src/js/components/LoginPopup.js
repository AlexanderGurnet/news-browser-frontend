import Popup from './Popup';

import {
  LOADING_TEXT,
  LOGIN_TEXT,
} from '../constants/buttons-content';

export default class LoginPopup extends Popup {
  constructor(initialOptions) {
    super(initialOptions);
    this._serverError = this._container.querySelector('.popup__error_centered');
  }

  setDependecies(
    {
      popup,
      form,
      api,
      header,
    },
  ) {
    super.setDependecies({ popup, form, api });
    this._headerLink = header;
  }

  setServerError(msg = '') {
    this._serverError.textContent = msg;
  }

  open() {
    super.open();
    super._setHandlers([
      { element: this.button, event: 'click', handler: (e) => this._handleUserLogin(e) },
    ]);
  }

  _handleUserLogin(e) {
    e.preventDefault();
    const arr = super.getInfo();
    const userObj = {
      email: arr[0],
      password: arr[1],
    };
    this.button.textContent = LOADING_TEXT;
    this.setServerError();
    this._apiLink.login(userObj)
      .then((user) => {
        this.button.textContent = LOGIN_TEXT;
        return user;
      })
      .then((json) => {
        // localStorage.setItem('jwt', json.token);
        localStorage.setItem('username', json.message);
        this._headerLink.render({ isLoggedIn: true, userName: json.message });
        this.close();
      })
      .then(() => this._apiLink.getUserInfo())
      .then(() => window.location.reload())
      .catch((err) => {
        this.button.textContent = LOGIN_TEXT;
        this.setServerError(err.message);
      });
  }
}
