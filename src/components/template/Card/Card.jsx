// Компонент Card
import './Card.css';
import React from "react";
import { convertDurationToHourlyFormat } from '../../../constants/constants';

export function Card({ movie, isLiked, handleLike, image, typeOfMovie }) {
  function onLikeClicked() {
    handleLike(movie); // добавляем или удаляем фильм в сохраненные
  }

  return (
    // Секция, блок elements
    <article className="elements-block">
      <a className="elements-block__link" href={movie.trailerLink} target="_blank" rel="noreferrer noopener">
        <img className="elements-block__image" src={image} alt={movie.nameRU} />
      </a>
      <div className="elements-block__description">
        <h2 className="elements-block__name">{movie.nameRU}</h2>
        <button className="elements-block__like-button" type="button" aria-label="Лайк" onClick={onLikeClicked}>
          <div className={`elements-block__like-icon ${(isLiked && typeOfMovie === 'movie') ? "active" : ""} ${(typeOfMovie === 'savedMovie') ? "cross" : ""}`}></div>
        </button>
      </div>
      <hr className="elements-block__underline" />
      <span className="elements-block__film-duration">{convertDurationToHourlyFormat(movie)}</span>
    </article>
  )
}