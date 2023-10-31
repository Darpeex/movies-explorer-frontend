// Компонент MoviesCard
import './MoviesCard.css';
import React from "react";

export function MoviesCard({ movie, handleDeleteClick }) {
  const isLiked = true;  // убрал условие для повторной проверки фильмов, т.к. они уже находятся в savedMovies

  function onLikeClicked() {
    handleDeleteClick(movie); // удаляем фильм из сохраненных
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