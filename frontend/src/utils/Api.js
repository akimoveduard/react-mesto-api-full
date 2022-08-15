import config from '../config.json';

class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _handleResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Ошибка ${response.status}`);
    }
  }

  getCards() {
    return fetch(`${this._url}/cards`,
      {
        method: 'GET',
        credentials: 'include',
        headers: this._headers
      })
        .then(this._handleResponse);
  }

  addCard(name, link) {
    return fetch(`${this._url}/cards`,
    {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(this._handleResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`,
    {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers
    })
      .then(this._handleResponse);
  }

  changeLikeCardStatus(data, isLiked) {
    const method = isLiked ? 'PUT' : 'DELETE';
    return fetch(`${this._url}/cards/${data._id}/likes`,
    {
      method: method,
      credentials: 'include',
      headers: this._headers
    })
      .then(this._handleResponse);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`,
    {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    })
      .then(this._handleResponse);
  }

  updateProfile(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(this._handleResponse);
  }

  updateAvatar(url) {
    return fetch(`${this._url}/users/me/avatar`,
    {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify ({
        avatar: url
      })
    })
      .then(this._handleResponse);
  }

}

const api = new Api(
  {
    baseUrl: config.API_SERVER_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  }
);

export default api;