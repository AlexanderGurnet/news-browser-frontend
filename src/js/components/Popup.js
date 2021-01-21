import BaseComponent from './BaseComponent';

// import { REG_POPUP_CHANGE_BTN_ELEMENT } from '../constants/constants';

export default class Popup extends BaseComponent {
  constructor(initialOptions) {
    super();
    this._container = initialOptions.container;
    this._closeButton = initialOptions.closeButton;
    this._changeButton = this._container.querySelector('.popup__change-popup-button');
    this.button = this._container.querySelector('.button');
  }

  setDependecies({ popup, form, api }) {
    this._popupLink = popup;
    this._formLink = form;
    this._apiLink = api;
  }

  getInfo() {
    return this._formLink.getInfo();
  }

  _openInjectedPopup(e) {
    e.preventDefault();
    this.close();
    this._popupLink.open();
    this._formLink.clear();
  }

  open() {
    this._container.classList.add('popup_is-opened');
    this._setEventListeners();
  }

  close() {
    this._formLink.clear();
    this._container.classList.remove('popup_is-opened');
    super._removeEventListeners();
  }

  _closeByKey(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }

  _closeByClick(e) {
    if (e.target.classList.contains('popup') || e.target.classList.contains('popup__close')) {
      this.close();
    }
  }

  _setEventListeners() {
    super._setHandlers([
      { element: this._changeButton, event: 'click', handler: (e) => this._openInjectedPopup(e) },
      { element: this._container, event: 'click', handler: (e) => this._closeByClick(e) },
      { element: document, event: 'keydown', handler: (e) => this._closeByKey(e) },
    ]);
  }
}
