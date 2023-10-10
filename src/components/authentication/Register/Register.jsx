import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as auth from '../../../utils/Auth';
import './Register.css';

export const Register = ({ onInfoTooltip, onResult, errorMessage }) => {
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
    navigate('/sign-in', { replace: true });
  }).catch((err) => {
    onResult(false)
    errorMessage('Email зарегистрирован или данные неверны')
  })
    .finally(onInfoTooltip)
}

return (
  <div className="register">
    <p className="register__welcome">Регистрация</p>
    <form onSubmit={handleSubmit} className="register__form">
      <input required minLength="2" maxLength="30" id="email" name="email" type="email" value={formValue.email} onChange={handleChange} placeholder="Email" />
      <input required minLength="8" maxLength="30" id="password" name="password" type="password" value={formValue.password} onChange={handleChange} placeholder="Пароль" />
      <div className="register__button-container">
        <button type="submit" className="register__link">Зарегистрироваться</button>
      </div>
    </form>
    <div className="register__signup">
      <p>Уже зарегистрированны?</p>
      <Link to="/sign-in" className="signup__link">Войти</Link>
    </div>
  </div>
)
}