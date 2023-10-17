// Шапка сайта
import './Header.css';
import { ROUTES } from '../../../constants/constants.js';
import { Routes, Route, NavLink, Link } from 'react-router-dom';
const { HOME, MOVIES, SAVED_MOVIES, PROFILE, SIGNUP, SIGNIN } = ROUTES;

const whiteBackgroundPaths = [MOVIES, SAVED_MOVIES, PROFILE, SIGNIN, SIGNUP];
const headerOnlyHomeLogo = [SIGNIN, SIGNUP];

const Unauthorized = () => (
  <nav className="header__navigation header__navigation-buttons">
    <ul className="header__navigation-list">
      <li className="header__navigation-item"><Link className="header__signup-btn" to={SIGNUP}>Регистрация</Link></li>
      <li className="header__navigation-item"><Link className="header__signin-btn" to={SIGNIN}>Войти</Link></li>
    </ul>
  </nav>
)

const HeaderNavigation = ({ headerBackgroundWhiteClass, isActiveLink }) => (
  <nav className="header__navigation header__navigation-links">
    <ul className="header__navigation-list">
      <li className="header__navigation-item"><NavLink className={isActiveLink} to={MOVIES}>Фильмы</NavLink></li>
      <li className="header__navigation-item"><NavLink className={isActiveLink} to={SAVED_MOVIES}>Сохраненные фильмы</NavLink></li>
    </ul>
    <Link className={`header__profile-btn ${headerBackgroundWhiteClass}`} to={PROFILE}>
      <p className="header__profile-btn_text">Аккаунт</p>
      <div className="header__profile-btn_circle">
        <div className="header__profile-btn_icon"></div>
      </div>
    </Link>
  </nav>
)

export function Header({ location, loggedIn }) {
  const isPathIncluded = (paths) => paths.includes(location.pathname);
  const headerOnlyHomeLogoClass = isPathIncluded(headerOnlyHomeLogo) // Только логотип в Header
    ? "header_authorization"
    : "";

  const headerBackgroundWhiteClass = isPathIncluded(whiteBackgroundPaths) // Белый фон 
    ? "header_background-white header__links_color_black"
    : "";

  const isActiveLink = ({ isActive }) => isActive // Проверка активной ссылки + 'header__links-active'
    ? `header__films ${headerBackgroundWhiteClass} header__links-active`
    : `header__films ${headerBackgroundWhiteClass}`;

  const headerNav = <HeaderNavigation headerBackgroundWhiteClass={headerBackgroundWhiteClass} isActiveLink={isActiveLink} />;

  return (
    <header className={`header header_position ${headerBackgroundWhiteClass} ${headerOnlyHomeLogoClass}`}>
      <Link className="header__logo" to={HOME} aria-label="Главная"></Link>
      <Routes>
        <Route path={HOME} element={loggedIn ? headerNav : <Unauthorized />} />
        <Route path={MOVIES} element={headerNav} />
        <Route path={SAVED_MOVIES} element={headerNav} />
        <Route path={PROFILE} element={headerNav} />
        <Route path={SIGNIN} element={<></>} />
        <Route path={SIGNUP} element={<></>} />
      </Routes>
    </header>
  );
}
