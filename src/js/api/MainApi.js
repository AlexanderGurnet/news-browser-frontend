import {
  WRONG_DATA_ERR_MSG,
} from '../constants/error-messages';

export default class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  async _checkIfOk(res) {
    if (res.ok) {
      return res.json();
    }
    const json = await res.json();
    return Promise.reject(json);
  }

  createUser(userObj) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email: userObj.email,
        password: userObj.password,
        name: userObj.name,
      }),
    })
      .then((res) => this._checkIfOk(res))
      .catch((err) => {
        if (err.statusCode === 400) {
          throw new Error(WRONG_DATA_ERR_MSG);
        } else {
          return Promise.reject(err);
        }
      });
  }

  login(userObj) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email: userObj.email,
        password: userObj.password,
      }),
    })
      .then((res) => this._checkIfOk(res))
      .catch((err) => Promise.reject(err));
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => this._checkIfOk(res))
      .catch((err) => Promise.reject(err));
  }

  addArticle(obj) {
    return fetch(`${this._baseUrl}/articles`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          title: obj.title,
          text: obj.text,
          date: obj.date,
          keyword: obj.keyword,
          source: obj.source,
          link: obj.link,
          image: obj.image,
        },
      ),
    })
      .then((res) => this._checkIfOk(res))
      .catch((err) => Promise.reject(err));
  }

  deleteArticle(id) {
    return fetch(`${this._baseUrl}/articles/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => this._checkIfOk(res))
      .catch((err) => Promise.reject(err));
  }

  getArticles() {
    return fetch(`${this._baseUrl}/articles`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => this._checkIfOk(res))
      .catch((err) => Promise.reject(err));
  }
}
