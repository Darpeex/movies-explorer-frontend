// Раздел для карточек с фильмами
import React, { useContext } from 'react';
import './MoviesCardList.css';
import { MoviesCard } from '../MoviesCard/MoviesCard';
import { MoviesContext } from '../../../context/MoviesContext';

export function MoviesCardList({ onCardLike, onCardDelete }) {  // Передаются функции открытия попапов из App.js
  const movies = useContext(MoviesContext); // Подписываемся на контекст фильмов, затем передаём массив фильмов и обрабатываем
  return ( // Отрисовываем каждый фильм при помощи компонента Movie и возвращаем в разметку внутрь section
    <section id="elements" className="elements page__elements-position section">
      {movies.map(movie => (// Пробегаем по переданному массиву и возвращаем карточки с фильмами
        <MoviesCard key={movie.id} movie={movie} onCardLike={onCardLike} onCardDelete={onCardDelete} />))}
    </section>
  )
}
