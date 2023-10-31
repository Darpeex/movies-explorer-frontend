import '../../index.css'; // Стили
import Cookies from 'js-cookie'; // Импорт Cookies
import { ROUTES } from '../../constants/constants';
import React, { useState, useEffect } from 'react'; // Библиотеки реакт
import { Route, Routes, Navigate, useLocation } from 'react-router-dom'; // Routes для роутов

import { ProtectedRouteElement } from "../shared/ProtectedRoute"; // импортируем HOC
import { moviesApi } from '../../utils/MoviesApi'; // Запросы на сервер
import { mainApi } from '../../utils/MainApi'; // Запросы на сервер

import { Main } from '../Main/Main';
import * as auth from '../../utils/Auth';
import { Movies } from '../Movies/Movies';
import { Header } from '../shared/Header/Header';
import { Footer } from '../shared/Footer/Footer';
import { Login } from '../authentication/Login/Login';
import { SavedMovies } from '../SavedMovies/SavedMovies';
import { Preloader } from '../shared/Preloader/Preloader';
import { ErrorPage } from '../shared/ErrorPage/ErrorPage';
import { MoviesContext } from '../../context/MoviesContext';
import { Profile } from '../authentication/Profile/Profile';
import { Register } from '../authentication/Register/Register';
import { SavedMoviesContext } from '../../context/SavedMoviesContext';
import { CurrentUserContext } from '../../context/CurrentUserContext';

function App() {
  const [loadingError, setloadingError] = useState(null);
  const [appIsReady, setAppIsReady] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState('');
  const [result, setResult] = useState(false);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  const location = useLocation(); // Возвращает объект location, представляющий текущий URL

  // Получение сохраненных фильмов с сервера
  useEffect(() => {
    if (loggedIn) {
      setIsLoading(true); // прелоадер вкл
      mainApi.getMovies() // получаем фильмы с сервера
        .then((data) => {
          setSavedMovies(data); // обновляем сохраненные фильмы
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`)
        })
        .finally(() => setIsLoading(false)); // прелоадер выкл;
    }
  }, [loggedIn]);

  const tokenCheck = () => { // если у пользователя есть токен в cookie, эта функция проверит валидность токена
    auth.checkToken().then((res) => { // проверим токен
      if (res) {
        const userData = { // здесь можем получить данные пользователя!
          email: res.email
        }
        setLoggedIn(true); // авторизуем пользователя
        setUserData(userData)
      }
    }).catch((err) => {
      setAppIsReady(true) // сделано для предотвращения перехода по ProtectedRoute при обновлении стр.
      console.log(`Ошибка: ${err}`)
    })
      .finally(() => setIsLoading(false)); // прелоадер выкл;
  }

  // Проверка наличия токена у пользователя
  useEffect(() => {
    if (loggedIn !== true) { // Проверяем, что пользователь не авторизован, прежде чем выполнять проверку токена
      tokenCheck();
    }
  }, [loggedIn])

  // Получение данных пользователя с сервера
  useEffect(() => {
    if (loggedIn) {
      setIsLoading(true); // прелоадер вкл
      mainApi.getUserInfo() // Запрос данных пользователя с сервера
        .then((userInfo) => { // данные от пользователя получены
          setAppIsReady(true) // сделано для предотвращения перехода по ProtectedRoute при обновлении стр.
          setCurrentUser(userInfo); // Установка данных пользователя с сервера в стейт
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`)
        })
        .finally(() => setIsLoading(false)); // прелоадер выкл;
    }
  }, [loggedIn]);

  // Обновление данных пользователя на сервере
  function handleUpdateUser({ name, email }) { // данные берутся из инпутов после отправки формы (submit)
    setIsLoading(true); // прелоадер вкл
    mainApi.updateUserInfo({ name, email }).then((userInfo) => { // важно передавать userInfo, потому что если в функцию передавать объект { name, description }...
      setCurrentUser(userInfo); // ...где нет остальных полей, поля будут потеряны при обновлении состояния currentUser
      setResult(true)
    })
      .catch((err) => {
        setError('При обновлении профиля произошла ошибка.')
        console.log(`Ошибка: ${err}`)
      })
      .finally(() => setIsLoading(false)); // прелоадер выкл;
  }

  // Получение фильмов с сервера
  async function loadMovies(onSuccess) {
    if (loggedIn) { // если авторизированы
      setIsLoading(true); // прелоадер вкл
      try {
        const moviesInfo = await moviesApi.getInitialMovies() // получаем фильмы с сервера
        setMovies(moviesInfo); // обновляем стейт фильмов p.s. строка не нужна, фильмы по колбеку возвращаются, ну пусть будет пока) 
        onSuccess(moviesInfo); // т.к. стейт не успевает обновиться, при его первой загрузке, передаём массив с фильмами напрямую, далее используем стейт movies
        setloadingError(null); // если всё прошло успешно, очищаем ошибку
        setIsLoading(false); // прелоадер выкл
      } catch (err) {
        setIsLoading(false); // прелоадер выкл
        console.log(`Ошибка: ${err}`)
        setloadingError("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз");
      }
    }
  }

  const handleLogin = () => {
    setLoggedIn(true);
  }

  // добавление и удаление фильмов в разделе Movies
  function handleLikeClick(movie) {
    const isMovieSaved = savedMovies.some(film => film.movieId === movie.id);
    const apiUrl = "https://api.nomoreparties.co";

    if (isMovieSaved) { // есть в БД -> удаляем
      setIsLoading(true); // прелоадер вкл
      const movieBeingDeleted = savedMovies.find((film) => film.movieId === movie.id)
      mainApi.deleteMovie(movieBeingDeleted._id).then(() => {
        setSavedMovies((state) => state.filter((film) => film.movieId !== movie.id)); // обновляем savedMovies, удаляем переданный фильм при помощи фильтра
      })
        .catch((err) => {
          console.log(`Ошибка: ${err}`)
        })
        .finally(() => setIsLoading(false)); // прелоадер выкл;
    } else if (!isMovieSaved) { // нет в БД -> добавляем
      setIsLoading(true); // прелоадер вкл
      mainApi.createMovie({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `${apiUrl}${movie.image.url}`,
        trailerLink: movie.trailerLink,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: `${apiUrl}${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
      }).then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
      })
        .catch((err) => {
          console.log(`Ошибка: ${err}`)
        })
        .finally(() => setIsLoading(false)); // прелоадер выкл;
    }
  }

  // удаление фильмов из SavedMovies
  function handleDeleteClick(movie) {
    const isMovieSaved = savedMovies.some(film => film._id === movie._id);

    if (isMovieSaved) { // есть в БД -> удаляем
      setIsLoading(true); // прелоадер вкл
      const movieBeingDeleted = savedMovies.find((film) => film._id === movie._id)
      mainApi.deleteMovie(movieBeingDeleted._id).then(() => {
        setSavedMovies((state) => state.filter((film) => film._id !== movie._id)); // обновляем savedMovies, удаляем переданный фильм при помощи фильтра
      })
        .catch((err) => {
          console.log(`Ошибка: ${err}`)
        })
        .finally(() => setIsLoading(false)); // прелоадер выкл;
    }
  }

  // Удаляем токен из браузерного хранилища  
  function handleDeleteTocken() {
    Cookies.remove('jwt');
    localStorage.clear();
    setLoggedIn(false);
    setUserData({});
  }

  // Получаем результат запроса на регистрацию
  const handleResult = setResult;

  const { HOME, MOVIES, SAVED_MOVIES, PROFILE, SIGNUP, SIGNIN, ERROR, UNKNOWN } = ROUTES;
  const footerComponentsPaths = [HOME, MOVIES, SAVED_MOVIES];
  const footerClass = footerComponentsPaths.includes(location.pathname) // не отрисовываем Footer
    ? <Footer />
    : <></>;
  const headerComponentsPaths = [ERROR];
  const headerClass = headerComponentsPaths.includes(location.pathname) // не отрисовываем Header
    ? <></>
    : <Header location={location} userData={userData} loggedIn={loggedIn} />;

  // Отрисовка компонентов
  return (
    !appIsReady ? (
      <Preloader /> // Отображение прелоадера, если данные пользователя ещё не пришли
    ) : (
      <div className="App">
        <div className="page">
          {/* Оборачиваем в провайдер всё содержимое */}
          <CurrentUserContext.Provider value={currentUser}> {/* глобальный контекст становится доступен всем компонентам */}
            <SavedMoviesContext.Provider value={savedMovies} > {/* больше 2-х уровней - много для пробрасывания говорят */}
              <MoviesContext.Provider value={movies} >
                {/* Шапка сайта */}
                {headerClass}

                {/* Прелоадер */}
                {isLoading && <Preloader />}

                {/* Основное содержимое страницы */}
                <Routes>
                  <Route path={UNKNOWN} element={<Navigate to={ERROR} replace />} /> {/* Неизвестный путь */}
                  <Route path={ERROR} element={<ErrorPage />} /> {/* Стравница с ошибкой */}
                  <Route path={HOME} element={<Main />} /> {/* Главная */}
                  <Route path={MOVIES} element={<ProtectedRouteElement
                    element={Movies} loadMovies={loadMovies} loadingError={loadingError} handleLikeClick={handleLikeClick} loggedIn={loggedIn} />}
                  /> {/* Фильмы */} {/* пропсы loggedIn в защещенных роутах нужны, чтобы ProtectedRouteElement взял значение и проверил */}
                  <Route path={SAVED_MOVIES} element={<ProtectedRouteElement
                    element={SavedMovies} loadingError={loadingError} handleDeleteClick={handleDeleteClick} loggedIn={loggedIn} />}
                  /> {/* Сохранённые фильмы */}
                  <Route path={PROFILE} element={<ProtectedRouteElement
                    element={Profile} onUpdateUser={handleUpdateUser} handleDeleteTocken={handleDeleteTocken} error={error} result={result} loggedIn={loggedIn} />}
                  /> {/* Профиль */}
                  <Route path={SIGNIN} element={<Login handleLogin={handleLogin} onResult={handleResult} error={error} setError={setError} setIsLoading={setIsLoading} />} /> {/* Логин */}
                  <Route path={SIGNUP} element={<Register handleLogin={handleLogin} onResult={handleResult} error={error} setError={setError} setIsLoading={setIsLoading} />} /> {/* Регистрация */}
                </Routes>

                {/* Подвал сайта */}
                {footerClass} {/* Если у нас не Profile, Login, Registr - не отрисовывать */}

              </MoviesContext.Provider>
            </SavedMoviesContext.Provider>
          </CurrentUserContext.Provider>
        </div>
      </div >
    )
  );
}

export default App;