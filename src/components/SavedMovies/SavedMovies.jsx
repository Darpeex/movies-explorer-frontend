// Раздел с сохраненными фильмами
import './SavedMovies.css';
import React from 'react';
import { SearchForm } from '../Movies/SearchForm/SearchForm';
import { MoviesCardList } from '../Movies/MoviesCardList/MoviesCardList';

export function SavedMovies() {  // Передаются функции из App.js
  return (
    <main className="content">
      <SearchForm />
      <MoviesCardList /> {/* Отрисовывать только карточки, на которых стоит лайк */}
      <button className="content__button_more">Ещё</button> {/* Показывать, если ещё остались фильмы, иначе не отрисовывать элемент */}
    </main>
  )
};
