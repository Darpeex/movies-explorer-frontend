// Раздел для карточек с фильмами
import './MoviesCardList.css';
import React, { useState, useEffect } from 'react';
import { MoviesCard } from '../MoviesCard/MoviesCard';

export function MoviesCardList({ onCardLike, onCardDelete, initialMovies, filteredMovies }) {  // Передаются функции открытия попапов из App.js
  const [moviesToShow, setMoviesToShow] = useState(initialMovies);

  useEffect(() => {
    if (filteredMovies) {
      setMoviesToShow(filteredMovies);
    } else {
      setMoviesToShow(initialMovies);
    }
  }, [initialMovies, filteredMovies]);

  return ( // Отрисовываем каждый фильм при помощи компонента Movie и возвращаем в разметку внутрь section
    <section id="elements" className="elements page__elements-position section">
      {moviesToShow && moviesToShow.map(movie => (// Пробегаем по переданному массиву и возвращаем карточки с фильмами
        <MoviesCard key={movie.id} movie={movie} onCardLike={onCardLike} onCardDelete={onCardDelete} />))}
    </section>
  )
}
