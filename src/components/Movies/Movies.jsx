// Раздел с фильмами
import './Movies.css';
import React, { useState } from 'react';
import { SearchForm } from './SearchForm/SearchForm';
import { MoviesCardList } from './MoviesCardList/MoviesCardList';

export function Movies({ loadMovies }) {  // Передаются функции из App.js
  const [moreMovies, setMoreMovies] = useState(false);
  const [movieFound, setMovieFound] = useState(true);
  const [initialMovies, setInitialMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  return (
    <main className="content">
      <SearchForm loadMovies={loadMovies} initialMovies={initialMovies} setInitialMovies={setInitialMovies} setFilteredMovies={setFilteredMovies} setMovieFound={setMovieFound} />
      <MoviesCardList initialMovies={initialMovies} filteredMovies={filteredMovies} />
      {moreMovies && <button className="content__button-more" type="button">Ещё</button>}
      {!moreMovies && <div className={`content__additional-block ${!movieFound ? "content__additional-block_margin_zero" : ""}`}>
        {!movieFound && <p className="content__additional-block_result_empty">Ничего не найдено</p>}
      </div>}
    </main>
  )
};
