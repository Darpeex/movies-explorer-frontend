// Класс MoviesApi, отвечающий за запросы к сервису
class MoviesApi {
  #url;
  #headers;

  constructor(data) {
    this.#url = data.url; // ссылка на сервер
    this.#headers = {
      ...data.headers,
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

  // Запрос фильмов с сервера
  getInitialMovies() {
    return fetch(`${this.#url}`, {
      headers: this.#headers,
    })
      .then(this.#handleResponse)
  }
}

export default MoviesApi;

export const moviesApi = new MoviesApi({
  url: 'http://localhost:3000',
  // url: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json'
  }
})
