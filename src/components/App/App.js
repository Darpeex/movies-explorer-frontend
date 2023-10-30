import '../../index.css'; // Стили
import { ROUTES } from '../../constants/constants';
import Cookies from 'js-cookie'; // Импорт Cookies
import React, { useState, useEffect } from 'react'; // Библиотеки реакт
import { Route, Routes, Navigate, useLocation, useNavigate } from 'react-router-dom'; // Routes для роутов

import { ProtectedRouteElement } from "../ProtectedRoute"; // импортируем HOC
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
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [loadingError, setloadingError] = useState(null);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState('');
  const [movies, setMovies] = useState([]);
  const [result, setResult] = useState();
  const [error, setError] = useState('');

  const location = useLocation(); // Возвращает объект location, представляющий текущий URL
  const navigate = useNavigate(); // Создаёт функцию, которая помогает пользователю перейти на определенную страницу
  const isAnyPopupOpened = isInfoTooltip || (Object.keys(selectedCard).length !== 0); // Проверка является ли хотя бы 1 попап открытым

  // Получение сохраненных фильмов с сервера
  useEffect(() => {
    if (loggedIn) {
      mainApi.getMovies() // получаем фильмы с сервера
        .then((data) => {
          setSavedMovies(data); // обновляем сохраненные фильмы
        })
        .catch((err) => console.log(`Ошибка: ${err}`));
    }
  }, [loggedIn]);

  // Отвечает за закрытие попапов при нажатии ESC
  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === 'Escape') { // e - событие, если равняется нажатием на клавиатуре клавиши Esc - открытые попапы закрываются
        closeAllPopups();
      }
    };
    if (isAnyPopupOpened) { // Проверка, является ли хотя бы один попап открытым
      document.addEventListener('keydown', handleEscClose); // Если один из попапов открыт, добавляется слушатель и попап закрывается на Esc
    }
    return () => {
      document.removeEventListener('keydown', handleEscClose); // Если попапы закрыты, удаляется слушатель и попап закрывается на Esc
    };
  }, [isAnyPopupOpened]);

  const tokenCheck = () => { // если у пользователя есть токен в cookie, эта функция проверит валидность токена
    auth.checkToken().then((res) => { // проверим токен
      if (res) {
        const userData = { // здесь можем получить данные пользователя!
          email: res.email
        }
        setLoggedIn(true); // авторизуем пользователя
        setUserData(userData)
        navigate("/movies", { replace: true })
      }
    }).catch((err) => console.log(`Ошибка: ${err}`));
  }

  // Проверка наличия токена у пользователя
  useEffect(() => {
    tokenCheck();
  }, [loggedIn])

  // Получение данных пользователя с сервера
  useEffect(() => {
    if (loggedIn) {
      mainApi.getUserInfo() // Запрос данных пользователя с сервера
        .then((userInfo) => {
          setCurrentUser(userInfo); // Установка данных пользователя с сервера в стейт
        })
        .catch((err) => console.log(`Ошибка: ${err}`));
    }
  }, [loggedIn]);

  // Обновление данных пользователя на сервере
  function handleUpdateUser({ name, description }) { // данные берутся из инпутов после отправки формы (submit)
    mainApi.updateUserInfo({ name, description }).then((userInfo) => { // важно передавать userInfo, потому что если в функцию передавать объект { name, description }...
      setCurrentUser(userInfo); // ...где нет остальных полей, поля будут потеряны при обновлении состояния currentUser
      closeAllPopups();
    })
      .catch((err) => console.log(`Ошибка: ${err}`));
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
        console.log(`Ошибка: ${err}`)
        setloadingError("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз");
        setIsLoading(false); // прелоадер выкл
      }
    }
  }

  // Функции, меняющие состояния попапов (true - открыт, false - закрыт)
  const handleInfoTooltip = () => {
    setIsInfoTooltip(true);
  }
  const closeAllPopups = () => {
    setIsInfoTooltip(false);
    setSelectedCard({});
  }
  const handleLogin = () => {
    setLoggedIn(true);
  }

  function handleLikeClick(movie) {
    const isMovieSaved = savedMovies.some(film => film.movieId === movie.id);
    const apiUrl = "https://api.nomoreparties.co";

    if (isMovieSaved) { // есть в БД -> удаляем
      const movieBeingDeleted = savedMovies.find((film) => film.movieId === movie.id)
      mainApi.deleteMovie(movieBeingDeleted._id).then(() => {
        setSavedMovies((state) => state.filter((film) => film.movieId !== movie.id)); // обновляем savedMovies, удаляем переданный фильм при помощи фильтра
      })
        .catch((err) => console.log(`Ошибка: ${err}`));
    } else if (!isMovieSaved) { // нет в БД -> добавляем
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
        .catch((err) => console.log(`Ошибка: ${err}`));
    }
  }

  function handleDeleteClick(movie) {
    const isMovieSaved = savedMovies.some(film => film._id === movie._id);

    if (isMovieSaved) { // есть в БД -> удаляем
      const movieBeingDeleted = savedMovies.find((film) => film._id === movie._id)
      mainApi.deleteMovie(movieBeingDeleted._id).then(() => {
        setSavedMovies((state) => state.filter((film) => film._id !== movie._id)); // обновляем savedMovies, удаляем переданный фильм при помощи фильтра
      })
        .catch((err) => console.log(`Ошибка: ${err}`));
    }
  }

  // Удаляем токен из браузерного хранилища  
  function handleDeleteTocken() {
    Cookies.remove('jwt');
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
    <div className="App">
      <div className="page">
        {/* Оборачиваем в провайдер всё содержимое */}
        <CurrentUserContext.Provider value={currentUser}> {/* глобальный контекст становится доступен всем компонентам */}
          <SavedMoviesContext.Provider value={savedMovies} > {/* больше 2-х уровней - много для пробрасывания говорят */}
            <MoviesContext.Provider value={movies} >
              {/* Шапка сайта */}
              {headerClass} {/* onSignOut={handleDeleteTosignacken} */}  {/* Если у нас не Логин, Регистр - не отрисовывать */}

              {/* Прелоадер */}
              {isLoading && <Preloader />}

              {/* Основное содержимое страницы */}
              <Routes>
                <Route path={UNKNOWN} element={<Navigate to={ERROR} replace />} /> {/* Неизвестный путь */}
                <Route path={ERROR} element={<ErrorPage />} /> {/* Стравница с ошибкой */}
                <Route path={HOME} element={<Main />} /> {/* Главная */}
                <Route path={MOVIES} element={<Movies loadMovies={loadMovies} loadingError={loadingError} handleLikeClick={handleLikeClick} />} /> {/* Фильмы */}
                <Route path={SAVED_MOVIES} element={<SavedMovies loadingError={loadingError} handleDeleteClick={handleDeleteClick} />} /> {/* Сохранённые фильмы */}
                <Route path={PROFILE} element={<Profile onUpdateUser={handleUpdateUser} handleDeleteTocken={handleDeleteTocken} />} /> {/* Профиль */}
                <Route path={SIGNIN} element={<Login handleLogin={handleLogin} onResult={handleResult} onInfoTooltip={handleInfoTooltip}  error={error} setError={setError} />} /> {/* Логин */}
                <Route path={SIGNUP} element={<Register  handleLogin={handleLogin} onResult={handleResult} onInfoTooltip={handleInfoTooltip} error={error} setError={setError} />} /> {/* Регистрация */}
              </Routes>

              {/* Подвал сайта */}
              {footerClass} {/* Если у нас не Профиль, Логин, Регистр - не отрисовывать */}

              {/* <InfoTooltip isOpen={isInfoTooltip} onClose={closeAllPopups} result={result} error={error} /> */} {/* Попап результата регистрации */}
            </MoviesContext.Provider>
          </SavedMoviesContext.Provider>
        </CurrentUserContext.Provider>
      </div>
    </div >
  );
}

export default App;