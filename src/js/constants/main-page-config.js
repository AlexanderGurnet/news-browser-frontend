import {
  REG_POPUP_ELEMENT,
  REG_POPUP_CLOSE_ELEMENT,

  LOGIN_POPUP_ELEMENT,
  LOGIN_POPUP_CLOSE_ELEMENT,

  SUCCES_POPUP_ELEMENT,
  SUCCES_POPUP_CLOSE_ELEMENT,
} from './popup-elements';

const initialRegPopupOptions = {
  container: REG_POPUP_ELEMENT,
  closeButton: REG_POPUP_CLOSE_ELEMENT,
};

const initialLoginPopupOptions = {
  container: LOGIN_POPUP_ELEMENT,
  closeButton: LOGIN_POPUP_CLOSE_ELEMENT,
};

const initialSuccessPopupOptions = {
  container: SUCCES_POPUP_ELEMENT,
  closeButton: SUCCES_POPUP_CLOSE_ELEMENT,
};
const initialHeaderOptions = { headerTheme: 'main' };
const cardsToInitialRender = 3;

export {
  initialRegPopupOptions,
  initialLoginPopupOptions,
  initialSuccessPopupOptions,
  initialHeaderOptions,
  cardsToInitialRender,
};
