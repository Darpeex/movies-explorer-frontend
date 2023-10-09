// Компонент Card
import React from "react"
import { CurrentUserContext } from '../context/CurrentUserContext';

export function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext); // Подписываемся на контекст пользователя
  const isOwn = card.owner === currentUser._id; // Определяем, являемся ли мы владельцем текущей карточки
  const isLiked = card.likes.some(likerId => likerId === currentUser._id); // Определяем, поставлен ли лайк текущим пользователем

  function handleClick() { // открытие карточки при нажатии на картиннку
    onCardClick(card);
  }
  function handleLikeClick() { // отвечает за лайк
    onCardLike(card);
  }
  function handleDeleteClick() { // удаление карточки
    onCardDelete(card);
  }

  return (
    // Секция, блок elements
    <article className="elements-block">
      <img src={card.link} alt={card.name} onClick={() => handleClick(card)} className="elements-block__image" />
      {isOwn && <button className="elements-block__delete-button" onClick={handleDeleteClick}></button>} {/* Если карточка наша isOwn - добавляется корзина = кнока удаления */}
      <div className="elements-block__text">
        <h2 className="elements-block__name">{card.name}</h2>
        <div className="elements-block__like-container">
          <button className={`elements-block__like-button ${isLiked && 'elements-block__like-button_active'}`} type="button" aria-label="Лайк" onClick={handleLikeClick}></button>
          <span className="elements-block__like-count">{card.likes.length}</span>
        </div>
      </div>
    </article>
  )
}