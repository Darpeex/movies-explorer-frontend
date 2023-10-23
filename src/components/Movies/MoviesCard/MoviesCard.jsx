// Компонент MoviesCard
import './MoviesCard.css';
import React from "react";
import { useState } from 'react'; // Хуки реакт
import activelikeIcon from '../../../images/like.svg';
import likeIcon from '../../../images/inactive-like.svg';
import { CurrentUserContext } from '../../../context/CurrentUserContext';

export function MoviesCard({ movie, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext); // Подписываемся на контекст пользователя
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
        <button className={`elements-block__like-button ${isLiked && 'elements-block__like-button_active'}`} type="button" aria-label="Лайк" onClick={handleLikeClick}></button>
      </div>
      <hr className="elements-block__underline" />
      <span className="elements-block__film-duration">{convertDurationToHourlyFormat()}</span>
    </article>
  )
}

  // Для проверки - другой формат изображения
  // const testFunction = () => {
  //   return (
  //     <article className="elements-block">
  //       <img src="https://pic.rutubelist.ru/video/4e/27/4e27718c4f28312371a0a6f1d1cffde8.jpg" alt="Асока" className="elements-block__image" />  {/* В реализации подставим 'image.url'(постер) из запроса к фильму */}
  //       <div className="elements-block__description">
  //         <h2 className="elements-block__name">Асока</h2> {/* В реализации подставим 'nameRU'(название) из запроса к фильму */}
  //         <button className="elements-block__like-button" type="button" aria-label="Лайк" onClick={toggleLike}>
  //           <img src={isLiked ? activelikeIcon : likeIcon} alt="Иконка лайка" />
  //         </button>
  //       </div>
  //       <hr className="elements-block__underline" />
  //       <span className="elements-block__film-duration">1ч 42м</span> {/* В реализации подставим 'duration'(время) из запроса к фильму */}
  //     </article>
  //   )
  // }

  // Шаблон карточки фильма
  // const moviesArticleForTest = (
  //   <article className="elements-block">
  //     <img src="https://papik.pro/uploads/posts/2021-10/1634606302_2-papik-pro-p-valli-poster-2.jpg" alt="ВАЛЛ'И" className="elements-block__image" />  {/* В реализации подставим 'image.url'(постер) из запроса к фильму */}
  //     <div className="elements-block__description">
  //       <h2 className="elements-block__name">ВАЛЛ'И</h2> {/* В реализации подставим 'nameRU'(название) из запроса к фильму */}
  //       <button className="elements-block__like-button" type="button" aria-label="Лайк" onClick={toggleLike}>
  //           <img src={isLiked ? activelikeIcon : likeIcon} alt="Иконка лайка" />
  //       </button>
  //     </div>
  //     <hr className="elements-block__underline" />
  //     <span className="elements-block__film-duration">1ч 22м</span> {/* В реализации подставим 'duration'(время) из запроса к фильму */}
  //   </article>
  // )

  // Генерация шаблона 15 раз
  // const oneMoreTestFunction = () => {
  //   return Array.from({ length: 15 }, (_, i) =>
  //     <React.Fragment key={i}>
  //       {moviesArticleForTest}
  //     </React.Fragment>
  //   )
  // }

  // return (
  //   <React.Fragment>
  //     {/* {testFunction()} */}
  //     {/* {oneMoreTestFunction()} */}
  //   </React.Fragment>
  // )
// }