import BaseComponent from './BaseComponent';
import elementIsReady from '../utils/element-is-ready';
import iterateThroughArrayOfPairs from '../utils/iterate-through-arrays-of-pairs';
import addClassToElement from '../utils/add-class-to-element';
import removeClassFromElement from '../utils/remove-class-from-element';

import {
  PAGE,
  HEADER_TEMPLATE,

  HEADER_ELEMENT,
  BUTTON_LOGOUT_ELEMENT,
  HEADER_NAV_ITEM_ARTICLES_ELEMENT,
  HEADER_NAV_ITEM_LOGOUT_ELEMENT,
  HEADER_NAV_ITEM_LOGIN_ELEMENT,
  HEADER_NAV_ELEMENT,
  HEADER_MENU_TOGGLE_ELEMENT,
  HEADER_LINK_ELEMENT,
  HEADER_LINK_ARTICLES_ELEMENT,

  HEADER_CONTAINER_CLASS,
  HEADER_CONTAINER_HIDDEN_CLASS,
  HEADER_NAV_ITEM_CENTERED_CLASS,
  HEADER_NAV_ITEM_DISABLED_CLASS,
  HEADER_NAV_ITEM_MAIN_PAGE_CLASS,
  HEADER_NAV_ITEM_ARTICLES_PAGE_CLASS,
  HEADER_NAV_SIZE_TWO_CLASS,
  HEADER_NAV_SIZE_ONE_CLASS,
  HEADER_MAIN_PAGE_CLASS,
  HEADER_ARTICLES_PAGE_CLASS,
  HEADER_MENU_TOGGLE_MAIN_PAGE_CLASS,
  HEADER_MENU_TOGGLE_ARTICLES_PAGE_CLASS,
  HEADER_LINK_SELECTED_CLASS,
  HEADER_LINK_UNSELECTED_CLASS,
  BUTTON_LOGOUT_WHITE_CLASS,
  BUTTON_LOGOUT_DARK_CLASS,
  BUTTON_MAIN_CLASS,
} from '../constants/header-elements-and-classes';

import {
  MAIN,
  ARTICLES,
} from '../constants/page';

export default class Header extends BaseComponent {
  constructor(initialOptions) {
    super();
    this._popupIsOpened = false;
    this._container = PAGE;
    this._headerTemplate = HEADER_TEMPLATE;
    this._headerTheme = initialOptions.headerTheme || MAIN;
  }

  setDependecies(options) {
    this._popupClassHandler = options.handler;
  }

  render(renderOptions) {
    this._isLoggedIn = renderOptions.isLoggedIn;
    this._username = renderOptions.userName;

    if (this._isLoggedIn) {
      this._setLoggedInLayout();
    } else {
      this._setNotLoggedInLayout();
    }

    if (this._headerTheme === MAIN) {
      this._setMainPageStyles();
    } else if (this._headerTheme === ARTICLES) {
      this._setArticlesPageStyles();
    }
    this._setEventListeners();
    this._container.prepend(this._headerTemplate);
  }

  show() {
    elementIsReady(`.${HEADER_CONTAINER_CLASS}`).then((element) => {
      removeClassFromElement(element, HEADER_CONTAINER_HIDDEN_CLASS);
    });
  }

  hide() {
    elementIsReady(`.${HEADER_CONTAINER_CLASS}`).then((element) => {
      addClassToElement(element, HEADER_CONTAINER_HIDDEN_CLASS);
    });
  }

  _logout() {
    localStorage.removeItem('username');
    window.location.href = './';
  }

  _setEventListeners() {
    super._setHandlers([
      { element: BUTTON_LOGOUT_ELEMENT, event: 'click', handler: () => this._logout() },
    ]);
    elementIsReady(`.${BUTTON_MAIN_CLASS}`).then((element) => {
      super._setHandlers([
        { element, event: 'click', handler: () => this._popupClassHandler() },
      ]);
    });
  }

  _setLoggedInLayout() {
    removeClassFromElement(HEADER_NAV_ITEM_ARTICLES_ELEMENT, HEADER_NAV_ITEM_DISABLED_CLASS);
    removeClassFromElement(HEADER_NAV_ITEM_LOGOUT_ELEMENT, HEADER_NAV_ITEM_DISABLED_CLASS);
    iterateThroughArrayOfPairs([
      [HEADER_NAV_ITEM_LOGOUT_ELEMENT, HEADER_NAV_ITEM_CENTERED_CLASS],
      [HEADER_NAV_ITEM_LOGIN_ELEMENT, HEADER_NAV_ITEM_DISABLED_CLASS],
      [HEADER_NAV_ELEMENT, HEADER_NAV_SIZE_TWO_CLASS],
    ]);
    BUTTON_LOGOUT_ELEMENT.value = this._username;
  }

  _setNotLoggedInLayout() {
    iterateThroughArrayOfPairs([
      [HEADER_NAV_ELEMENT, HEADER_NAV_SIZE_ONE_CLASS],
      [HEADER_NAV_ITEM_ARTICLES_ELEMENT, HEADER_NAV_ITEM_DISABLED_CLASS],
      [HEADER_NAV_ITEM_LOGIN_ELEMENT, HEADER_NAV_ITEM_CENTERED_CLASS],
      [HEADER_NAV_ITEM_LOGOUT_ELEMENT, HEADER_NAV_ITEM_DISABLED_CLASS],
    ]);
  }

  _setMainPageStyles() {
    iterateThroughArrayOfPairs([
      [HEADER_ELEMENT, HEADER_MAIN_PAGE_CLASS],
      [HEADER_MENU_TOGGLE_ELEMENT, HEADER_MENU_TOGGLE_MAIN_PAGE_CLASS],
      [HEADER_NAV_ELEMENT, HEADER_NAV_ITEM_MAIN_PAGE_CLASS],
      [HEADER_LINK_ELEMENT, HEADER_LINK_SELECTED_CLASS],
      [HEADER_LINK_ARTICLES_ELEMENT, HEADER_LINK_UNSELECTED_CLASS],
      [BUTTON_LOGOUT_ELEMENT, BUTTON_LOGOUT_WHITE_CLASS],
    ]);
  }

  _setArticlesPageStyles() {
    iterateThroughArrayOfPairs([
      [HEADER_ELEMENT, HEADER_ARTICLES_PAGE_CLASS],
      [HEADER_MENU_TOGGLE_ELEMENT, HEADER_MENU_TOGGLE_ARTICLES_PAGE_CLASS],
      [HEADER_NAV_ELEMENT, HEADER_NAV_ITEM_ARTICLES_PAGE_CLASS],
      [HEADER_LINK_ARTICLES_ELEMENT, HEADER_LINK_SELECTED_CLASS],
      [BUTTON_LOGOUT_ELEMENT, BUTTON_LOGOUT_DARK_CLASS],
    ]);
  }
}
