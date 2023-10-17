// Компонент регистрации
import './Register.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as auth from '../../../utils/Auth';

export const Register = ({ onInfoTooltip, onResult, errorMessage }) => {
  const [isError, setIsError] = useState(false)
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
    <div className="register">
      <h1 className="register__welcome">Добро пожаловать!</h1>
      <form onSubmit={handleSubmit} className="register__form">
        <span className="register__form_field_name">Имя</span>
        <input
          className="register__form-input"
          minLength="2"
          maxLength="30"
          id="name"
          name="name"
          type="name"
          value={formValue.name}
          onChange={handleChange}
          placeholder="Введите имя"
          required
        />
        <span className="register__form_field_name">E-mail</span>
        <input
          className="register__form-input"
          minLength="8"
          maxLength="30"
          id="email"
          name="email"
          type="email"
          value={formValue.email}
          onChange={handleChange}
          placeholder="Введите e-mail"
          required
        />
        <span className="register__form_field_name">Пароль</span>
        <input
          className={`register__form-input ${isError ? "register__form_field_margin_off" : "" }`}
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
        {isError && <span className="register__form_error">Что-то пошло не так...</span>}
        <div className="register__button-container">
          <button type="submit" className="register__button">Зарегистрироваться</button>
        </div>
      </form>
      <div className="register__signup">
        <p className="register__signup_text">Уже зарегистрированны?</p>
        <Link to="/signin" className="signup__button">Войти</Link>
      </div>
    </div>
  )
}