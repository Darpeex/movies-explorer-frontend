// Раздел с сохраненными фильмами
import './SavedMovies.css';
import React, { useState } from 'react';
import { SearchForm } from '../Movies/SearchForm/SearchForm';
import { MoviesCardList } from '../Movies/MoviesCardList/MoviesCardList';

export function SavedMovies() {  // Передаются функции из App.js
  const [moreMovies, setMoreMovies] = useState(false);
  const [movieFound, setMovieFound] = useState(false);

  return (
    <main className="content">
      <SearchForm />
      {/* <MoviesCardList />  Отрисовывать только карточки, на которых стоит лайк */}
      {moreMovies && <button className="content__button_more" type="button">Ещё</button>} {/* Показывать, если ещё остались фильмы, иначе не отрисовывать элемент */}
      {!moreMovies && <div className={`content__additional-block ${!movieFound ? "content__additional-block_margin_zero" : ""}`}>
        {!movieFound && <p className="content__additional-block_result_empty">Фильм не найден</p>} {/* Если фильм не найден - покажется содержимое этого блока */}
      </div>}
    </main>
  )
};
