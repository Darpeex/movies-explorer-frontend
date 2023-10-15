// Компонент MoviesCard
import React from "react";
import './MoviesCard.css';
import { useState } from 'react'; // Хуки реакт

export function MoviesCard({ card, onCardClick, onCardLike, onCardDelete }) {
  function handleClick() { // открытие карточки при нажатии на картиннку
    onCardClick(card);
  }
  function handleLikeClick() { // отвечает за лайк
    onCardLike(card);
  }

  // Для демонстрации верстки, извините за мусор
  const [isLiked, setIsLiked] = useState(false);
  function toggleLike() {
    setIsLiked(!isLiked);
  }

  // Для проверки - другой формат изображения
  const testFunction = () => {
    return (
      <article className="elements-block">
        <img src="https://pic.rutubelist.ru/video/4e/27/4e27718c4f28312371a0a6f1d1cffde8.jpg" alt="Асока" className="elements-block__image" />  {/* В реализации подставим 'image.url'(постер) из запроса к фильму */}
        <div className="elements-block__description">
          <h2 className="elements-block__name">Асока</h2> {/* В реализации подставим 'nameRU'(название) из запроса к фильму */}
          <button className={`elements-block__like-button ${ isLiked ? "elements-block__like-button_active" : ""}`} type="button" aria-label="Лайк" onClick={toggleLike}></button>
        </div>
        <hr className="elements-block__underline" />
        <span className="elements-block__film-duration">1ч 42м</span> {/* В реализации подставим 'duration'(время) из запроса к фильму */}
      </article>
    )
  }

  // Шаблон карточки фильма
  const moviesArticleForTest = (
    <article className="elements-block">
      <img src="https://papik.pro/uploads/posts/2021-10/1634606302_2-papik-pro-p-valli-poster-2.jpg" alt="ВАЛЛ'И" className="elements-block__image" />  {/* В реализации подставим 'image.url'(постер) из запроса к фильму */}
      <div className="elements-block__description">
        <h2 className="elements-block__name">ВАЛЛ'И</h2> {/* В реализации подставим 'nameRU'(название) из запроса к фильму */}
        <button className={`elements-block__like-button ${ isLiked ? "elements-block__like-button_active" : ""}`} type="button" aria-label="Лайк" onClick={toggleLike}></button>
      </div>
      <hr className="elements-block__underline" />
      <span className="elements-block__film-duration">1ч 22м</span> {/* В реализации подставим 'duration'(время) из запроса к фильму */}
    </article>
  )

  // Генерация шаблона 9 раз
  const oneMoreTestFunction = () => {
    return Array.from({ length: 9 }, (_, i) =>
      <div key={i}>
        {moviesArticleForTest}
      </div>
    )
  }

  return (
    <React.Fragment>
      {testFunction()}
      {oneMoreTestFunction()}
    </React.Fragment>
  )
}

// Для 4-го этапа
// import { CurrentUserContext } from '../../../context/CurrentUserContext';

// const currentUser = React.useContext(CurrentUserContext); // Подписываемся на контекст пользователя
// const isLiked = card.likes.some(likerId => likerId === currentUser._id); // Определяем, поставлен ли лайк текущим пользователем

// return (
//   // Секция, блок elements
//   <article className="elements-block">
//     <img src={card.link} alt={card.name} onClick={() => handleClick(card)} className="elements-block__image" /> {/* В реализации подставим 'image.url'(постер) из запроса к фильму */}
//     <div className="elements-block__description">
//       <h2 className="elements-block__name">Название фильма</h2> {/* В реализации подставим 'nameRU'(название) из запроса к фильму */}
//       <button className={`elements-block__like-button ${isLiked && 'elements-block__like-button_active'}`} type="button" aria-label="Лайк" onClick={handleLikeClick}></button>
//     </div>
//     <hr className="elements-block__underline" />
//     <span className="elements-block__film-duration">1ч 42м</span> {/* В реализации подставим 'duration'(время) из запроса к фильму */}
//   </article>
// )
// }
