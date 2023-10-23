// Шапка сайта
import './Header.css';
import { useState, useEffect } from 'react';
import { BurgerMenu } from './BurgerMenu/BurgerMenu';
import { ROUTES } from '../../../constants/constants.js';
import { Routes, Route, NavLink, Link } from 'react-router-dom';

const { HOME, MOVIES, SAVED_MOVIES, PROFILE, SIGNUP, SIGNIN } = ROUTES;
const whiteBackgroundPaths = [MOVIES, SAVED_MOVIES, PROFILE, SIGNIN, SIGNUP];
const headerOnlyHomeLogo = [SIGNIN, SIGNUP];
const linkLogoHome = <Link className="header__logo" to={HOME} aria-label="Главная"></Link>

const useMediaQuery = (query) => { // query - медиа-запрос, который совместим с CSS медиа-запросом
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches); // инициализируется возвращенным значением `window.matchMedia(query).matches` - matches будет true, если ширина экрана = переданному медиа-запросу (query)
  useEffect(() => { // при каждом вызове этого эффектa...
    const media = window.matchMedia(query); // ...создается новый объект являющийся переданным медиа-запросом
    const listener = (event) => { // listener вызывается, когда изменяется медиа-запрос
      setMatches(event.matches); // и обновляет состояние matches
    };

    media.addEventListener('change', listener); // Добавляем обработчик событий, который вызывает listener при каждом изменении состояния медиа-запроса
    return () => media.removeEventListener('change', listener); // удаляем слушателя при размонтировании компонента, чтобы избежать утечек памяти
  }, [query]); // useEffect вызывается, только когда query - состояние медиа-запроса изменияется
  return matches; // возвращается состояние, по которому и определяется соответствие текущего состояние устройства указанному медиа-запросу
};

const Burger = ({ location, accountButton, headerBurgerBGWhiteClass }) => {
  const items = [
    { key: 1, value: "Главная", href: HOME },
    { key: 2, value: "Фильмы", href: MOVIES },
    { key: 3, value: "Сохраненные фильмы", href: SAVED_MOVIES },
  ]
  const [isOpen, setIsOpen] = useState(false);

  return (<>
    <nav className={`header__navigation-burger ${headerBurgerBGWhiteClass ? "" : "header__navigation-burger_background_green"}`}>
      {linkLogoHome}
      <div className={`header__burger-btn ${headerBurgerBGWhiteClass ? "" : "header__burger-btn_white"}`} onClick={() => setIsOpen(!isOpen)}>
        <span className={`header__burger-button header__burger-button_middle-line ${headerBurgerBGWhiteClass ? "" : "header__burger-button_middle-line_white"}`}></span>
      </div>
    </nav>
    <BurgerMenu items={items} accountButton={accountButton} isOpen={isOpen} setIsOpen={setIsOpen} location={location} />
  </>)
}

const Unauthorized = () => (
  <nav className="header__navigation header__navigation-buttons">
    {linkLogoHome}
    <ul className="header__list-navigation  header__list-navigation_buttons">
      <li className="header__navigation-item"><Link className="header__signup-btn" to={SIGNUP}>Регистрация</Link></li>
      <li className="header__navigation-item"><Link className="header__signin-btn" to={SIGNIN}>Войти</Link></li>
    </ul>
  </nav>
)

const HeaderNavigation = ({ isActiveLink, accountButton }) => (
  <nav className="header__navigation header__navigation-links">
    {linkLogoHome}
    <ul className="header__list-navigation">
      <li className="header__navigation-item header__navigation-item_space header__navigation-item_font-size"><NavLink className={isActiveLink} to={MOVIES}>Фильмы</NavLink></li>
      <li className="header__navigation-item header__navigation-item_font-size"><NavLink className={isActiveLink} to={SAVED_MOVIES}>Сохранённые&nbsp;фильмы</NavLink></li>
    </ul>
    {accountButton}
  </nav>
)

export function Header({ location, loggedIn }) {
  const isPathIncluded = (paths) => paths.includes(location.pathname); // Так много классов, чтобы всё удовлетворяло БЭМу
  const headerOnlyHomeLogoClass = isPathIncluded(headerOnlyHomeLogo) // Только логотип в Header
    ? "header_authorization"
    : "";

  const headerBackgroundWhiteClass = isPathIncluded(whiteBackgroundPaths) // Белый фон 
    ? "header__films_background_white header__films_color_black"
    : "";

  const profileBackgroundWhiteClass = isPathIncluded(whiteBackgroundPaths) // Белый фон 
    ? "header__profile-btn_background_white"
    : "";

  const headerBackgroundWhite = isPathIncluded(whiteBackgroundPaths) // Белый фон 
    ? "header_background_white header_color_black"
    : "";


  const headerBurgerBGWhiteClass = isPathIncluded(whiteBackgroundPaths) // Белый фон 
    ? true
    : false;

  const isActiveLink = ({ isActive }) => isActive // Проверка активной ссылки + 'header__links-active'
    ? `header__films ${headerBackgroundWhiteClass} header__links-active`
    : `header__films ${headerBackgroundWhiteClass}`;

  const accountButton = (
    <Link className={`header__profile-btn ${profileBackgroundWhiteClass}`} to={PROFILE}>
      <p className="header__btn-profile header__btn-profile_text">Аккаунт</p>
      <div className="header__btn-profile header__btn-profile_circle">
        <div className="header__icon-btn-profile"></div>
      </div>
    </Link>
  )

  const headerNav = <HeaderNavigation accountButton={accountButton} isActiveLink={isActiveLink} />;
  const burgerNav = <Burger accountButton={accountButton} location={location} headerBurgerBGWhiteClass={headerBurgerBGWhiteClass} />;

  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <header className={`header header_position ${headerOnlyHomeLogoClass ? "header_logo_position" : ""} ${loggedIn ? "header_burger_style" : ""} ${headerBackgroundWhite} ${headerOnlyHomeLogoClass}`}>
      <Routes>
        <Route path={SIGNIN} element={linkLogoHome} />
        <Route path={SIGNUP} element={linkLogoHome} />
        {isMobile ? (
          <>
            <Route path={HOME} element={loggedIn ? burgerNav : <Unauthorized />} />
            <Route path={MOVIES} element={burgerNav} />
            <Route path={SAVED_MOVIES} element={burgerNav} />
            <Route path={PROFILE} element={burgerNav} />
          </>
        ) : ( // Если @media screen and (max-width: 768px)
          <>
            <Route path={HOME} element={loggedIn ? headerNav : <Unauthorized />} />
            <Route path={MOVIES} element={headerNav} />
            <Route path={SAVED_MOVIES} element={headerNav} />
            <Route path={PROFILE} element={headerNav} />
          </>
        )}
      </Routes>
    </header>
  );
}
