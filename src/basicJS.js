const authButton = document.querySelector('.button_theme_main');
const regPopup = document.querySelector('.popup_theme_reg');
const loginPopup = document.querySelector('.popup_theme_login');
const header = document.querySelector('.header__container');

authButton.addEventListener('click', () => {
  regPopup.classList.add('popup_is-opened');
  if (window.innerWidth <= 500) {
    header.classList.add('header__container_hidden');
  }
});

loginPopup.addEventListener('click', (e) => {
  if (e.target.classList.contains('popup') || e.target.classList.contains('popup__close')) {
    loginPopup.classList.remove('popup_is-opened');
    header.classList.remove('header__container_hidden');
  }
});

loginPopup.querySelector('.popup__change-popup-button').addEventListener('click', (e) => {
  e.preventDefault();
  loginPopup.classList.remove('popup_is-opened');
  regPopup.classList.add('popup_is-opened');
  if (window.innerWidth <= 500) {
    header.classList.add('header__container_hidden');
  }
});

regPopup.addEventListener('click', (e) => {
  if (e.target.classList.contains('popup') || e.target.classList.contains('popup__close')) {
    regPopup.classList.remove('popup_is-opened');
    header.classList.remove('header__container_hidden');
  }
});

regPopup.querySelector('.popup__change-popup-button').addEventListener('click', (e) => {
  e.preventDefault();
  regPopup.classList.remove('popup_is-opened');
  loginPopup.classList.add('popup_is-opened');
  if (window.innerWidth <= 500) {
    header.classList.add('header__container_hidden');
  }
});
