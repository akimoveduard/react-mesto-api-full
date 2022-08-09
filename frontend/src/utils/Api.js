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
        headers: this._headers
      })
        .then(this._handleResponse);
  }

  addCard(name, link) {
    return fetch(`${this._url}/cards`,
    {
      method: 'POST',
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
      headers: this._headers
    })
      .then(this._handleResponse);
  }

  changeLikeCardStatus(data, isLiked) {
    const method = isLiked ? 'PUT' : 'DELETE';
    return fetch(`${this._url}/cards/${data._id}/likes`,
    {
      method: method,
      headers: this._headers
    })
      .then(this._handleResponse);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`,
    {
      method: 'GET',
      headers: this._headers
    })
      .then(this._handleResponse);
  }

  updateProfile(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
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
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-40',
    headers: {
      authorization: 'e17b06e7-9829-4e77-8b13-dc40802d34e8',
      'Content-Type': 'application/json'
    }
  }
);

export default api;