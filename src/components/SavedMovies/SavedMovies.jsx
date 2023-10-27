// Раздел с сохраненными фильмами
import './SavedMovies.css';
import React, { useState } from 'react';
import { SearchForm } from '../Movies/SearchForm/SearchForm';

export function SavedMovies() {  // Передаются функции из App.js
  const [moreMovies, setMoreMovies] = useState(false);
  const [movieFound, setMovieFound] = useState(true);
  const [initialMovies, setInitialMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  return (
    <main className="content">
      <SearchForm initialMovies={initialMovies} setInitialMovies={setInitialMovies} setFilteredMovies={setFilteredMovies} setMovieFound={setMovieFound} />
      {/* {movieFound && <MoviesCardList />}  Отрисовывать только карточки, на которых стоит лайк */}
      {!moreMovies && <div className={`content__block-additional ${!movieFound ? "content__block-additional_margin_zero" : ""}`}>
        {!movieFound && <p className="content__additional-block-result content__additional-block-result_empty">Ничего не найдено</p>} {/* Если фильм не найден - покажется содержимое этого блока */}
      </div>}
    </main>
  )
};
