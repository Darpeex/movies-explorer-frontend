import './Login.css';
import React, { useState } from 'react';
import * as auth from '../../../utils/Auth';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/constants';

export const Login = ({ handleLogin, onInfoTooltip, onResult, errorMessage }) => {
  const [isError, setIsError] = useState(true)
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
    auth.login(formValue.password, formValue.email)
      .then((data) => {
        setFormValue({ password: '', email: '' });
        handleLogin();
        navigate('/main', { replace: true });
      }).catch(err => {
        onResult(false)
        errorMessage('Похоже, вы ещё не зарегистририровались')
        onInfoTooltip()
        console.log(err)
      });
  }

  return (
    <div className="login">
      <p className="login__welcome">Рады видеть!</p>
      <form onSubmit={handleSubmit} className="login__form">
        <span className="login__form_field_name">E-mail</span>
        <input
          className="login__form-input"
          minLength="8"
          maxLength="30"
          id="email"
          name="email"
          type="email"
          value={formValue.email}
          onChange={handleChange}
          required
        />
        <span className="login__form_field_name">Пароль</span>
        <input
          className={`login__form-input ${isError ? "login__form_field_error" : ""}`}
          minLength="8"
          maxLength="30"
          id="password"
          name="password"
          type="password"
          value={formValue.password}
          onChange={handleChange}
          required
        />
        {isError && <span className="login__form_error">Что-то пошло не так...</span>}
        <div className="login__button-container">
          <button type="submit" className="login__button">Зарегистрироваться</button>
        </div>
      </form>
      <div className="login__signup">
        <p className="login__signup_text">Ещё не зарегистрированы?</p>
        <Link to={ROUTES.SIGNUP} className="signup__button">Регистрация</Link>
      </div>
    </div>
  )
}