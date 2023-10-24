// Раздел с сохраненными фильмами
import './SavedMovies.css';
import React, { useState } from 'react';
import { SearchForm } from '../Movies/SearchForm/SearchForm';
import { MoviesCardList } from '../Movies/MoviesCardList/MoviesCardList';

export function SavedMovies({ loadingFilms }) {  // Передаются функции из App.js
  const [moreMovies, setMoreMovies] = useState(false);
  const [movieFound, setMovieFound] = useState(false);

  return (
    <main className="content">
      <SearchForm loadingFilms={loadingFilms} />
      {/* <MoviesCardList />  Отрисовывать только карточки, на которых стоит лайк */}
      {moreMovies && <button className="content__button-more" type="button">Ещё</button>} {/* Показывать, если ещё остались фильмы, иначе не отрисовывать элемент */}
      {!moreMovies && <div className={`content__block-additional ${!movieFound ? "content__block-additional_margin_zero" : ""}`}>
        {!movieFound && <p className="content__additional-block-result content__additional-block-result_empty">Фильм не найден</p>} {/* Если фильм не найден - покажется содержимое этого блока */}
      </div>}
    </main>
  )
};
