import {configApiAuth} from './const.js';

class ApiAuth {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }    
  register({email, password}) {
    return fetch(`${this._url}signup`, {
      method: 'POST',      
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email
      })      
    })
      .then((res) => {
          return this._processResult(res);
      });
  }  
  login({email, password}) {
    return fetch(`${this._url}signin`, {
      method: 'POST',      
      headers: this._headers,
      body: JSON.stringify({
        password: password,        
        email: email
      })      
    })
      .then((res) => {
          return this._processResult(res);
      });
  }  
  verifyToken(token) {
    return fetch(`${this._url}users/me`, {
      method: 'GET',  
      headers: {Authorization: `Bearer ${token}`, ...this._headers}
    })
      .then((res) => {
          return this._processResult(res);
      });
  } 
  _processResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }     
}  

export const apiAuth = new ApiAuth(configApiAuth);