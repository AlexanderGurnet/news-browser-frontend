import BaseComponent from './BaseComponent';

export default class SuccesPopup extends BaseComponent {
  constructor(initialOptions) {
    super();
    this._container = initialOptions.container;
    this._closeButton = initialOptions.closeButton;
    this._changeButton = this._container.querySelector('.popup__change-popup-button');
  }

  setDependecies({ popup }) {
    this._popupLink = popup;
  }

  _openInjectedPopup(e) {
    e.preventDefault();
    this.close();
    this._popupLink.open();
  }

  open() {
    this._container.classList.add('popup_is-opened');
    this._setEventListeners();
  }

  close() {
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
