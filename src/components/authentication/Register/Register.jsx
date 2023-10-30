// Компонент регистрации
import './Register.css';
import React, { useState } from 'react';
import * as auth from '../../../utils/Auth';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/constants';
import { Formik, Form, Field, ErrorMessage } from 'formik';

export const Register = ({ handleLogin, onResult, error, setError }) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  return (
    <main>
      <section className="register">
        <h1 className="register__welcome">Добро пожаловать!</h1>
        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = 'Пожалуйста, введите имя';
            } else if (!/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(values.name)) {
              errors.name = "Допустимые символы: латиница, кириллица, пробел и дефис";
            } else if (!(2 <= values.name.length)) {
              errors.name = 'Имя не может быть менее 2 символов';
            } else if ((values.name.length >= 30)) {
              errors.name = 'Имя не может быть более 30 символов';
            }
            if (!values.email) {
              errors.email = 'Пожалуйста, введите e-mail';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
              errors.email = 'Некорректный e-mail адрес';
            }
            if (!values.password) {
              errors.password = 'Пожалуйста, введите пароль';
            } else if (!(8 <= values.password.length)) {
              errors.password = 'Длина пароля не меньше 8 символов';
            }
            setIsFormValid(Object.keys(errors).length === 0);
            setError('')
            return errors;
          }}
          validateOnMount // включение проверки при загрузке страницы
          onSubmit={(values, { setSubmitting }) => {
            auth.register(values.name, values.password, values.email)
              .then((res) => {
                onResult(true)
                auth.login(values.password, values.email) // сразу авторизируем и пеернаправляем пользователя на /movies
                  .then((data) => {
                    handleLogin();
                    navigate('/movies', { replace: true });
                  }).catch(err => {
                    console.log(err)
                  });
              })
              .catch((err) => {
                onResult(false)
                setError('Email зарегистрирован или данные неверны')
              })
              .finally(() => {
                setSubmitting(false)
              })
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="register__form" noValidate> {/* noValidate - отключена браузерная валидация */}
              <label htmlFor="name" className="register__label">Имя</label>
              <Field type="text" name="name" className={`register__form-input ${errors.name && touched.name ? "register__form-input_error" : ""}`} placeholder="Введите имя" />

              <ErrorMessage name="name" component="div" className="register__form-error" />

              <label htmlFor="email" className="register__label">E-mail</label>
              <Field type="email" name="email" className={`register__form-input ${errors.email && touched.email ? "register__form-input_error" : ""}`} placeholder="example@email.ru" />

              <ErrorMessage name="email" component="div" className="register__form-error" />

              <label htmlFor="password" className="register__label">Пароль</label>
              <Field type="password" name="password" className={`register__form-input ${errors.password && touched.password ? "register__form-input_error" : ""}`} placeholder="Введите пароль" />

              <ErrorMessage name="password" component="div" className="register__form-error" />

              <div className="register__button-container">
                {(error !== '') && <span className="register__error-message">{error}</span>}
                <button type="submit" className="register__button" disabled={isSubmitting || !isFormValid}>
                  Зарегистрироваться
                </button>
              </div>

              <div className="register__signup">
                <p className="register__text-signup">Уже зарегистрированы?</p>
                <Link to={ROUTES.SIGNIN} className="register__signin-button">Войти</Link>
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </main>
  )
}