import '../../index.css'; // Стили
import { ROUTES } from '../../constants/constants';
import Cookies from 'js-cookie'; // Импорт Cookies
import React, { useState, useEffect } from 'react'; // Библиотеки реакт
import { Route, Routes, Navigate, useLocation, useNavigate } from 'react-router-dom'; // Routes для роутов

import { ProtectedRouteElement } from "../ProtectedRoute"; // импортируем HOC
import { moviesApi } from '../../utils/MoviesApi'; // Запросы на сервер
import { api } from '../../utils/MainApi'; // Запросы на сервер

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
import { IsLoadingContext } from '../../context/IsLoadingContext';
import { CurrentUserContext } from '../../context/CurrentUserContext';

function App() {
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [userData, setUserData] = useState('');
  const [movies, setMovies] = useState([]);
  const [result, setResult] = useState();
  const [error, setError] = useState('');

  const location = useLocation(); // Возвращает объект location, представляющий текущий URL
  const navigate = useNavigate(); // Создаёт функцию, которая помогает пользователю перейти на определенную страницу
  const isAnyPopupOpened = isInfoTooltip || (Object.keys(selectedCard).length !== 0); // Проверка является ли хотя бы 1 попап открытым

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

  // const tokenCheck = () => { // если у пользователя есть токен в cookie, эта функция проверит валидность токена
  //     auth.checkToken().then((res) => { // проверим токен - комменты поправлю, понять бы как правильно
  //       if (res){
  //         const userData = { // здесь можем получить данные пользователя!
  //           email: res.email
  //         }
  //         setLoggedIn(true); // авторизуем пользователя
  //         setUserData(userData)
  //         navigate("/main", {replace: true})
  //       }
  //     }).catch((err) => console.log(`Ошибка: ${err}`)); 
  // }

  // // Проверка наличия токена у пользователя
  //   useEffect(() => {
  //     tokenCheck();
  //   }, [loggedIn])

  // // Получение данных пользователя с сервера
  //   useEffect(() => {
  //     if (loggedIn) {
  //       api.getUserInfo() // Запрос данных пользователя с сервера
  //       .then((userInfo) => {
  //         setCurrentUser(userInfo); // Установка данных пользователя с сервера в стейт
  //       })
  //       .catch((err) => console.log(`Ошибка: ${err}`));
  //     }
  //   }, [loggedIn]);

  // Обновление данных пользователя на сервере
  function handleUpdateUser({ name, description }) { // данные берутся из инпутов после отправки формы (submit)
    api.setUserInfo({ name, description }).then((userInfo) => { // важно передавать userInfo, потому что если в функцию передавать объект { name, description }...
      setCurrentUser(userInfo); // ...где нет остальных полей, поля будут потеряны при обновлении состояния currentUser
      closeAllPopups();
    })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }

  // Получение данных фильмов с сервера
  const loadingFilms = () => {
    setIsLoading(true);
    if (loggedIn) {
      moviesApi.getInitialMovies() // получаем фильмы с сервера
        .then((moviesInfo) => {
          setIsLoading(false);
          setMovies(moviesInfo); // обновляем стейт фильмов
        })
        .catch((err) => console.log(`Ошибка: ${err}`));
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

  // Поддержка лайков и дизлайков
  function handleCardLike(card) {
    const isLiked = card.likes.some(likerId => likerId === currentUser._id); // Снова проверяем, есть ли уже лайк на этой карточке
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => { // Отправляем запрос в API и получаем обновлённые данные карточки
      setMovies((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }
  // Удаление карточки
  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setMovies((state) => state.filter((c) => c._id !== card._id));
    })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }
  // Добавление карточки
  function handleAddPlaceSubmit({ name, link }) {
    const data = { name, link }
    api.addNewCard(data).then((newCard) => {
      setMovies([newCard, ...movies]);
      closeAllPopups();
    })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }

  // Удаляем токен из браузерного хранилища  
  function handleDeleteTocken() {
    Cookies.remove('jwt');
    setLoggedIn(false);
    setUserData({});
  }

  // Получаем результат запроса на регистрацию
  const handleResult = (result) => {
    setResult(result)
  }

  // Сообщение об ошибке при регистрации - необязательно
  const takeErrorMessage = (error) => {
    setError(error)
  }

  const { HOME, MOVIES, SAVED_MOVIES, PROFILE, SIGNUP, SIGNIN, ERROR, UNKNOWN } = ROUTES;
  const footerComponentsPaths = [HOME, MOVIES, SAVED_MOVIES];
  const footerClass = footerComponentsPaths.includes(location.pathname) // не отрисовываем Footer
    ? <Footer />
    : <></>;
  const headerComponentsPaths = [ERROR];
  const headerClass = headerComponentsPaths.includes(location.pathname) // не отрисовываем Footer
    ? <></>
    : <Header location={location} userData={userData} loggedIn={loggedIn} />;

  // Отрисовка компонентов
  return (
    <div className="App">
      <div className="page">
        {/* Оборачиваем в провайдер всё содержимое */}
          <CurrentUserContext.Provider value={currentUser}> {/* глобальный контекст становится доступен всем компонентам */}
            <MoviesContext.Provider value={movies}>
              {/* Шапка сайта */}
              {headerClass} {/* onSignOut={handleDeleteTosignacken} */}  {/* Если у нас не Логин, Регистр - не отрисовывать */}

              {/* Прелоадер */}
              {isLoading && <Preloader />}

              {/* Основное содержимое страницы */}
              <Routes>
                <Route path={UNKNOWN} element={<Navigate to={ERROR} replace />} /> {/* Неизвестный путь */}
                <Route path={ERROR} element={<ErrorPage />} /> {/* Стравница с ошибкой */}
                <Route path={HOME} element={<Main />} /> {/* Главная */}
                <Route path={MOVIES} element={<Movies loadingFilms={loadingFilms} />} /> {/* Фильмы */}
                <Route path={SAVED_MOVIES} element={<SavedMovies loadingFilms={loadingFilms} />} /> {/* Сохранённые фильмы */}
                <Route path={PROFILE} element={<Profile onUpdateUser={handleUpdateUser} />} /> {/* Профиль */}
                <Route path={SIGNIN} element={<Login onResult={handleResult} onInfoTooltip={handleInfoTooltip} errorMessage={takeErrorMessage} />} /> {/* Логин */}
                <Route path={SIGNUP} element={<Register onResult={handleResult} onInfoTooltip={handleInfoTooltip} errorMessage={takeErrorMessage} />} /> {/* Регистрация */}
              </Routes>

              {/* Подвал сайта */}
              {footerClass} {/* Если у нас не Профиль, Логин, Регистр - не отрисовывать */}

              {/* <InfoTooltip isOpen={isInfoTooltip} onClose={closeAllPopups} result={result} error={error} /> */} {/* Попап результата регистрации */}
            </MoviesContext.Provider>
          </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;