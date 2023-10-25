// Раздел для карточек с фильмами
import './MoviesCardList.css';
import React, { useContext } from 'react';
import { MoviesCard } from '../MoviesCard/MoviesCard';

export function MoviesCardList({ onCardLike, onCardDelete, searchResults }) {  // Передаются функции открытия попапов из App.js
  return ( // Отрисовываем каждый фильм при помощи компонента Movie и возвращаем в разметку внутрь section
    <section id="elements" className="elements page__elements-position section">
      {searchResults.map(movie => (// Пробегаем по переданному массиву и возвращаем карточки с фильмами
        <MoviesCard key={movie.id} movie={movie} onCardLike={onCardLike} onCardDelete={onCardDelete} />))}
    </section>
  )
}
