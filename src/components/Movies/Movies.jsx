// Раздел с фильмами
import './Movies.css';
import { useState, useEffect, useContext } from 'react';
import { SearchForm } from './SearchForm/SearchForm';
import { MoviesContext } from '../../context/MoviesContext';
import { MoviesCardList } from './MoviesCardList/MoviesCardList';
import { MOBILE, TABLET, LAPTOP, SHORT_MOVIES, CARDS_PER_ROW, ROWS_TO_SHOW } from '../../constants/constants';

export function Movies({ loadMovies, loadingError, handleLikeClick }) {
  const [moreMovies, setMoreMovies] = useState(false); // состояние кнопки 'Ещё'
  const [movieFound, setMovieFound] = useState(true); // найдены ли фильмы по запросу?
  const [initialMovies, setInitialMovies] = useState([]); // все найденые фильмы по запросу
  const [filteredMovies, setFilteredMovies] = useState([]); // отфильтрованное чекбоксом
  const [moviesToShow, setMoviesToShow] = useState([]); // фильмы, которые должны отрисоваться
  const [onSubmit, setOnSubmit] = useState(false); // отслеживаем вызов submit поиска
  const [isChecked, setIsChecked] = useState(false); // нажат чексбокс или нет

  const [isInputFocused, setInputFocus] = useState(false); // для подчеркивания input при фокусе
  const [isEmpty, setIsEmpty] = useState(false); // состояние введенной информации
  const [value, setValue] = useState(""); // состояние введенной информации
  const movies = useContext(MoviesContext);

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

  const isLaptop = useMediaQuery(LAPTOP);
  const isTablet = useMediaQuery(TABLET);
  const isMobile = useMediaQuery(MOBILE);

  const calculateCardsPerRow = () => { // число карточек в ряду
    if (isMobile) {
      return CARDS_PER_ROW.mobile;
    } else if (isTablet) {
      return CARDS_PER_ROW.tablet;
    } else if (isLaptop) {
      return CARDS_PER_ROW.laptop;
    } else {
      return CARDS_PER_ROW.desktop;
    }
  };
  const [moviesPerRow, setMoviesPerRow] = useState(calculateCardsPerRow());

  const calculateRows = () => { // сколько рядов показывать
    if (isMobile) {
      return ROWS_TO_SHOW.mobile;
    } else {
      return ROWS_TO_SHOW.others;
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
    const moviesToDisplay = (isChecked ? filteredMovies : initialMovies).slice(0, totalCardsToShow);
    setMoviesToShow(moviesToDisplay);

    if (totalCardsToShow >= (isChecked ? filteredMovies.length : initialMovies.length)) {
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

  useEffect(() => { // извлекаем последний текст запроса из localStorage 
    const localValue = JSON.parse(localStorage.getItem('value'));
    if (localValue !== null && localValue !== undefined) {
      setValue(localValue)
    }
  }, []);

  useEffect(() => { // извлекаем последний список фильмов из localStorage
    const localMovies = JSON.parse(localStorage.getItem('movies'));
    if (localMovies !== null && localMovies !== undefined) {
      setInitialMovies(localMovies)
    }
  }, []);

  useEffect(() => { // нужно проверить поле после вывода ошибки
    if (value !== "") { // чтобы после ввода текста сообщение убиралось*
      setIsEmpty(false)
    }
  }, [value]);

  function handleValueChange(e) { // по событию на элементе устанавливаем значение value
    setValue(e.target.value); // чтобы взять значение из поля value*
  }

  const filmsProcessing = (data) => {
    setOnSubmit(!onSubmit) // меняем состояние, при нажатии на кнопку
    const foundMovies = searchMovies(data); // функция обратного вызова, которая будет вызвана после успешной загрузки фильмов
    setInitialMovies(foundMovies); // устанавливаем найденные фильмы в стейт
    setMovieFound(foundMovies.length > 0); // изменение состояния movieFound (найден ли фильм)
    if (foundMovies !== null && foundMovies !== undefined) {
      localStorage.setItem('movies', JSON.stringify(foundMovies)); // сохраняем список фильмов в localStorage
    }
  }

  function handleSubmitForm(e) { // проверяем пустое ли поле по клику
    e.preventDefault();
    if (value === "") {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
      if (value !== null && value !== undefined) {
        localStorage.setItem('value', JSON.stringify(value)); // сохраняем текст запроса в localStorage
      }
      if (movies.length === 0) { // проверяем, ести ли фильмы в массиве
        loadMovies((moviesInfo) => {
          filmsProcessing(moviesInfo)
        });
      } else {
        filmsProcessing(movies)
      }
    }
  }

  const searchMovies = (movies) => { // функция поиска фильмов по введенному запросу
    const foundMovies = movies.filter(movie => { // фильтруем фильмы по названию
      const title = movie.nameRU || movie.nameEN;
      return title.toLowerCase().includes(value.toLowerCase())
    });
    return foundMovies;
  }

  // из chekbox'a
  useEffect(() => { // извлекаем последнее состояние чекбокса из localStorage 
    const localIsChecked = JSON.parse(localStorage.getItem('isChecked'));
    if (localIsChecked !== null) {
      setIsChecked(localIsChecked)
    }
  }, []);

  const handleOnChange = (e) => { // при нажатии
    const checkboxEvent = e.target.checked // нужен, потому что иначе событие не успевает записаться, а так записывается одно и то же
    setIsChecked(checkboxEvent); // меняем значение чекбокса на противоположное
    if (checkboxEvent !== null && checkboxEvent !== undefined) {
      localStorage.setItem('isChecked', JSON.stringify(checkboxEvent)); // сохраняем состояние чекбокса в localStorage
    }
  }

  useEffect(() => {
    if (isChecked) {
      const shortMovies = initialMovies.filter(SHORT_MOVIES); // короткометражки - менее 40мин включительно
      setFilteredMovies(shortMovies); // отсортированные фильмы
    } else {
      return setFilteredMovies(initialMovies); // фильмы, полученные при поиске
    }
  }, [isChecked, initialMovies]); // запутанно, но только сейчас заработало

  const errorConditions = loadingError || (loadingError !== null) || !movieFound; // условия, при которых не показываются другие блоки
  const additionalBlockConditions = movieFound && !moreMovies // обязательные условия, при которых показываться доп. блок

  const errorСonditionsMovies = movieFound && !errorConditions && (moviesToShow.length !== 0); // условия, при которых показывается блок с фильмами
  const errorСonditionsButtonMore = movieFound && moreMovies && !errorConditions; // условия, при которых показывается кнопка "Ещё"
  const errorСonditionsAdittionalBlock = !movieFound || (!errorConditions && additionalBlockConditions); // условия, при которых показывается дополнительный блок

  return (
    <main className="content">
      <SearchForm handleSubmitForm={handleSubmitForm} value={value} setInputFocus={setInputFocus} handleValueChange={handleValueChange} isInputFocused={isInputFocused} isEmpty={isEmpty} isChecked={isChecked} handleOnChange={handleOnChange} />
      {errorСonditionsMovies && <MoviesCardList moviesToShow={moviesToShow} handleLikeClick={handleLikeClick} />}
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
