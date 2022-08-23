export default class Api {
  constructor(options) {
    this._options = options;
  }

  getCards() {
    const promise = fetch(`${this._options.baseUrl}/cards`, {
      method: 'GET',
      headers: this._options.headers
    })
    return this._checkResponse(promise);
  }

  getUserInfo() {
    const promise = fetch(`${this._options.baseUrl}/users/me`, {
      method: 'GET',
      headers: this._options.headers
    })
    return this._checkResponse(promise);
  }

  updateUserInfo(name, about) {
    const promise = fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    return this._checkResponse(promise);
  }

  createNewCard(name, link) {
    const promise = fetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    return this._checkResponse(promise);
  }

  setLike(cardId) {
    const promise = fetch(`${this._options.baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._options.headers
    })
    return this._checkResponse(promise);
  }

  deleteLike(cardId) {
    const promise = fetch(`${this._options.baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._options.headers
    })
    return this._checkResponse(promise);
  }

  updateUserAvatar(avatarLink) {
    const promise = fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        avatar: avatarLink
      })
    })
    return this._checkResponse(promise);
  }

  deleteCard(cardId) {
    const promise = fetch(`${this._options.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._options.headers
    })
    return this._checkResponse(promise);
  }

  _checkResponse(promise) {
    return promise.then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}

