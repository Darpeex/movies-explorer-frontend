// Шапка сайта
import './Header.css';
import { ROUTES } from '../../../constants/constants.js';
import { Routes, Route, NavLink, Link } from 'react-router-dom';

const whiteBackgroundPaths = [
  ROUTES.MOVIES,
  ROUTES.SAVED_MOVIES,
  ROUTES.PROFILE,
];

const SignInAndUp = () => (
  <nav className="header__navigation header__navigation-buttons">
    <ul>
      <li><Link className="header__signup-btn" to={ROUTES.SIGNUP}>Регистрация</Link></li>
      <li><Link className="header__signin-btn" to={ROUTES.SIGNIN}>Войти</Link></li>
    </ul>
  </nav>
)

const HeaderNavigation = ({ headerClass, checkActiveLink }) => (
  <nav className="header__navigation header__navigation-links">
    <ul>
      <li><NavLink className={checkActiveLink} to={ROUTES.MOVIES}>Фильмы</NavLink></li>
      <li><NavLink className={checkActiveLink} to={ROUTES.SAVED_MOVIES}>Сохраненные фильмы</NavLink></li>
    </ul>
    <Link className={`header__profile-btn ${headerClass}`} to={ROUTES.PROFILE}>
      <p>Аккаунт</p>
      <div className="header__profile-btn_circle">
        <div className="header__profile-btn_icon"></div>
      </div>
    </Link>
  </nav>
)

export function Header({ location }) {
  const headerClass = whiteBackgroundPaths.includes(location.pathname) // Белый фон
    ? "header_background-white"
    : "";

  const headerLinksClass = whiteBackgroundPaths.includes(location.pathname) // Чёрный текст
    ? "header__links_color_black"
    : "";

  const checkActiveLink = ({ isActive }) => isActive // Проверка активной ссылки + 'header__links-active'
    ? `header__films ${headerLinksClass} header__links-active`
    : `header__films ${headerLinksClass}`;

  const headerNav = <HeaderNavigation headerClass={headerClass} checkActiveLink={checkActiveLink} />;

  return (
    <header className={`header header_position ${headerClass}`}>
      <Link className="header__logo" to={ROUTES.HOME} aria-label="Главная"></Link>
      <Routes>
        <Route path={ROUTES.HOME} element={headerNav} />
        <Route path={ROUTES.MOVIES} element={headerNav} />
        <Route path={ROUTES.SAVED_MOVIES} element={headerNav} />
        <Route path={ROUTES.PROFILE} element={headerNav} />
        <Route path={ROUTES.SIGNIN} element={<SignInAndUp />} />
        <Route path={ROUTES.SIGNUP} element={<SignInAndUp />} />
      </Routes>
    </header>
  );
}
