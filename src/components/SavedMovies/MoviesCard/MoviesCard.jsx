// Компонент MoviesCard
import './MoviesCard.css';
import React, { useEffect, useState } from "react";
import { SavedMoviesContext } from '../../../context/SavedMoviesContext';

export function MoviesCard({ movie, handleDeleteClick }) {
  const savedMovies = React.useContext(SavedMoviesContext)
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (savedMovies && savedMovies.length > 0) {
      setIsLiked(savedMovies.some(card => card.movieId === movie.movieId)) // Определяем, есть ли фильм в БД
    } else {
      setIsLiked(false)
    }
  }, [savedMovies]);

  function onLikeClicked() {
    handleDeleteClick(movie); // добавляем или удаляем в сохраненные фильмы
  }

  const convertDurationToHourlyFormat = () => {
    const duration = movie.duration; // длительность фильма
    const remainder = (duration % 60) // остаток от деления на 60
    const durationToHour = (duration / 60); // целое от деления на 60
    if (duration >= 60) { // если больше часа по времени
      return `${Math.floor(durationToHour)}ч ${remainder}м`
    } else { // если меньше часа - в минутах
      return `${remainder}м`;
    }
  }

  return (
    // Секция, блок elements
    <article className="elements-block">
      <a className="elements-block__link" href={movie.trailerLink} target="_blank" rel="noreferrer noopener">
        <img className="elements-block__image" src={movie.image} alt={movie.nameRU} />
      </a>
      <div className="elements-block__description">
        <h2 className="elements-block__name">{movie.nameRU}</h2>
        <button className="elements-block__like-button" type="button" aria-label="Лайк" onClick={onLikeClicked}>
          <div className={`elements-block__like-icon ${isLiked ? "active" : ""}`}></div>
        </button>
      </div>
      <hr className="elements-block__underline" />
      <span className="elements-block__film-duration">{convertDurationToHourlyFormat()}</span>
    </article>
  )
}