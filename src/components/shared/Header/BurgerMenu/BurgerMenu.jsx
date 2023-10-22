// Бургер-меню
import './BurgerMenu.css';
import { Link } from 'react-router-dom';

export const BurgerMenu = ({ items, accountButton, isOpen, setIsOpen, location }) => {
  const onCloseButtonClick = () => {
    setIsOpen(false)
  }

  const isActive = (href) => {
    return location.pathname === href;
  }

  return (
    <nav className={isOpen ? "header__navigation-burger-menu isOpen" : "header__navigation-burger-menu"} onClick={() => setIsOpen(false)}>
      <div className="header__burger-menu-content" onClick={e => e.stopPropagation()}> {/* останавливапем всплытие - меню закрывается только по щелчку вне "header__burger-menu-content" */}
        <div className="header__burger-menu-button-close" onClick={onCloseButtonClick}></div>
        <ul className="header__burger-menu-list">
          {items.map(item => (
            <li key={item.key} className={`header__burger-menu-item ${isActive(item.href) ? 'active' : ''}`}>
              <Link to={item.href} className="header__burger-menu-link">{item.value}</Link>
            </li>
          )
          )}
        </ul>
        {accountButton && <div className="header__burger-menu-accaunt-btn">{accountButton}</div>}
      </div>
    </nav>
  )
}