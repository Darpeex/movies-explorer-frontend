import './Login.css';
import React from 'react';
import * as auth from '../../../utils/Auth';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/constants';
import { Formik, Form, Field, ErrorMessage } from 'formik';

export const Login = ({ handleLogin, onResult, error, setError }) => {
  const navigate = useNavigate();

  return (
    <main>
      <section className="login">
        <h1 className="login__welcome">Рады видеть!</h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          validateOnChange={true} // показывает ошибку при изменении поля (нет)
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Пожалуйста, введите e-mail';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
              errors.email = 'Некорректный e-mail адрес';
            }
            if (!values.password) {
              errors.password = 'Пожалуйста, введите пароль';
            } else if (!(values.password.length < 8)) {
              errors.password = 'Длина пароля не меньше 8 символов';
            }
            setError('')
            return errors;
          }}
          validateOnMount // включение проверки при загрузке страницы
          onSubmit={(values, { setSubmitting }) => {
            auth.login(values.password, values.email)
              .then((res) => {
                onResult(true)
                handleLogin();
                navigate(ROUTES.MOVIES, { replace: true });
              }).catch(err => {
                onResult(false)
                setError('Почта незарегистрированна или данные неверны')
                console.log(err)
              })
              .finally(() => {
                setSubmitting(false)
              })
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="login__form" noValidate> {/* noValidate - отключена браузерная валидация */}

              <label htmlFor="email" className="login__field-form login__field-form_name">E-mail</label>
              <Field type="email" name="email" className={`login__input-form ${errors.email && touched.email ? "login__input-form_error" : ""}`} placeholder="Введите почту" />

              <ErrorMessage name="email" component="div" className="login__error-form" />

              <label htmlFor="password" className="login__field-form login__field-form_name">Пароль</label>
              <Field type="password" name="password" className={`login__input-form ${errors.password && touched.password ? "login__input-form_error" : ""}`} placeholder="Введите пароль" />

              <ErrorMessage name="password" component="div" className="login__error-form" />

              <div className="login__button-container">
                {(error !== '') && <span className="login__error-message">{error}</span>}
                <button type="submit" className="login__button" disabled={isSubmitting}>
                  Войти
                </button>
              </div>

              <div className="login__signup">
                <p className="login__text-signup">Ещё не зарегистрированы?</p>
                <Link to={ROUTES.SIGNUP} className="login__button-signup">Регистрация</Link>
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </main>
  )
}
