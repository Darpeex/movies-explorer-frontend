import './Login.css';
import React, { useState } from 'react';
import * as auth from '../../../utils/Auth';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/constants';

export const Login = ({ handleLogin, onInfoTooltip, onResult, errorMessage }) => {
  const [isError, setIsError] = useState(false)
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    console.log(formValue)
    auth.login(formValue.password, formValue.email)
      .then((data) => {
        setFormValue({ password: '', email: '' });
        handleLogin();
        navigate('/movies', { replace: true });
      }).catch(err => {
        onResult(false)
        errorMessage('Похоже, вы ещё не зарегистририровались')
        onInfoTooltip()
        console.log(err)
      });
  }

  return (
    <main>
      <section className="login">
        <p className="login__welcome">Рады видеть!</p>
        <form onSubmit={handleSubmit} className="login__form">
          <label className="login__field-form login__field-form_name">E-mail</label>
          <input
            className="login__input-form"
            minLength="8"
            maxLength="30"
            id="email"
            name="email"
            type="email"
            value={formValue.email}
            onChange={handleChange}
            placeholder="Введите почту"
            required
          />
          <label className="login__field-form login__field-form_name">Пароль</label>
          <input
            className={`login__input-form ${isError ? "login__input-form_error" : ""}`} // демонстрация верстки
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
          {isError && <label className="login__error-form">Что-то пошло не так...</label>} {/* демонстрация верстки */}
          <div className="login__button-container">
            <button type="submit" className="login__button">Войти</button>
          </div>
        </form>
        <div className="login__signup">
          <p className="login__text-signup">Ещё не зарегистрированы?</p>
          <Link to={ROUTES.SIGNUP} className="login__button-signup">Регистрация</Link>
        </div>
      </section></main>
  )
}

// Ошибки ниже отображаются не под инпутами, а при получении ошибки после отправки запроса
// Вы&nbsp;ввели неправильный логин или пароль.
// При авторизации произошла ошибка. Токен не&nbsp;передан или передан не&nbsp;в&nbsp;том формате.
// При авторизации произошла ошибка. Переданный токен некорректен.