import config from '../config.json';

export const BASE_URL = config.API_SERVER_URL;

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(`Ошибка ${response.status}: ${response.statusText}`);
  }
}

export const register = (email, password) => {
  
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "password": password,
      "email": email
    })
  })
  .then(response => handleResponse(response));
}

export const login = (email, password) => {

  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "password": password,
      "email": email
    })
  })
  .then(response => handleResponse(response));
}

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then(response => handleResponse(response));
}
