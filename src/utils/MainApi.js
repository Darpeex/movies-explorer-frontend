// Класс MainApi, отвечающий за запросы к сервису

// class MainApi {
//   #url;
//   #headers;

//   constructor(data) {
//     this.#url = data.url; // ссылка на сервер
//     this.#headers = {
//       ...data.headers,
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

//   // Запрос карточек с сервера
//   getInitialMovies() {
//     return fetch(`${this.#url}/cards`, {
//       headers: this.#headers,
//       credentials: 'include', // теперь куки посылаются вместе с запросом
//     })
//       .then(this.#handleResponse)
//   }
// }

// export default MainApi;

// export const mainApi = new MainApi({
//   url: 'https://api.nomoreparties.co/beatfilm-movies',
//   headers: {
//     authorization: '36b3d00c-eb9b-4532-a563-964663cc5274', // от когорты 66
//     'Content-Type': 'application/json'
//   }
// })
