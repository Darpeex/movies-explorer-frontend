// Профиль
import './Profile.css';
import React from "react";
import { CurrentUserContext } from "../../../context/CurrentUserContext";

export const Profile = ({ onUpdateUser }) => {
  const [isEditProfileActive, setIsEditProfileActive] = React.useState(false);
  const [isValid, setIsValid] = React.useState(true); // Для демонстрации верстки
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
    <section className="profile">
      <h1 className="profile__title">Привет, user.name!</h1> {/* Подставляем текущее имя пользователя */}
      <div className="profile__form">
        <div className="profile__form-container">
          <p className="profile__form-text profile__field">Имя</p>
          <input
            name="name"
            value={name} // значение поля из стейта
            onChange={handleNameChange} // При изменении вызывается функция, которая изменяет введенное значение в поле
            id="user-name"
            className="profile__form-text profile__form-input profile__form-input_field_name"
            type="text"
            placeholder="Ваше имя"
            minLength="2"
            maxLength="40"
            disabled={!isEditProfileActive && 'disabled'}
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
            placeholder="example@email.ru"
            minLength="2"
            maxLength="200"
            disabled={!isEditProfileActive && 'disabled'}
            required />
        </div>
      </div>
      <div className="profile__container">
        {!isEditProfileActive && <button className="profile__button profile__edit-button" onClick={handleEditProfile}>Редактировать</button>}
        {!isEditProfileActive && <button className="profile__button profile__signout-button">Выйти из аккаунта</button>}
        {isEditProfileActive && <button className={`profile__button profile__saved-button ${isValid ? "" : "profile__saved-button_inactive"}`}>Сохранить</button>}
      </div>
    </section>
  )
}