// Компонент MoviesCard
import './MoviesCard.css';
import React, { useState, useContext } from "react";
import activeLike from '../../../images/active-like.svg';
import inactiveLike from '../../../images/inactive-like.svg';
import { CurrentUserContext } from '../../../context/CurrentUserContext';

export function MoviesCard({ movie, onCardLike }) {
  const currentUser = useContext(CurrentUserContext); // Подписываемся на контекст пользователя
  // const isLiked = movie.likes.some(likerId => likerId === currentUser._id); // Определяем, поставлен ли лайк текущим пользователем
  function handleLikeClick() { // отвечает за лайк
    onCardLike(movie);
  }
  // Для демонстрации верстки, извините за мусор
  const [isLiked, setIsLiked] = useState(false);
  function toggleLike() {
    setIsLiked(!isLiked);
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
        <img className="elements-block__image" src={`https://api.nomoreparties.co${movie.image.url}`} alt={movie.nameRU} />
      </a>
      <div className="elements-block__description">
        <h2 className="elements-block__name">{movie.nameRU}</h2>
        <button className="elements-block__like-button" type="button" aria-label="Лайк" onClick={toggleLike}>
          <img className="elements-block__like-icon" src={isLiked ? activeLike : inactiveLike} alt={isLiked ? 'активный лайк' : 'неактивный лайк'}></img>
        </button>
      </div>
      <hr className="elements-block__underline" />
      <span className="elements-block__film-duration">{convertDurationToHourlyFormat()}</span>
    </article>
  )
}