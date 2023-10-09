// Шапка сайта
import { Link } from 'react-router-dom';

export function Header({ location, userData, onSignOut }) {
  function handleDeleteTocken() {
    onSignOut();
  }

  return (
    <header className="header page__header-position">
      <div className="header__logo"></div>
      {location.pathname === "/sign-up" && <Link className="header__logo_sign-up" to="/sign-in">Войти</Link>}
      {location.pathname === "/sign-in" && <Link className="header__logo_sign-in" to="/sign-up">Регистрация</Link>}
      {location.pathname === "/main" && <div className="header__logo_main"> {/* Возможно сделать onClick={Функция выводящая пользователя из авторизации и to="на страницу авторизации"} или просто удалить токен */}
        <p>{userData.email}</p> {/* Или просто передавать откуда-нибудь из FormValue */}
        <Link onClick={handleDeleteTocken}>Выйти</Link>
      </div>}
    </header>
  );
}

// Так можно отрисовывать определенный контент под определенный путь:
//       <Route exact path="/">
//         <div className="header__wrapper">
//           <p className="header__user">{email}</p>
//           <button className="header__logout" onClick={handleSignOut}>
//             Выйти
//           </button>
//         </div>
//       </Route>
//       <Route path="/signup">
//         <Link className="header__auth-link" to="signin">
//           Войти
//         </Link>
//       </Route>
//       <Route path="/signin">
//         <Link className="header__auth-link" to="signup">
//           Регистрация
//         </Link>
//       </Route>