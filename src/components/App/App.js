import React from 'react'; // Библиотеки реакт
import { Route, Routes, Navigate, useLocation, useNavigate } from 'react-router-dom'; // Routes для роутов
import { ProtectedRouteElement } from "../ProtectedRoute"; // импортируем HOC
import { api } from '../../utils/Api'; // Запросы на сервер
import { useState, useEffect } from 'react'; // Хуки реакт
import { Header } from '../Header/Header';
import { Main } from '../Main/Main';
import { Login } from './Login';
import { Register } from './Register';
import { InfoTooltip } from '../InfoTooltip';
import { Footer } from '../Footer/Footer';
import { ImagePopup } from '../ImagePopup';
import { EditAvatarPopup } from '../EditAvatarPopup';
import { EditProfilePopup } from '../EditProfilePopup';
import { AddPlacePopup } from '../AddPlacePopup';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { CardsContext } from '../../context/CardsContext';
import * as auth from '../../utils/Auth';
import Cookies from 'js-cookie'; // Импорт Cookies
import '../index.css'; // Файлы со стилями

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [userData, setUserData] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [cards, setCards] = useState([]);
  const [result, setResult] = useState();
  const [error, setError] = useState('');

// Возвращает объект location, представляющий текущий URL
  const location = useLocation();
// Создаёт функцию, которая помогает пользователю перейти на определенную страницу
  const navigate = useNavigate();
// Константа с условием (в конце) - проверка является ли хотя бы 1 попап открытым
  const isAnyPopupOpened = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isInfoTooltip ||(Object.keys(selectedCard).length !== 0);
// Отвечает за закрытие попапов при нажатии ESC
  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === 'Escape') { // e - событие, если равняется нажатием на клавиатуре клавиши Esc - открытые попапы закрываются
        closeAllPopups();
      }
    };
// Проверка, является ли хотя бы один попап открытым
      if (isAnyPopupOpened) {
        document.addEventListener('keydown', handleEscClose); // Если один из попапов открыт, добавляется слушатель и попап закрывается на Esc
      }
      return () => {
        document.removeEventListener('keydown', handleEscClose); // Если попапы закрыты, удаляется слушатель и попап закрывается на Esc
      };
  }, [isAnyPopupOpened]);

  const tokenCheck = () => { // если у пользователя есть токен в cookie, эта функция проверит валидность токена
      auth.checkToken().then((res) => { // проверим токен - комменты поправлю, понять бы как правильно
        if (res){
          const userData = { // здесь можем получить данные пользователя!
            email: res.email
          }
          setLoggedIn(true); // авторизуем пользователя
          setUserData(userData)
          navigate("/main", {replace: true})
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
      api.getUserInfo() // Запрос данных пользователя с сервера
      .then((userInfo) => {
        setCurrentUser(userInfo); // Установка данных пользователя с сервера в стейт
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
    }
  }, [loggedIn]);

// Обновление данных пользователя на сервере
  function handleUpdateUser({ name, description }) { // данные берутся из инпутов после отправки формы (submit)
    api.setUserInfo({ name, description }).then((userInfo) => { // важно передавать userInfo, потому что если в функцию передавать объект { name, description }...
      setCurrentUser(userInfo); // ...где нет остальных полей, поля будут потеряны при обновлении состояния currentUser
      closeAllPopups();
    })
    .catch((err) => console.log(`Ошибка: ${err}`)); 
  }

// Обновление аватарки профиля
  function handleUpdateAvatar({ avatar }) { // данные берутся из поля попапа после отправки формы (submit)
    api.editAvatar({ avatar }).then((userInfo) => { // передаётся обновлённые данные userInfo
      setCurrentUser(userInfo);
      closeAllPopups();
    })
    .catch((err) => console.log(`Ошибка: ${err}`)); 
  }

// Получение данных карточек с сервера
  useEffect(() => {
    if (loggedIn) {
      api.getInitialCards() // получаем карточки с сервера
      .then((userInfo) => {
        setCards(userInfo); // обновляем стейт карточек
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
    }
  }, [loggedIn]);

  // Функции, меняющие состояния попапов (true - открыт, false - закрыт)
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }
  const handleInfoTooltip = () => {
    setIsInfoTooltip(true);
  }
  const handleLogin = () => {
    setLoggedIn(true);
  }
	const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltip(false);
    setSelectedCard({});
  }

  // Открытие отдельной карточки
  const handleCardClick = (card) => {
    setSelectedCard(card);
  }
  // Поддержка лайков и дизлайков
  function handleCardLike(card) {
    const isLiked = card.likes.some(likerId => likerId === currentUser._id); // Снова проверяем, есть ли уже лайк на этой карточке
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => { // Отправляем запрос в API и получаем обновлённые данные карточки
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => console.log(`Ошибка: ${err}`));
  }
// Удаление карточки
  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id ));
    })
    .catch((err) => console.log(`Ошибка: ${err}`));
  }
// Добавление карточки
  function handleAddPlaceSubmit({ name, link }) {
    const data = { name, link }
    api.addNewCard(data).then((newCard) => {
      setCards([newCard, ...cards]); 
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

// Происходит отрисовка компонентов
  return (
    <div className="App">
      <div className="page">
        {/* Оборачиваем в провайдер всё содержимое */}
        <CurrentUserContext.Provider value={currentUser}> {/* контекст становится доступен всем компонентам */}
        <CardsContext.Provider value={cards}> {/* ... глобальный контекст */}
{/* Шапка сайта */}
          <Header location={location} userData={userData} onSignOut={handleDeleteTocken} />

          <Routes>
            <Route path="/" element={loggedIn ? <Navigate to="/main" replace /> : <Navigate to="/sign-in" replace />} />
            <Route path="/*" element={loggedIn ? <Navigate to="/main" replace /> : <Navigate to="/sign-in" replace />} />
{/* Основное содержимое страницы */}
            <Route path="/main" element={<ProtectedRouteElement
              element={ Main }  
              onEditProfile={handleEditProfileClick} // Передаём в Main функцию открытия попапа редактирования профиля
              onAddPlace={handleAddPlaceClick} // Передаём в Main функцию открытия попапа добавления карточки
              onEditAvatar={handleEditAvatarClick} // Передаём в Main функцию открытия попапа редактирования аватарки
              onCardClick={handleCardClick} // Прокидываем в Card обработчик handleCardClick, через компонент Main
              onCardLike={handleCardLike} // Прокидываем в Card обработчик handleCardLike, через компонент Main
              onCardDelete={handleCardDelete} // Прокидываем в Card обработчик handleCardDelete, через компонент Main
              loggedIn={loggedIn} />} />
            <Route path="/sign-in" element={<Login handleLogin={handleLogin} onResult={handleResult} onInfoTooltip={handleInfoTooltip} errorMessage={takeErrorMessage} />} />
            <Route path="/sign-up" element={<Register onResult={handleResult} onInfoTooltip={handleInfoTooltip} errorMessage={takeErrorMessage} />} />
          </Routes>
    
{/* Подвал сайта */}
          <Footer />

{/* Попап редактирования аватарки. isOpen и onClose - пропсы компонента попапа (булево значение: true или false) */}
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

{/* Попап редактирования профиля */}
			    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

{/* Попап добавления карточки */}
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

{/* Попап подтверждения удаления */}
          {/* <ConfirmationPopup open={isConfirmationPopupOpen} /> */}

{/* Попап открытия карточки */}
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

{/* Попап результата регистрации */}
          <InfoTooltip isOpen={isInfoTooltip} onClose={closeAllPopups} result={result} error={error} />
        </CardsContext.Provider>
        </CurrentUserContext.Provider>

      </div>
    </div>
  );
}

export default App;

// Можно создать переменную для отслеживания состояния загрузки во время ожидания ответа от сервера:
//  const [isLoading, setIsLoading] = React.useState(false);
//  И ее можно теперь изменять до вызова запроса (true) и в блоке finally после запроса завершать (false), тем самым управляя текстом кнопки сабмита в каждом попапе. Для этого нужно передавать isLoading в каждый попап и там менять текст кнопки:
//   buttonText={isLoading? 'Сохранение...' : 'Сохранить'}
//  И еще можно сделать контекст для передачи isLoading и closeAllPopups, чтобы не передавать их в пропсы в каждый компонент. 
//  <AppContext.Provider value={{ isLoading, closeAllPopups }}>
//  Нужно его указать сразу над  CurrentUserContext, обернув все приложение в него.
//  И теперь можно isLoading, closeAllPopups брать из контекста, а не из пропсов. Очистятся пропсы многих компонентов. Для этого и создаются контексты

// Можно лучше
// Если интересно, посмотрите, как можно избавиться от дублирования изменения текста кнопки сабмита, отлова ошибок и закрытия попапа в каждом запросе:
// // можно сделать универсальную функцию, которая принимает функцию запроса
// function handleSubmit(request) {
//   // изменяем текст кнопки до вызова запроса
//   setIsLoading(true);
//   request()
//     // закрывать попап нужно только в `then`
//     .then(closeAllPopups)
//     // в каждом запросе нужно ловить ошибку
//     // console.error обычно используется для логирования ошибок, если никакой другой обработки ошибки нет
//     .catch(console.error)
//     // в каждом запросе в `finally` нужно возвращать обратно начальный текст кнопки
//     .finally(() => setIsLoading(false));
// }
 
// Пример оптимизации обработчика сабмита формы профиля
// // пример оптимизации обработчика сабмита формы профиля
// function handleProfileFormSubmit(inputValues) {
//   // создаем функцию, которая возвращает промис, так как любой запрос возвращает его
//   function makeRequest() {
//     // `return` позволяет потом дальше продолжать цепочку `then, catch, finally`
//     return api.editProfile(inputValues).then(setCurrentUser);
//   }
//   // вызываем универсальную функцию, передавая в нее запрос
//   handleSubmit(makeRequest);
// }
 
// Если внутри безымянной (стрелочной) функции вызывается одна функция с точно такими же аргументами, то эта безымянная функция не нужна. Это лишняя обертка вокруг самой функции, которую можно использовать просто сразу в коде
// В итоге, у Вас исчезнет огромное кол-во дублирования логики из кода.