// Шапка сайта
import './Header.css';
import { useState } from 'react';
import { BurgerMenu } from './BurgerMenu/BurgerMenu';
import { ROUTES } from '../../../constants/constants.js';
import { Routes, Route, NavLink, Link } from 'react-router-dom';
const { HOME, MOVIES, SAVED_MOVIES, PROFILE, SIGNUP, SIGNIN } = ROUTES;
const whiteBackgroundPaths = [MOVIES, SAVED_MOVIES, PROFILE, SIGNIN, SIGNUP];
const headerOnlyHomeLogo = [SIGNIN, SIGNUP];
const linkLogoHome = <Link className="header__logo" to={HOME} aria-label="Главная"></Link>

const Burger = ({ location, accountButton }) => {
  const items = [
    { key: 1, value: "Главная", href: HOME },
    { key: 2, value: "Фильмы", href: MOVIES },
    { key: 3, value: "Сохраненные фильмы", href: SAVED_MOVIES },
  ]
  const [isOpen, setIsOpen] = useState(false);

  return (<>
    <nav className="header__navigation-burger">
      {linkLogoHome}
      <div className="header__burger-btn" onClick={() => setIsOpen(!isOpen)}>
        <span className="header__burger-btn_middle-line"></span>
      </div>
    </nav>
    <BurgerMenu items={items} accountButton={accountButton} isOpen={isOpen} setIsOpen={setIsOpen} location={location} />
  </>)
}

const Unauthorized = () => (
  <nav className="header__navigation header__navigation-buttons">
    {linkLogoHome}
    <ul className="header__navigation-list  header__navigation-list_buttons">
      <li className="header__navigation-item"><Link className="header__signup-btn" to={SIGNUP}>Регистрация</Link></li>
      <li className="header__navigation-item"><Link className="header__signin-btn" to={SIGNIN}>Войти</Link></li>
    </ul>
  </nav>
)

const HeaderNavigation = ({ isActiveLink, accountButton }) => (
  <nav className="header__navigation header__navigation-links">
    {linkLogoHome}
    <ul className="header__navigation-list">
      <li className="header__navigation-item"><NavLink className={isActiveLink} to={MOVIES}>Фильмы</NavLink></li>
      <li className="header__navigation-item"><NavLink className={isActiveLink} to={SAVED_MOVIES}>Сохраненные&nbsp;фильмы</NavLink></li>
    </ul>
    {accountButton}
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

  const accountButton = (
    <Link className={`header__profile-btn ${headerBackgroundWhiteClass}`} to={PROFILE}>
      <p className="header__profile-btn_text">Аккаунт</p>
      <div className="header__profile-btn_circle">
        <div className="header__profile-btn_icon"></div>
      </div>
    </Link>
  )

  const headerNav = <HeaderNavigation accountButton={accountButton} headerBackgroundWhiteClass={headerBackgroundWhiteClass} isActiveLink={isActiveLink} />;

  return (
    <header className={`header header_position ${headerBackgroundWhiteClass} ${headerOnlyHomeLogoClass}`}>
      <Routes>
        <Route path={HOME} element={loggedIn ? headerNav : <Unauthorized />} />
        <Route path={MOVIES} element={headerNav} />
        <Route path={SAVED_MOVIES} element={headerNav} />
        <Route path={PROFILE} element={headerNav} />
        <Route path={SIGNIN} element={linkLogoHome} />
        <Route path={SIGNUP} element={linkLogoHome} />
        <Route path={'/burger'} element={<Burger accountButton={accountButton} location={location} />} /> {/* test string */}
      </Routes>
    </header>
  );
}
