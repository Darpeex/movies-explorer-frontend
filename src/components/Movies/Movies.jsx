// Раздел с фильмами
import './Movies.css';
import React, { useState, useEffect, useContext } from 'react';
import { SearchForm } from './SearchForm/SearchForm';
import { MoviesContext } from '../../context/MoviesContext';
import { MoviesCardList } from './MoviesCardList/MoviesCardList';

export function Movies({ loadMovies }) {  // Передаются функции из App.js
  const [moreMovies, setMoreMovies] = useState(false);
  const [movieFound, setMovieFound] = useState(true);
  const [initialMovies, setInitialMovies] = useState([]);
  const { movies, setMovies } = useContext(MoviesContext); // исходный список найденых по запросу

  console.log(initialMovies)
  // сохраняем исходный список фильмов при получении movies
  // useEffect(() => {
  //   setInitialMovies(movies);
  // }, [movies]);

  return (
    <main className="content">
      <SearchForm loadMovies={loadMovies} initialMovies={initialMovies} setInitialMovies={setInitialMovies} />
      <MoviesCardList initialMovies={initialMovies} />
      {moreMovies && <button className="content__button-more" type="button">Ещё</button>}
      {!moreMovies && <div className={`content__additional-block ${!movieFound ? "content__additional-block_margin_zero" : ""}`}>
        {!movieFound && <p className="content__additional-block_result_empty">Ничего не найдено</p>}
      </div>}
    </main>
  )
};
