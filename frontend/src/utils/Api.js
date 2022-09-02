import {configApi} from './const.js';

class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }
  _makeHeader(){
    const token = localStorage.getItem('token');
    return {"Authorization": `Bearer ${token}`, ...this._headers};
  }
  getInitialCards() {
    return fetch(`${this._url}cards`, {
      headers: this._makeHeader(),
    })
      .then((res) => {
          return this._processResult(res);
      });
  }
  getProfile() {
    return fetch(`${this._url}users/me`, {
      headers: this._makeHeader(),
    })
      .then((res) => {
        return this._processResult(res);
      });
  }
  getAllData() {
    return Promise.all([this.getInitialCards(), this.getProfile()]);
  }
  saveProfile({name, about}) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._makeHeader(),
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then((res) => {
        return this._processResult(res);
      });
    }
  saveAvatar({avatar}) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._makeHeader(),
      body: JSON.stringify({
        avatar: avatar,
      })
    })
      .then((res) => {
        return this._processResult(res);
    });
  }
  addCard({name, link}) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._makeHeader(),
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then((res) => {
        return this._processResult(res);
      });
  }
  removeCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._makeHeader(),
    })
      .then((res) => {
        return this._processResult(res);
      });
  }
  addLikeCard(cardId) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._makeHeader(),
    })
      .then((res) => {
        return this._processResult(res);
      });
  }
  removeLikeCard(cardId) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._makeHeader(),
    })
      .then((res) => {
        return this._processResult(res);
      });
  }
  changeLikeCardStatus(cardId, isLikedTo) {
      return (isLikedTo) ? this.addLikeCard(cardId) : this.removeLikeCard(cardId)
  }
  _processResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export const api = new Api(configApi);