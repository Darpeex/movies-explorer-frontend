// Раздел с фильмами
import './Movies.css';
import React, { useState } from 'react';
import { SearchForm } from './SearchForm/SearchForm';
import { MoviesCardList } from './MoviesCardList/MoviesCardList';

export function Movies({ loadMovies, movies }) {  // Передаются функции из App.js
  const [moreMovies, setMoreMovies] = useState(true);
  const [movieFound, setMovieFound] = useState(true);

  return (
    <main className="content">
      <SearchForm loadMovies={loadMovies} movies={movies} />
      <MoviesCardList />
      {moreMovies && <button className="content__button-more" type="button">Ещё</button>}
      {!moreMovies && <div className={`content__additional-block ${!movieFound ? "content__additional-block_margin_zero" : ""}`}>
        {!movieFound && <p className="content__additional-block_result_empty">Фильм не найден</p>}
      </div>}
    </main>
  )
};
