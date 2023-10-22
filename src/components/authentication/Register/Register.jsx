// Компонент регистрации
import './Register.css';
import React, { useState } from 'react';
import * as auth from '../../../utils/Auth';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/constants';

export const Register = ({ onInfoTooltip, onResult, errorMessage }) => {
  const [isError, setIsError] = useState(true)
  const [formValue, setFormValue] = useState({
    password: '',
    email: '',
  })
  const navigate = useNavigate();

  // Преобразование значения email в нижний регистр
  // const processedValue = name === "email" ? value.toLowerCase() : value;
  // Сейчас в это нет необходимости - мы делаем это в backend'e сразу перед отправкой на сервер
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { password, email } = formValue;
    auth.register(password, email).then((res) => {
      onResult(true)
      navigate('/signin', { replace: true });
    }).catch((err) => {
      onResult(false)
      errorMessage('Email зарегистрирован или данные неверны')
    })
      .finally(onInfoTooltip)
  }

  return (
    <main>
      <section className="register">
        <h1 className="register__welcome">Добро пожаловать!</h1>
        <form onSubmit={handleSubmit} className="register__form">
          <label className="register__label">Имя</label>
          <input
            className="register__form-input"
            minLength="2"
            maxLength="30"
            id="name"
            name="name"
            type="text"
            value={formValue.name}
            onChange={handleChange}
            placeholder="Ваше имя"
            required
          />
          <label className="register__label">E-mail</label>
          <input
            className="register__form-input"
            minLength="8"
            maxLength="30"
            id="email"
            name="email"
            type="email"
            value={formValue.email}
            onChange={handleChange}
            placeholder="example@email.ru"
            required
          />
          <label className="register__label">Пароль</label>
          <input
            className={`register__form-input ${isError ? "register__form-input_error" : ""}`}
            minLength="8"
            maxLength="30"
            id="password"
            name="password"
            type="password"
            value={formValue.password}
            onChange={handleChange}
            placeholder="Введите пароль"
            required
          />
          {isError && <span className="register__form-error">Что-то пошло не так...</span>}
          <div className="register__button-container">
            <button type="submit" className="register__button">Зарегистрироваться</button>
          </div>
        </form>
        <div className="register__signup">
          <p className="register__text-signup">Уже зарегистрированы?</p>
          <Link to={ROUTES.SIGNIN} className="register__signin-button">Войти</Link>
        </div>
      </section>
    </main>
  )
}

// Ошибки ниже отображаются не под инпутами, а при получении ошибки после отправки запроса
// Пользователь с&nbsp;таким email уже существует.
// При регистрации пользователя произошла ошибка.