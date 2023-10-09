import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as auth from '../utils/Auth';
import '../styles/Login.css';

export const Login = ({ handleLogin, onInfoTooltip, onResult, errorMessage }) => {
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
      <p className="login__welcome">Вход</p>
      <form onSubmit={handleSubmit} className="login__form">
        <input required id="email" name="email" type="text" value={formValue.email} onChange={handleChange} placeholder="Email" />
        <input required id="password" name="password" type="password" value={formValue.password} onChange={handleChange} placeholder="Пароль" />
        <div className="login__button-container">
          <button type="submit" className="login__link">Войти</button>
        </div>
      </form>
    </div>
  )
}