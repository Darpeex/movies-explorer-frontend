// Раздел с сохраненными фильмами
import './SavedMovies.css';
import React, { useState } from 'react';
import { SearchForm } from '../Movies/SearchForm/SearchForm';
import { SavedMoviesCardList } from '../SavedMovies/SavedMoviesCardList/SavedMoviesCardList';
import { SavedMoviesContext } from '../../context/SavedMoviesContext';

export function SavedMovies({ loadingError, handleDeleteClick }) {
  const savedMovies = React.useContext(SavedMoviesContext);
  const [movieFound, setMovieFound] = useState(true); // найдены ли фильмы по запросу?
  const [initialMovies, setInitialMovies] = useState(savedMovies); // все найденые фильмы по запросу
  const [filteredMovies, setFilteredMovies] = useState([]); // отфильтрованное чекбоксом
  const [moviesToShow, setMoviesToShow] = useState([]); // фильмы, которые должны отрисоваться
  const [onSubmit, setOnSubmit] = useState(false); // отслеживаем вызов submit поиска
  const [isChecked, setIsChecked] = useState(false); // нажат чексбокс или нет

  const errorConditions = loadingError || (loadingError !== null) || !movieFound; // условия, при которых не показываются другие блоки
  const errorСonditionsMovies = movieFound && !errorConditions && (savedMovies.length !== 0); // условия, при которых показывается блок с фильмами
  const errorСonditionsAdittionalBlock = !movieFound || !errorConditions; // условия, при которых показывается дополнительный блок

  return (
    <main className="content">
      <SearchForm initialMovies={initialMovies} setInitialMovies={setInitialMovies} setFilteredMovies={setFilteredMovies} setMovieFound={setMovieFound} setIsChecked={setIsChecked} />
      {errorСonditionsMovies && <SavedMoviesCardList savedMovies={savedMovies} handleDeleteClick={handleDeleteClick} />}
      {errorСonditionsAdittionalBlock && <div className="content__additional-block">
        {!movieFound && <p className="content__additional-block_result_empty">Ничего не найдено</p>}
      </div>}
      {loadingError && <div className="content__error-additional-block">
        <p className="content__error-additional-block_result_error">{loadingError}</p>
      </div>}
    </main>
  )
};
