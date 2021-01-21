export default class BaseComponent {
  constructor() {
    this._handlers = [];
  }

  _setHandlers(handlersOptions = []) {
    this._handlersOptions = handlersOptions;

    this._handlersOptions.forEach((handlersOption) => {
      const { element, event, handler } = handlersOption;
      this._handlers.push({ element, event, handler });
      element.addEventListener(event, handler);
    });
  }

  _removeEventListeners() {
    this._handlers.forEach(({ element, event, handler }) => {
      element.removeEventListener(event, handler);
    });
  }
}
