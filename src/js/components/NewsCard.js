/* eslint-disable no-console */
import BaseComponent from './BaseComponent';

import { DEFAULT_IMG_URL } from '../constants/data-for-utils';

import toNormalDate from '../utils/to-normal-date';
import sanitizeHTML from '../utils/sanitize-html';
import setDefaultImage from '../utils/set-default-image';

import {
  MAIN,
  ARTICLES,
} from '../constants/page';

export default class NewsCard extends BaseComponent {
  constructor(
    {
      sourceName,
      title,
      description,
      publishedAt,
      urlToImage,
      sourceLink,
      isLoggedin,
      page,
      keyWord,
      apiLink,
      _id,
    },
  ) {
    super();
    this._sourceName = sourceName;
    this._title = title;
    this._description = description;
    this._publishedAt = publishedAt;
    this._urlToImage = urlToImage;
    this._sourceLink = sourceLink;
    this._isLoggedin = isLoggedin;
    this._page = page;
    this._keyWord = keyWord || '';
    this._apiLink = apiLink;
    this._isNotClicked = true;
    this._id = _id;
  }

  _renderIcon() {
    let iconHtml;
    if (this._isLoggedin && this._page === ARTICLES) {
      iconHtml = `<div class="results__grid-card-mark-sign results__grid-card-mark-sign_theme_visible">${this._keyWord}</div>
      <button class="results__grid-card-mark results__grid-card-mark_theme_bin"></button>
      <div class="results__grid-card-mark-sign results__grid-card-mark-sign_logged-in results__grid-card-mark-sign_theme_invisible">Убрать из сохранённых</div>`;
    } else if (this._isLoggedin && this._page === MAIN) {
      iconHtml = '<button class="results__grid-card-mark results__grid-card-mark_logged-in results__grid-card-mark_unselected"></button>';
    } else {
      iconHtml = `<button class="results__grid-card-mark results__grid-card-mark_not-logged-in results__grid-card-mark_unselected"></button>
      <div class="results__grid-card-mark-sign results__grid-card-mark-sign_not-logged-in results__grid-card-mark-sign_theme_invisible">Войдите, чтобы сохранять статьи</div>`;
    }
    return iconHtml;
  }

  create() {
    this._processedImg = setDefaultImage(this._urlToImage);
    const cardContainer = document.createElement('div');
    const cardHtml = `<article class="results__grid-card">
    ${this._renderIcon()}
    <a class="results__grid-card-link" target="_blank" href="${this._sourceLink}">
      <img class="results__grid-card-img" src="${this._processedImg}" onerror="this.onerror=null;this.src='${DEFAULT_IMG_URL}';" alt="картинка новостной карточки">
      <div class="results__grid-card-container">
        <time class="results__grid-card-date" datetime="${this._publishedAt}">${toNormalDate(this._publishedAt)}</time>
        <h3 class="title title_theme_grid-card">${this._title}</h3>
        <p class="subtitle subtitle_theme_grid-card">${sanitizeHTML(this._description)}</p>
        <p class="results__grid-card-source">${this._sourceName}</p>
      </div>
    </a>
  </article>`;
    cardContainer.insertAdjacentHTML('afterbegin', cardHtml);
    this._cardContainer = cardContainer;
    return cardContainer;
  }

  render(container) {
    container.append(this.create());
    this._setEventListeners();
  }

  _handleSaveButton(button) {
    if (this._isNotClicked) {
      this._isNotClicked = false;
      const obj = {
        keyword: this._keyWord,
        title: this._title,
        text: this._description,
        date: toNormalDate(this._publishedAt),
        source: this._sourceName,
        link: this._sourceLink,
        image: this._processedImg,
      };
      this._apiLink.addArticle(obj)
        .then((res) => {
          button.classList.remove('results__grid-card-mark_unselected');
          button.classList.add('results__grid-card-mark_selected');
          this._id = res._id;
        })
        .catch((err) => console.log(err));
    } else {
      this._isNotClicked = true;
      this._apiLink.deleteArticle(this._id)
        .then(() => {
          button.classList.add('results__grid-card-mark_unselected');
          button.classList.remove('results__grid-card-mark_selected');
        })
        .catch((err) => console.log(err));
    }
  }

  _handleDeleteButton() {
    this._apiLink.deleteArticle(this._id)
      .then(() => {
        this._cardContainer.remove();
        super._removeEventListeners();
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }

  _setEventListeners() {
    const button = this._cardContainer.querySelector('.results__grid-card-mark');
    if (button.classList.contains('results__grid-card-mark_logged-in')) {
      super._setHandlers([
        { element: button, event: 'click', handler: () => this._handleSaveButton(button) },
      ]);
    } else if (button.classList.contains('results__grid-card-mark_theme_bin')) {
      super._setHandlers([
        { element: button, event: 'click', handler: () => this._handleDeleteButton() },
      ]);
    }
  }
}
