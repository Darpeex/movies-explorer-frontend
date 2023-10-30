// Профиль
import './Profile.css';
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/constants';
import { CurrentUserContext } from "../../../context/CurrentUserContext";

export const Profile = ({ onUpdateUser, handleDeleteTocken, error, result }) => { // чтобы проверить работу error, можно убрать из кнопки disabled={!isValid} 
  const [isEditProfileActive, setIsEditProfileActive] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const currentUser = React.useContext(CurrentUserContext); // Подписка на контекст пользователя
  const [name, setName] = useState(''); // Состояние имени
  const [email, setEmail] = useState(''); // Состояние описания
  const [initialName, setInitialName] = useState(''); // Имя записанное в БД
  const [initialEmail, setInitialEmail] = useState(''); // Email записанный в БД
  const [isFieldDifferent, setIsFieldDifferent] = useState(false); // Для проверки различия данных в полях

  // После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name ?? ''); // Если имя не успело прийти с сервера - поле пустое
    setEmail(currentUser.email ?? ''); // Если описание не успело прийти с сервера - поле пустое
  }, [currentUser]);  // При изменении контекста пользователя и, если попап меняет своё состояние открытости - состояние имени и описания меняется

  useEffect(() => { // записываем первое ненулевое значение currentUser
    if (currentUser.name !== '' && currentUser.email !== '') {
      setInitialName(currentUser.name)
      setInitialEmail(currentUser.email)
    }
  }, [currentUser, initialName, initialEmail]);

  useEffect(() => { // проверяем, если ни одно поле не изменено - не валидно
    if (name === initialName && email === initialEmail) { // сравниваем значение из БД со значением в поле
      setIsFieldDifferent(false)
    } else { // если ни одно не совпало - валидно
      setIsFieldDifferent(true)
    }
  }, [name, email, isFieldDifferent]); // отдельные стейты (isValid & setIsFieldDifferent), чтобы с валидностью самых полей не путалось

  useEffect(() => {
    // проверка имени
    if (!name) {
      setIsNameValid(false)
      setNameError('Пожалуйста, введите имя');
    } else if (!/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(name)) {
      setIsNameValid(false)
      setNameError("Допустимые символы: латиница, кириллица, пробел и дефис");
    } else if (!(2 <= name.length)) {
      setIsNameValid(false)
      setNameError('Имя не может быть менее 2 символов');
    } else if ((name.length >= 30)) {
      setIsNameValid(false)
      setNameError('Имя не может быть более 30 символов');
    } else {
      setNameError('');
      setIsNameValid(true)
    }

    // проверка почты
    if (!email) {
      setIsEmailValid(false)
      setEmailValid('Пожалуйста, введите e-mail');
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setIsEmailValid(false)
      setEmailValid('Некорректный e-mail адрес');
    } else {
      setEmailValid('');
      setIsEmailValid(true)
    }

    // проверка валидности полей
    if (!isEmailValid || !isNameValid) {
      setIsValid(false)
    } else if (isEmailValid && isNameValid) {
      setIsValid(true)
    }
  }, [name, email, nameError, emailError, isEditProfileActive]); // error нужен, потому что стейт не успевает обновиться во время проверки условия
  // и ошибка не выводится, а так сам стейт непосредственно меняется и выводится - как есть на данный момент

  const handleEditProfile = () => { // кнопка редактировать
    setIsEditProfileActive(true);
  }

  function handleNameChange(e) { // Следим за изменениями в поле name и подставляем в стейт
    setName(e.target.value);
  }
  function handleEmailChange(e) { // Следим за изменениями в поле email и подставляем в стейт
    setEmail(e.target.value);
  }

  const handleSubmit = (evt) => { // отправка формы
    evt.preventDefault(); // Запрещаем браузеру переходить по адресу формы
    onUpdateUser({ name, email }); // Передаём значения управляемых компонентов во внешний обработчик
    setIsValid(false); // сразу устанавливаем false

    if (result === true) {
      setShowMessage(true);
      const timer = setTimeout(() => { // запускаем таймер, который скроет сообщение через 3 секунды
        setShowMessage(false);
      }, 3000);

      return () => { // очищаем таймер при размонтировании компонента
        clearTimeout(timer);
      };
    }
  }

  const handleSignout = () => { // выходим, удаляем токен и чистим localStorage
    handleDeleteTocken();
    localStorage.clear();
  }

  return (
    <main>
      <section className="profile">
        <h1 className="profile__title">Привет, {name}!</h1> {/* Подставляем текущее имя пользователя */}
        <form className="profile__form" noValidate onSubmit={handleSubmit}>
          <div className="profile__form-container">
            <p className="profile__form-text profile__field">Имя</p>
            <input
              name="name"
              value={name} // значение поля из стейта
              onChange={handleNameChange} // При изменении вызывается функция, которая изменяет введенное значение в поле
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
              className="profile__form-text profile__form-input profile__form-input_field_email"
              type="text"
              placeholder="pochta@yandex.ru"
              minLength="2"
              maxLength="200"
              disabled={!isEditProfileActive && 'disabled'}
              required />
          </div>
          <div className={`profile__container ${isEditProfileActive ? "profile__saved-btn" : ""}`}>
            {!isEditProfileActive && <button type="button" className="profile__button profile__edit-button" onClick={handleEditProfile}>Редактировать</button>}
            {!isEditProfileActive && <Link to={ROUTES.HOME} className="profile__button profile__signout-button" onClick={handleSignout}>Выйти из аккаунта</Link>}

            {showMessage && <span className="profile__result-text">Данные успешно обновлены</span>}
            {isEditProfileActive && !isValid && (error !== '') && <span className="profile__error-text">{error}</span>}
            {isEditProfileActive && !isValid && (nameError !== '') && <span className="profile__error-text">{nameError}</span>}
            {isEditProfileActive && !isValid && (emailError !== '') && <span className="profile__error-text">{emailError}</span>}
            {isEditProfileActive && <button type="submit" disabled={!isValid || !isFieldDifferent} className={`profile__button profile__saved-button ${!isValid || !isFieldDifferent ? "profile__saved-button_inactive" : ""}`} >
              Сохранить
            </button>}
          </div>
        </form>
      </section>
    </main>
  )
}