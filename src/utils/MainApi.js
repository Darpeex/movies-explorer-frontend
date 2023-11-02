import Cookies from 'js-cookie'; // библиотека для работы с cookie

// Класс взаимодействия с нашим сервером
class MainApi {
  #url;
  #headers;

  constructor(data) {
    this.#url = data.url; // ссылка на сервер
    this.#headers = {
      ...data.headers,
      authorization: `Bearer ${Cookies.get('auth_token')}`,
    };
  }

  // Проверка статуса запроса
  #handleResponse(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  }

  // Загрузка информации о пользователе с сервера (email и имя)
  getUserInfo() { // по умолчанию метод get
    return fetch(`${this.#url}/users/me`, {
      headers: this.#headers,
      credentials: 'include', // теперь куки посылаются вместе с запросом
    })
      .then(this.#handleResponse)
  }

  // Возвращает все сохранённые пользователем фильмы
  getMovies() {
    return fetch(`${this.#url}/movies`, {
      headers: this.#headers,
      credentials: 'include', // теперь куки посылаются вместе с запросом
    })
      .then(this.#handleResponse)
  }

  // Редактирование профиля
  updateUserInfo({ name, email }) {
    return fetch(`${this.#url}/users/me`, {
      method: 'PATCH',
      headers: this.#headers,
      credentials: 'include', // теперь куки посылаются вместе с запросом
      body: JSON.stringify({
        name: name, // имя
        email: email // почта
      })
    })
      .then(this.#handleResponse)
  }

  // Добавление фильма в сохранённые
  createMovie(data) {
    return fetch(`${this.#url}/movies`, {
      method: 'POST',
      headers: this.#headers,
      credentials: 'include', // теперь куки посылаются вместе с запросом
      body: JSON.stringify(data) // country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId
    })
      .then(this.#handleResponse)
  }

  // Удаление фильма из сохранённых
  deleteMovie(id) {
    return fetch(`${this.#url}/movies/${id}`, {
      method: 'DELETE',
      credentials: 'include', // теперь куки посылаются вместе с запросом
      headers: this.#headers
    })
      .then(this.#handleResponse)
  }
}

export default MainApi;

// Класс MainApi, отвечающий за запросы к серверу
export const mainApi = new MainApi({
  // url: 'http://localhost:3000',
  url: 'https://api.diploma.darpeex.nomoredomainsrocks.ru',
  headers: {
    'Content-Type': 'application/json'
  }
})