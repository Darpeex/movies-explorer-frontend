// Раздел с фильмами
import './Movies.css';
import React, { useState, useEffect } from 'react';
import { SearchForm } from './SearchForm/SearchForm';
import { MoviesCardList } from './MoviesCardList/MoviesCardList';

export function Movies({ loadMovies, loadingError }) {
  const [moreMovies, setMoreMovies] = useState(false); // состояние кнопки 'Ещё'
  const [movieFound, setMovieFound] = useState(true); // найдены ли фильмы по запросу?
  const [initialMovies, setInitialMovies] = useState([]); // все найденые фильмы по запросу
  const [filteredMovies, setFilteredMovies] = useState([]); // отфильтрованное чекбоксом
  const [moviesToShow, setMoviesToShow] = useState([]); // фильмы, которые должны отрисоваться
  const [onSubmit, setOnSubmit] = useState(false); // отслеживаем вызов submit поиска

  useEffect(() => { // устанавливаем фильмы найденные и отфильтрованные (filteredMovies) или найденные (initialMovies)
    if (filteredMovies.length > 0) {
      setMoviesToShow(filteredMovies);
    } else {
      setMoviesToShow(initialMovies);
    }
  }, [initialMovies, filteredMovies]);

  const useMediaQuery = (query) => { // query - медиа-запрос, который совместим с CSS медиа-запросом
    const [matches, setMatches] = useState(() => window.matchMedia(query).matches); // инициализируется возвращенным значением `window.matchMedia(query).matches` - matches будет true, если ширина экрана = переданному медиа-запросу (query)
    useEffect(() => { // при каждом вызове этого эффектa...
      const media = window.matchMedia(query); // ...создается новый объект являющийся переданным медиа-запросом
      const listener = (event) => { // listener вызывается, когда изменяется медиа-запрос
        setMatches(event.matches); // и обновляет состояние matches
      };

      media.addEventListener('change', listener); // Добавляем обработчик событий, который вызывает listener при каждом изменении состояния медиа-запроса
      return () => media.removeEventListener('change', listener); // удаляем слушателя при размонтировании компонента, чтобы избежать утечек памяти
    }, [query]); // useEffect вызывается, только когда query - состояние медиа-запроса изменияется
    return matches; // возвращается состояние, по которому и определяется соответствие текущего состояние устройства указанному медиа-запросу
  };

  const isLaptop = useMediaQuery('(max-width: 1024px)');
  const isTablet = useMediaQuery('(max-width: 768px)');
  const isMobile = useMediaQuery('(max-width: 550px)');

  const calculateCardsPerRow = () => { // число карточек в ряду
    if (isMobile) {
      return 1;
    } else if (isTablet) {
      return 2;
    } else if (isLaptop) {
      return 3;
    } else {
      return 4;
    }
  };
  const [moviesPerRow, setMoviesPerRow] = useState(calculateCardsPerRow());

  const calculateRows = () => { // сколько рядов показывать
    if (isMobile) {
      return 5;
    } else {
      return 4;
    }
  }
  const [rowsToShow, setRowsToShow] = useState(calculateRows()); // количество строк, которые должны отображаться

  useEffect(() => {
    setMoviesPerRow(calculateCardsPerRow());
    setRowsToShow(calculateRows());
  }, [isLaptop, isTablet, isMobile, onSubmit]); // при отправке нового запроса - onSubmit, тоже обновляем

  useEffect(() => {
    const totalCardsToShow = rowsToShow * moviesPerRow;
    // создаем новый массив (slice) взяв из отфильтрованных фильмов от 0 до totalCardsToShow
    const moviesToDisplay = (filteredMovies.length > 0 ? filteredMovies : initialMovies).slice(0, totalCardsToShow);
    setMoviesToShow(moviesToDisplay);

    if (totalCardsToShow >= (filteredMovies.length > 0 ? filteredMovies.length : initialMovies.length)) {
      setMoreMovies(false);
    } else {
      setMoreMovies(true);
    }
  }, [rowsToShow, initialMovies, filteredMovies, moviesPerRow]);

  const handleMoreMoviesClick = () => { // увеличиваем значение rowsToShow на 1
    setRowsToShow((prevRows) => {
      const newRowsNumber = prevRows + 1;
      if (newRowsNumber !== null && newRowsNumber !== undefined) {
        localStorage.setItem('rowsToShow', JSON.stringify(newRowsNumber)); // сохраняем количество показанных рядов в localStorage
      }
      return newRowsNumber;
    });
  };

  useEffect(() => { // извлекаем количество показанных рядов из localStorage 
    const localRowsToShow = JSON.parse(localStorage.getItem('rowsToShow'));
    if (localRowsToShow !== null && localRowsToShow !== undefined) {
      setRowsToShow(localRowsToShow)
    }
  }, []);

  const errorConditions = loadingError || (loadingError !== null) || !movieFound; // условия, при которых не показываются другие блоки
  const additionalBlockConditions = movieFound && !moreMovies // обязательные условия, при которых показываться доп. блок

  const errorСonditionsMovies = movieFound && !errorConditions && (moviesToShow.length !== 0); // условия, при которых показывается блок с фильмами
  const errorСonditionsButtonMore = movieFound && moreMovies && !errorConditions; // условия, при которых показывается кнопка "Ещё"
  const errorСonditionsAdittionalBlock = !movieFound || (!errorConditions && additionalBlockConditions); // условия, при которых показывается дополнительный блок

  return (
    <main className="content">
      <SearchForm loadMovies={loadMovies} initialMovies={initialMovies} setInitialMovies={setInitialMovies} setFilteredMovies={setFilteredMovies} setMovieFound={setMovieFound} onSubmit={onSubmit} setOnSubmit={setOnSubmit} />
      {errorСonditionsMovies && <MoviesCardList moviesToShow={moviesToShow} />}
      {errorСonditionsButtonMore && <button className="content__button-more" type="button" onClick={handleMoreMoviesClick}>Ещё</button>}
      {errorСonditionsAdittionalBlock && <div className="content__additional-block">
        {!movieFound && <p className="content__additional-block_result_empty">Ничего не найдено</p>}
      </div>}
      {loadingError && <div className="content__error-additional-block">
        <p className="content__error-additional-block_result_error">{loadingError}</p>
      </div>}
    </main>
  )
};
