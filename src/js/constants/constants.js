const PAGE = document.querySelector('.page');

//Header template

const { content: HEADER_TEMPLATE } = document.querySelector('#header');

// Header elements

const HEADER_ELEMENT = HEADER_TEMPLATE.querySelector('.header');
const BUTTON_LOGOUT_ELEMENT = HEADER_TEMPLATE.querySelector('.button_theme_logout');
const HEADER_NAV_ITEM_ARTICLES_ELEMENT = HEADER_TEMPLATE.querySelector('.header__nav-list-item_articles');
const HEADER_NAV_ITEM_LOGOUT_ELEMENT = HEADER_TEMPLATE.querySelector('.header__nav-list-item_logout');
const HEADER_NAV_ITEM_LOGIN_ELEMENT = HEADER_TEMPLATE.querySelector('.header__nav-list-item_login');
const HEADER_NAV_ELEMENT = HEADER_TEMPLATE.querySelector('.header__nav-list');
const HEADER_MENU_TOGGLE_ELEMENT = HEADER_TEMPLATE.querySelector('.header__menu-toggle-label');
const HEADER_LINK_ELEMENT = HEADER_TEMPLATE.querySelector('.header__nav-list-item_main').firstElementChild;
const HEADER_LINK_ARTICLES_ELEMENT = HEADER_TEMPLATE.querySelector('.header__nav-list-item_articles').firstElementChild;


// Header classes
const HEADER_CONTAINER_CLASS = 'header__container';
const HEADER_CONTAINER_HIDDEN_CLASS = 'header__container_hidden';
const HEADER_NAV_ITEM_CENTERED_CLASS = 'header__nav-list-item_centered';
const HEADER_NAV_ITEM_DISABLED_CLASS = 'header__nav-list-item_disabled';
const HEADER_NAV_ITEM_MAIN_PAGE_CLASS = 'header__nav-list_theme_main-page';
const HEADER_NAV_ITEM_ARTICLES_PAGE_CLASS = 'header__nav-list_theme_articles-page';
const HEADER_NAV_SIZE_TWO_CLASS = 'header__nav-list_size_two';
const HEADER_NAV_SIZE_ONE_CLASS = 'header__nav-list_size_one';
const HEADER_MAIN_PAGE_CLASS = 'header_theme_main-page';
const HEADER_ARTICLES_PAGE_CLASS = 'header_theme_articles-page';
const HEADER_MENU_TOGGLE_MAIN_PAGE_CLASS = 'header__menu-toggle-label_theme_main-page';
const HEADER_MENU_TOGGLE_ARTICLES_PAGE_CLASS = 'header__menu-toggle-label_theme_articles-page';
const HEADER_LINK_SELECTED_CLASS = 'header__link_selected';
const HEADER_LINK_UNSELECTED_CLASS = 'header__link_unselected';
const BUTTON_LOGOUT_WHITE_CLASS = 'button_theme_logout-white';
const BUTTON_LOGOUT_DARK_CLASS = 'button_theme_logout-dark';
const BUTTON_MAIN_CLASS = 'button_theme_main';

// Popup Elements

const REG_POPUP_ELEMENT = document.querySelector('.popup_theme_reg');

// Popup Classes

const POPUP_OPENED_CLASS = 'popup_is-opened';


export {
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

  REG_POPUP_ELEMENT,

  POPUP_OPENED_CLASS,
}