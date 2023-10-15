// import Cookies from 'js-cookie'; // библиотека для работы с cookie

// // Класс взаимодействия с сервером
// class Api {
//   #url;
//   #headers;

//   constructor(data) {
//     this.#url = data.url; // ссылка на сервер
//     this.#headers = {
//       ...data.headers,
//       authorization: `Bearer ${Cookies.get('auth_token')}`,
//     };
//   }

//   // Проверка статуса запроса
//   #handleResponse(res) {
//     if (res.ok) {
//       return res.json()
//     } else {
//       return Promise.reject(`Ошибка: ${res.status}`)
//     }
//   }

//   // Загрузка информации о пользователе с сервера
//   getUserInfo() {
//     return fetch(`${this.#url}/users/me`, {
//       headers: this.#headers,
//       credentials: 'include', // теперь куки посылаются вместе с запросом
//     })
//       .then(this.#handleResponse)
//   }

//   // Запрос карточек с сервера
//   getInitialCards() {
//     return fetch(`${this.#url}/cards`, {
//       headers: this.#headers,
//       credentials: 'include', // теперь куки посылаются вместе с запросом
//     })
//       .then(this.#handleResponse)
//   }

//   // Редактирование профиля
//   setUserInfo({ name, description }) {
//     return fetch(`${this.#url}/users/me`, {
//       method: 'PATCH',
//       headers: this.#headers,
//       credentials: 'include', // теперь куки посылаются вместе с запросом
//       body: JSON.stringify({
//         name: name, // имя
//         about: description // о себе
//       })
//     })
//       .then(this.#handleResponse)
//   }

//   // Добавление новой карточки
//   addNewCard(data) {
//     return fetch(`${this.#url}/cards`, {
//       method: 'POST',
//       headers: this.#headers,
//       credentials: 'include', // теперь куки посылаются вместе с запросом
//       body: JSON.stringify(data) // name: data.name, link: data.link
//     })
//       .then(this.#handleResponse)
//   }

//   // Удаление карточки
//   deleteCard(id) {
//     return fetch(`${this.#url}/cards/${id}`, {
//       method: 'DELETE',
//       credentials: 'include', // теперь куки посылаются вместе с запросом
//       headers: this.#headers
//     })
//       .then(this.#handleResponse)
//   }

//   // Запрос на добавление лайка
//   addCardLike(id) {
//     return fetch(`${this.#url}/cards/${id}/likes`, {
//       method: 'PUT',
//       headers: this.#headers,
//       credentials: 'include', // теперь куки посылаются вместе с запросом
//     })
//       .then(this.#handleResponse)
//   }

//   // Запрос на удаление лайка
//   removeCardLike(id) {
//     return fetch(`${this.#url}/cards/${id}/likes`, {
//       method: 'DELETE',
//       headers: this.#headers,
//       credentials: 'include', // теперь куки посылаются вместе с запросом
//     })
//       .then(this.#handleResponse)
//   }

//   // Обновление аватара пользователя
//   editAvatar(data) {
//     return fetch(`${this.#url}/users/me/avatar`, {
//       method: 'PATCH',
//       headers: this.#headers,
//       credentials: 'include', // теперь куки посылаются вместе с запросом
//       body: JSON.stringify({
//         avatar: data.avatar,
//       })
//     })
//       .then(this.#handleResponse)
//   }

//   // Если isLiked = true - запрос на удаление, если false - постановка лайка
//   changeLikeCardStatus(id, isLiked) {
//     const method = isLiked ? 'PUT' : 'DELETE';
//     return fetch(`${this.#url}/cards/${id}/likes`, {
//       method: method,
//       headers: this.#headers,
//       credentials: 'include', // теперь куки посылаются вместе с запросом
//     })
//       .then(this.#handleResponse)
//   }
// }

// export default Api;

// // Класс MoviesApi, отвечающий за запросы к серверу
// export const api = new Api({
//   // url: 'http://localhost:3000',
//   url: 'https://api.darpeex.nomoredomainsicu.ru',
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })
