// Раздел для карточек с сохранёнными фильмами
import './SavedMoviesCardList.css';
import React from 'react';
import { SavedMoviesCard } from '../SavedMoviesCard/SavedMoviesCard';

export function SavedMoviesCardList({ onCardLike, savedMovies, handleDeleteClick }) {
  return ( // Отрисовываем каждый фильм при помощи компонента Movie и возвращаем в разметку внутрь section
    <section id="elements" className="elements page__elements-position section">
      {savedMovies && savedMovies.map(movie => ( // Пробегаем по переданному массиву и возвращаем карточки с фильмами
        <SavedMoviesCard key={movie.movieId} movie={movie} handleDeleteClick={handleDeleteClick} />))}
    </section>
  )
}
