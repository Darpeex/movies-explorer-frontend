// • функция register - принимает почту и пароль, отправляет запрос регистрации на /signup
import Cookies from 'js-cookie'; // зависимость для взаимодействия с cookie
// export const BASE_URL = 'http://localhost:3000';
export const BASE_URL = 'https://api.darpeex.nomoredomainsicu.ru';

// Проверка статуса запроса 
function handleResponse(res) {
  if (res.ok) {
    return res.json()
  } else {
    return Promise.reject(`Ошибка: ${res.status}`)
  }
}

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include', // теперь куки посылаются вместе с запросом
    body: JSON.stringify({ password, email })
  })
    .then(handleResponse)
    .then((res) => res)
};

// • функция login - принимает почту и пароль, отправляет запрос авторизации на /signin . В ответ сервер вернет jwt, который нужно сохранить в Cookie
export const login = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include', // теперь куки посылаются вместе с запросом
    body: JSON.stringify({ password, email })
  })
    .then(handleResponse)
    .then((data) => {
      if (data.token) {
        Cookies.set('jwt', data.token, { expires: 7 });
      }
      return data;
    })
};

// • функция checkToken - принимает jwt, отправляет запрос на /users/me и возвращает данные пользователя
export const checkToken = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include', // теперь куки посылаются вместе с запросом
  })
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}
