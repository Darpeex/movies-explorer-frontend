// Шапка сайта
import './Header.css';
import { ROUTES } from '../../../constants/constants.js';
import { Routes, Route, Link } from 'react-router-dom';

const Navigation = () => (
  <nav className="header__navigation header__navigation-links">
    <ul>
      <li><Link className="header__films" to={ROUTES.MOVIES}>Фильмы</Link></li>
      <li><Link className="header__saved-films" to={ROUTES.SAVED_MOVIES}>Сохраненные фильмы</Link></li>
    </ul>
    <Link className="header__profile-btn" to={ROUTES.PROFILE}>
      <p>Аккаунт</p>
      <div className="header__profile-btn_circle">
        <div className="header__profile-btn_icon"></div>
      </div>
    </Link>
  </nav>
)

const SignInAndUp = () => (
  <nav className="header__navigation header__navigation-buttons">
    <ul>
      <li><Link className="header__signup-btn" to={ROUTES.SIGNUP}>Регистрация</Link></li>
      <li><Link className="header__signin-btn" to={ROUTES.SIGNIN}>Войти</Link></li>
    </ul>
  </nav>
)

export function Header() {
  return (
    <header className="header header_position">
      <Link className="header__logo" to={ROUTES.HOME} aria-label="Главная"></Link>
      <Routes>
        <Route path={ROUTES.HOME} element={<Navigation />} />
        <Route path={ROUTES.MOVIES} element={<Navigation />} />
        <Route path={ROUTES.SAVED_MOVIES} element={<Navigation />} />
        <Route path={ROUTES.PROFILE} element={<Navigation />} />
        <Route path={ROUTES.SIGNIN} element={<SignInAndUp />} />
        <Route path={ROUTES.SIGNUP} element={<SignInAndUp />} />
      </Routes>
    </header>
  );
}
