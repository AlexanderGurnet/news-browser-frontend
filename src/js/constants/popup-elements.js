// Popup elements

const REG_POPUP_ELEMENT = document.querySelector('.popup_theme_reg');
const REG_POPUP_CLOSE_ELEMENT = REG_POPUP_ELEMENT.querySelector('.popup__close');

const LOGIN_POPUP_ELEMENT = document.querySelector('.popup_theme_login');
const LOGIN_POPUP_CLOSE_ELEMENT = LOGIN_POPUP_ELEMENT.querySelector('.popup__close');

const SUCCES_POPUP_ELEMENT = document.querySelector('.popup_theme_success');
const SUCCES_POPUP_CLOSE_ELEMENT = SUCCES_POPUP_ELEMENT.querySelector('.popup__close');

// Form elements

const REG_POPUP_FORM = REG_POPUP_ELEMENT.querySelector('form[name="reg"]');
const LOGIN_POPUP_FORM = LOGIN_POPUP_ELEMENT.querySelector('form[name="login"]');
const SEARCH_FORM = document.querySelector('form[name="search"]');

export {
  REG_POPUP_ELEMENT,
  REG_POPUP_CLOSE_ELEMENT,

  LOGIN_POPUP_ELEMENT,
  LOGIN_POPUP_CLOSE_ELEMENT,

  SUCCES_POPUP_ELEMENT,
  SUCCES_POPUP_CLOSE_ELEMENT,

  REG_POPUP_FORM,
  LOGIN_POPUP_FORM,
  SEARCH_FORM,
};
