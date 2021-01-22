import BaseComponent from './BaseComponent';

import addClassToElement from '../utils/add-class-to-element';
import removeClassFromElement from '../utils/remove-class-from-element';
import createCard from '../utils/create-card';

import {
  RESULTS_ELEMENT,
  RESULTS_LOADER_ELEMENT,
  RESULTS_ERROR_ELEMENT,
  RESULTS_CARDS_CONTAINER_ELEMENT,
  RESULTS_BUTTON_ELEMENT,
  RESULTS_NOT_FOUND_ELEMENT,
  RESULTS_GRID_ELEMENT,

  RESULTS_HIDDEN_CLASS,
  RESULTS_SHOWN_CLASS,
  RESULTS_LOADER_HIDDEN_CLASS,
  RESULTS_LOADER_SHOWN_CLASS,
  RESULTS_ERROR_HIDDEN_CLASS,
  RESULTS_CARDS_CONTAINER_SHOWN_CLASS,
  RESULTS_CARDS_CONTAINER_HIDDEN_CLASS,
  RESULTS_BUTTON_HIDDEN_CLASS,
  RESULTS_NOT_FOUND_HIDDEN_CLASS,
  RESULTS_NOT_FOUND_SHOWN_CLASS,
} from '../constants/news-card-elements-and-classes';

export default class NewsCardList extends BaseComponent {
  constructor({ cardsToInitialRender, api }) {
    super();
    this._cardsToInitialRender = cardsToInitialRender;
    this._begin = this._cardsToInitialRender;
    this._end = this._cardsToInitialRender * 2;
    this._results = [];
    this._options = {};
    this._apiLink = api;
  }

  setDependecies({ api }) {
    this._apiLink = api;
  }

  renderLoader(isLoading) {
    if (isLoading) {
      removeClassFromElement(RESULTS_ELEMENT, RESULTS_HIDDEN_CLASS);
      addClassToElement(RESULTS_ELEMENT, RESULTS_SHOWN_CLASS);

      removeClassFromElement(RESULTS_LOADER_ELEMENT, RESULTS_LOADER_HIDDEN_CLASS);
      addClassToElement(RESULTS_LOADER_ELEMENT, RESULTS_LOADER_SHOWN_CLASS);
    } else {
      addClassToElement(RESULTS_ELEMENT, RESULTS_HIDDEN_CLASS);
      removeClassFromElement(RESULTS_ELEMENT, RESULTS_SHOWN_CLASS);

      addClassToElement(RESULTS_LOADER_ELEMENT, RESULTS_LOADER_HIDDEN_CLASS);
      removeClassFromElement(RESULTS_LOADER_ELEMENT, RESULTS_LOADER_SHOWN_CLASS);
    }
  }

  renderError(errMessage) {
    if (errMessage) {
      removeClassFromElement(RESULTS_ELEMENT, RESULTS_HIDDEN_CLASS);
      addClassToElement(RESULTS_ELEMENT, RESULTS_SHOWN_CLASS);

      removeClassFromElement(RESULTS_ERROR_ELEMENT, RESULTS_ERROR_HIDDEN_CLASS);
      RESULTS_ERROR_ELEMENT.textContent = errMessage;
    } else {
      addClassToElement(RESULTS_ELEMENT, RESULTS_HIDDEN_CLASS);
      removeClassFromElement(RESULTS_ELEMENT, RESULTS_SHOWN_CLASS);

      addClassToElement(RESULTS_ERROR_ELEMENT, RESULTS_ERROR_HIDDEN_CLASS);
      RESULTS_ERROR_ELEMENT.textContent = '';
    }
  }

  renderNotFound(isShown) {
    if (isShown) {
      removeClassFromElement(RESULTS_ELEMENT, RESULTS_HIDDEN_CLASS);
      addClassToElement(RESULTS_ELEMENT, RESULTS_SHOWN_CLASS);

      removeClassFromElement(RESULTS_NOT_FOUND_ELEMENT, RESULTS_NOT_FOUND_HIDDEN_CLASS);
      addClassToElement(RESULTS_NOT_FOUND_ELEMENT, RESULTS_NOT_FOUND_SHOWN_CLASS);
    } else {
      addClassToElement(RESULTS_ELEMENT, RESULTS_HIDDEN_CLASS);
      removeClassFromElement(RESULTS_ELEMENT, RESULTS_SHOWN_CLASS);

      addClassToElement(RESULTS_NOT_FOUND_ELEMENT, RESULTS_NOT_FOUND_HIDDEN_CLASS);
      removeClassFromElement(RESULTS_NOT_FOUND_ELEMENT, RESULTS_NOT_FOUND_SHOWN_CLASS);
    }
  }

  clear() {
    this._results = [];
    this._options = {};
    this._begin = this._cardsToInitialRender;
    this._end = this._cardsToInitialRender * 2;
    super._removeEventListeners();
    while (RESULTS_GRID_ELEMENT.firstChild) {
      RESULTS_GRID_ELEMENT.firstChild.remove();
    }
  }

  _renderPartialy(results) {
    if (this._end >= this._results.length) {
      addClassToElement(RESULTS_BUTTON_ELEMENT, RESULTS_BUTTON_HIDDEN_CLASS);
    }
    this._addCard(results.slice(this._begin, this._end), this._options);
    this._begin += this._cardsToInitialRender;
    this._end = this._begin + this._cardsToInitialRender;
  }

  _addCard(results, options) {
    results.forEach((article) => {
      const card = this._renderCard(
        {
          sourceName: article.source.name,
          title: article.title,
          description: article.description,
          publishedAt: article.publishedAt,
          urlToImage: article.urlToImage,
          sourceLink: article.url,
          isLoggedin: options.isLoggedin,
          page: options.page,
          keyWord: options.keyWord,
          apiLink: this._apiLink,
        },
      );
      card.render(RESULTS_GRID_ELEMENT);
    });
  }

  renderCards(results, options) {
    if (results) {
      this._results = results;
      this._options = options;
      this._setEventListeners();

      removeClassFromElement(RESULTS_ELEMENT, RESULTS_HIDDEN_CLASS);
      addClassToElement(RESULTS_ELEMENT, RESULTS_SHOWN_CLASS);

      removeClassFromElement(RESULTS_CARDS_CONTAINER_ELEMENT, RESULTS_CARDS_CONTAINER_HIDDEN_CLASS);
      addClassToElement(RESULTS_CARDS_CONTAINER_ELEMENT, RESULTS_CARDS_CONTAINER_SHOWN_CLASS);

      if (results.length <= this._cardsToInitialRender) {
        addClassToElement(RESULTS_BUTTON_ELEMENT, RESULTS_BUTTON_HIDDEN_CLASS);
        this._addCard(this._results, this._options);
      } else {
        removeClassFromElement(RESULTS_BUTTON_ELEMENT, RESULTS_BUTTON_HIDDEN_CLASS);
        this._addCard(this._results.slice(0, this._cardsToInitialRender), this._options);
      }
    } else {
      addClassToElement(RESULTS_ELEMENT, RESULTS_HIDDEN_CLASS);
      removeClassFromElement(RESULTS_ELEMENT, RESULTS_SHOWN_CLASS);

      addClassToElement(RESULTS_CARDS_CONTAINER_ELEMENT, RESULTS_CARDS_CONTAINER_HIDDEN_CLASS);
      removeClassFromElement(RESULTS_CARDS_CONTAINER_ELEMENT, RESULTS_CARDS_CONTAINER_SHOWN_CLASS);
    }
  }

  _setEventListeners() {
    super._setHandlers([
      { element: RESULTS_BUTTON_ELEMENT, event: 'click', handler: () => this._renderPartialy(this._results, this._options) },
    ]);
  }

  _renderCard(
    {
      sourceName,
      title,
      description,
      urlToImage,
      publishedAt,
      sourceLink,
      isLoggedin,
      page,
      keyWord,
      apiLink,
    },
  ) {
    return createCard(
      {
        sourceName,
        title,
        description,
        urlToImage,
        publishedAt,
        sourceLink,
        isLoggedin,
        page,
        keyWord,
        apiLink,
      },
    );
  }
}
