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
      <div className="header__burger-menu_content" onClick={e => e.stopPropagation()}> {/* останавливапем всплытие - меню закрывается только по щелчку вне "header__burger-menu_content" */}
        <div className="header__burger-menu_close-button" onClick={onCloseButtonClick}></div>
        <ul className="header__burger-menu_list">
          {items.map(item => (
            <li key={item.key} className={`header__burger-menu_item ${isActive(item.href) ? 'active' : ''}`}>
              <Link to={item.href} className="header__burger-menu_link">{item.value}</Link>
            </li>
          )
          )}
        </ul>
        {accountButton && <div className="header__burger-menu_accaunt-btn">{accountButton}</div>}
      </div>
    </nav>
  )
}