export const BASE_URL = 'https://auth.nomoreparties.co';

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
    headers: {
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
    headers: {
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
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }
  })
  .then(response => handleResponse(response));
}
