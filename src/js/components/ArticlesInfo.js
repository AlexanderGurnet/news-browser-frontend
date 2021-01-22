/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line consistent-return

import BaseComponent from './BaseComponent';

import {
  RESULTS_ARTICLES_ELEMENT,
  ARTICLES_INFO_TITLE_ELEMENT,
  ARTICLES_INFO_TITLE_HIDDEN_CLASS,
} from '../constants/articles-elements-class';

import {
  ARTICLES,
} from '../constants/page';

import USER_NAME from '../constants/user';
import phrases from '../constants/phrases-for-articles-info-block';

import addClassToElement from '../utils/add-class-to-element';
import removeClassFromElement from '../utils/remove-class-from-element';
import createCard from '../utils/create-card';
import setAppropriatePhrase from '../utils/set-appropriate-phrase';
import sortKeyWords from '../utils/sort-key-words';

export default class ArticlesInfo extends BaseComponent {
  constructor() {
    super();
    this._keyWordsArray = [];
  }

  setDependecies({ api }) {
    this._apiLink = api;
  }

  _addCard(results) {
    results.forEach((article) => {
      this._keyWordsArray.push(article.keyword);
      const card = this._renderCard(
        {
          sourceName: article.source,
          title: article.title,
          description: article.text,
          publishedAt: article.date,
          urlToImage: article.image,
          sourceLink: article.link,
          isLoggedin: !!USER_NAME,
          page: ARTICLES,
          keyWord: article.keyword,
          apiLink: this._apiLink,
          _id: article._id,
        },
      );
      card.render(RESULTS_ARTICLES_ELEMENT);
    });
  }

  render() {
    this._apiLink.getArticles()
      .then((res) => {
        this._articles = res;
      })
      .then(() => {
        this._addCard(this._articles);
        this._create(USER_NAME, this._articles.length);
        this.sortKeyWords(this._keyWordsArray);
        removeClassFromElement(ARTICLES_INFO_TITLE_ELEMENT, ARTICLES_INFO_TITLE_HIDDEN_CLASS);
      })
      .catch((res) => {
        if (this._articles === undefined) {
          removeClassFromElement(ARTICLES_INFO_TITLE_ELEMENT, ARTICLES_INFO_TITLE_HIDDEN_CLASS);
          this._create(USER_NAME, this._articles = 0);
        }
      });
  }

  _createKeyWordsBlock(length) {
    if (length === 0) {
      return '';
    }
    const sortedKeys = sortKeyWords(this._keyWordsArray);
    if (sortedKeys.length === 1) {
      return `<p class="saved-articles__key-words">По ключевым словам:
      <span class="saved-articles__key-word">${sortedKeys[0]}</span>`;
    } if (sortedKeys.length === 2) {
      return `<p class="saved-articles__key-words">По ключевым словам:
        <span class="saved-articles__key-word">${sortedKeys[0]}</span>,
        <span class="saved-articles__key-word">${sortedKeys[1]}</span>`;
    } if (sortedKeys.length >= 3) {
      return `<p class="saved-articles__key-words">По ключевым словам:
        <span class="saved-articles__key-word">${sortedKeys[0]}</span>,
        <span class="saved-articles__key-word">${sortedKeys[1]}</span> и
        <span class="saved-articles__key-word saved-articles__key-word_type_number-of-rest">${sortedKeys[2]}</span></p>`;
    }
  }

  _create(name, length) {
    const articlesInfoContainer = document.createElement('div');
    const articlesInfoMarkup = ` <h2 class="saved-articles__title">Сохраненные статьи</h2>
        <p class="title title_theme_section saved-articles__articles-info">${name}, у вас <span class="saved-articles__number-of-articles">${length}</span> ${setAppropriatePhrase(length, phrases)}</p>
          ${this._createKeyWordsBlock(length)}`;
    articlesInfoContainer.insertAdjacentHTML('afterbegin', articlesInfoMarkup);
    document.querySelector('.saved-articles').append(articlesInfoContainer);
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
      _id,
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
        _id,
      },
    );
  }
}
