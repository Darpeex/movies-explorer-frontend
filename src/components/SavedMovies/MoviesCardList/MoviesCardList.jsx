// Раздел для карточек с сохранёнными фильмами
import './MoviesCardList.css';
import React from 'react';
import { MoviesCard } from '../MoviesCard/MoviesCard';

export function MoviesCardList({ onCardLike, savedMovies, handleDeleteClick }) {
  return ( // Отрисовываем каждый фильм при помощи компонента Movie и возвращаем в разметку внутрь section
    <section id="elements" className="elements page__elements-position section">
      {savedMovies && savedMovies.map(movie => ( // Пробегаем по переданному массиву и возвращаем карточки с фильмами
        <MoviesCard key={movie.movieId} movie={movie} handleDeleteClick={handleDeleteClick} />))}
    </section>
  )
}
