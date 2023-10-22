// Профиль
import './Profile.css';
import React from "react";
import { Link } from 'react-router-dom';
import { CurrentUserContext } from "../../../context/CurrentUserContext";
import { ROUTES } from '../../../constants/constants';

export const Profile = ({ onUpdateUser }) => {
  const [isEditProfileActive, setIsEditProfileActive] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false); // Для демонстрации верстки
  const [isValid, setIsValid] = React.useState(false); // Для демонстрации верстки
  const handleEditProfile = () => {
    setIsEditProfileActive(true);
  }

  const currentUser = React.useContext(CurrentUserContext); // Подписка на контекст пользователя
  const [name, setName] = React.useState(''); // Состояние имени
  const [email, setEmail] = React.useState(''); // Состояние описания

  // После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name ?? ''); // Если имя не успело прийти с сервера - поле пустое
    setEmail(currentUser.email ?? ''); // Если описание не успело прийти с сервера - поле пустое
  }, [currentUser]);  // При изменении контекста пользователя и, если попап меняет своё состояние открытости - состояние имени и описания меняется

  const handleSubmit = (evt) => {
    evt.preventDefault(); // Запрещаем браузеру переходить по адресу формы
    onUpdateUser({ name, email }); // Передаём значения управляемых компонентов во внешний обработчик
  }
  function handleNameChange(e) { // Следим за изменениями в поле name и подставляем в стейт
    setName(e.target.value);
  }
  function handleEmailChange(e) { // Следим за изменениями в поле email и подставляем в стейт
    setEmail(e.target.value);
  }
  return (
    <main>
      <section className="profile">
        <h1 className="profile__title">Привет, Виталий!</h1> {/* Подставляем текущее имя пользователя */}
        <form className="profile__form">
          <div className="profile__form-container">
            <p className="profile__form-text profile__field">Имя</p>
            <input
              name="name"
              value={name} // значение поля из стейта
              onChange={handleNameChange} // При изменении вызывается функция, которая изменяет введенное значение в поле
              id="user-name"
              className="profile__form-text profile__form-input profile__form-input_field_name"
              type="text"
              minLength="2"
              maxLength="40"
              disabled={!isEditProfileActive && 'disabled'}
              placeholder="Виталий"
              required />
          </div>
          <hr className="profile__underline" />
          <div className="profile__form-container">
            <p className="profile__form-text profile__field">E&#8209;mail</p>
            <input
              name="email"
              value={email} // значение поля из стейта
              onChange={handleEmailChange} // Срабатывает каждый раз, когда в поле ввода вносятся изменения
              id="email"
              className="profile__form-text profile__form-input profile__form-input_field_email"
              type="text"
              placeholder="pochta@yandex.ru"
              minLength="2"
              maxLength="200"
              disabled={!isEditProfileActive && 'disabled'}
              required />
          </div>
          <div className={`profile__container ${!isValid ? "profile__saved-btn" : ""}`}>
            {!isEditProfileActive && <button type="button" className="profile__button profile__edit-button" onClick={handleEditProfile}>Редактировать</button>}
            {!isEditProfileActive && <Link to={ROUTES.HOME} className="profile__button profile__signout-button">Выйти из аккаунта</Link>}
            {isEditProfileActive && !isValid && <span className="profile__error-text">При обновлении профиля произошла ошибка.</span>}
            {isEditProfileActive && <button type="submit" className={`profile__button profile__saved-button ${isActive ? "" : "profile__saved-button_inactive"}`}>Сохранить</button>}
          </div>
        </form>
      </section>
    </main>
  )
}

// Ошибки ниже отображаются не под инпутами, а при получении ошибки после отправки запроса
// Пользователь с&nbsp;таким email уже существует.
// При обновлении профиля произошла ошибка.