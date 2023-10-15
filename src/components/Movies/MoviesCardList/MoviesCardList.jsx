// Раздел для карточек с фильмами
import React from 'react';
import './MoviesCardList.css';
import { MoviesCard } from '../MoviesCard/MoviesCard';
// import { MoviesContext } from '../../../context/MoviesContext';

export function MoviesCardList({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete }) {  // Передаются функции открытия попапов из App.js
  // const cards = React.useContext(MoviesContext); // Подписываемся на контекст карточек, затем передаём массив карточек и обрабатываем их
  return (
    // Отрисовываем каждую карточку при помощи компонента Card и возвращаем в разметку внутрь section
    <section id="elements" className="elements page__elements-position section">
      <MoviesCard />
      {/* {cards.map(card => (// Пробегаем по переданному массиву и возвращаем целые карточки при помощи разметки
        <MoviesCard key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />))} */}
    </section>
  )
}
