// Основное содержимое страницы
import React from 'react';
import { Movie } from '../Movies/Movies';
import { MoviesContext } from '../../context/MoviesContext';
import { CurrentUserContext } from '../../context/CurrentUserContext';

export function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete }) {  // Передаются функции открытия попапов из App.js
  const currentUser = React.useContext(CurrentUserContext); // Подписываемся на контекст пользователя, далее в html передаём данные в соответствующие поля
  const movies = React.useContext(MoviesContext); // Подписываемся на контекст фильмов, затем передаём массив карточек и обрабатываем их
  return (
    <main className="content">

      {/* Секция, блок profile */}
      <section className="profile page__profile-position section">
        <div className="profile__info">
          <div className="profile__avatar">
            <img className="profile__avatar-image" src={currentUser.avatar} alt="Аватарка" />
            <button className="profile__avatar-button" type="button" onClick={onEditAvatar} aria-label="Обновить аватарку"></button>
          </div>
          <div className="profile__content">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__activity">{currentUser.about}</p>
            <button className="profile__button profile__button_action_edit" type="button" onClick={onEditProfile} aria-label="Редактировать"></button>
          </div>
        </div>
        <button className="profile__button profile__button_action_add" type="button" onClick={onAddPlace} aria-label="Добавить"></button>
      </section>

      {/* Отрисовываем каждую карточку при помощи компонента Card и возвращаем в разметку внутрь section */}
      <section id="elements" className="elements page__elements-position section">
        {movies.map(card => (// Пробегаем по переданному массиву и возвращаем целые карточки при помощи разметки
          <Movie key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />))}
      </section>
    </main>
  )
}