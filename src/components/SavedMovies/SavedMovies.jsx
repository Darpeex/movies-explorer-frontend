// Раздел с сохраненными фильмами
import './SavedMovies.css';
import { useState, useContext, useEffect } from 'react';
import { SearchForm } from '../Movies/SearchForm/SearchForm';
import { SavedMoviesContext } from '../../context/SavedMoviesContext';
import { SavedMoviesCardList } from '../SavedMovies/SavedMoviesCardList/SavedMoviesCardList';

export function SavedMovies({ loadingError, handleDeleteClick }) {
  const savedMovies = useContext(SavedMoviesContext); // сохранённые фильмы +
  const [filteredMovies, setFilteredMovies] = useState([]); // отфильтрованное чекбоксом +
  const [isInputFocused, setInputFocus] = useState(false); // для подчеркивания input при фокусе +
  const [initialMovies, setInitialMovies] = useState([]); // все найденые фильмы по запросу +
  const [moviesToShow, setMoviesToShow] = useState([]); // фильмы, которые должны отрисоваться +
  const [movieFound, setMovieFound] = useState(true); // найдены ли фильмы по запросу? +
  const [isChecked, setIsChecked] = useState(false); // нажат чексбокс или нет +
  const [onSubmit, setOnSubmit] = useState(false); // отслеживаем вызов submit поиска +
  const [isEmpty, setIsEmpty] = useState(false); // состояние введенной информации +
  const [value, setValue] = useState(""); // состояние введенной информации +

  useEffect(() => { // устанавливаем фильмы найденные и отфильтрованные (filteredMovies) или найденные (initialMovies)
    if (isChecked) {
      setMoviesToShow(filteredMovies);
    } else {
      setMoviesToShow(initialMovies);
    }
  }, [initialMovies, filteredMovies]);

  const filmsProcessing = () => {
    setOnSubmit(!onSubmit) // меняем состояние, при нажатии на кнопку
    const foundMovies = searchMovies(savedMovies);
    setInitialMovies(foundMovies); // устанавливаем найденные фильмы в стейт
    setMovieFound(foundMovies.length > 0); // изменение состояния movieFound (найден ли фильм)
  }

  useEffect(() => {
    filmsProcessing();
  }, [savedMovies]);

  function handleSubmitForm(e) { // проверяем пустое ли поле по клику
    e.preventDefault();
    if (value === "") {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
      filmsProcessing(savedMovies)
    }
  }

  const searchMovies = (savedMovies) => { // функция поиска фильмов по введенному запросу
    const foundMovies = savedMovies.filter(movie => { // фильтруем фильмы по названию
      const title = movie.nameRU || movie.nameEN;
      return title.toLowerCase().includes(value.toLowerCase())
    });
    return foundMovies;
  }

  function handleValueChange(e) { // по событию на элементе устанавливаем значение value
    setValue(e.target.value); // чтобы взять значение из поля value*
  }

  useEffect(() => { // нужно проверить поле после вывода ошибки
    if (value !== "") { // чтобы после ввода текста сообщение убиралось*
      setIsEmpty(false)
    }
  }, [value]);

  const handleOnChange = (e) => { // при нажатии
    const checkboxEvent = e.target.checked // нужен, потому что иначе событие не успевает записаться, а так записывается одно и то же
    setIsChecked(checkboxEvent); // меняем значение чекбокса на противоположное
  }

  useEffect(() => {
    if (isChecked) {
      const shortMovies = initialMovies.filter(movie => movie.duration <= 40); // короткометражки - менее 40мин включительно
      setFilteredMovies(shortMovies); // отсортированные фильмы
    } else {
      return setFilteredMovies(initialMovies); // фильмы, полученные при поиске
    }
  }, [isChecked, initialMovies]);

  const errorConditions = loadingError || (loadingError !== null) || !movieFound; // условия, при которых не показываются другие блоки
  const errorСonditionsMovies = movieFound && !errorConditions && (savedMovies.length !== 0); // условия, при которых показывается блок с фильмами
  const errorСonditionsAdittionalBlock = !movieFound || !errorConditions; // условия, при которых показывается дополнительный блок

  return (
    <main className="content">
      <SearchForm handleSubmitForm={handleSubmitForm} value={value} setInputFocus={setInputFocus} handleValueChange={handleValueChange} isInputFocused={isInputFocused} isEmpty={isEmpty} isChecked={isChecked} handleOnChange={handleOnChange} />
      {errorСonditionsMovies && <SavedMoviesCardList moviesToShow={moviesToShow} handleDeleteClick={handleDeleteClick} />}
      {errorСonditionsAdittionalBlock && <div className="content__additional-block">
        {!movieFound && <p className="content__additional-block_result_empty">Ничего не найдено</p>}
      </div>}
      {loadingError && <div className="content__error-additional-block">
        <p className="content__error-additional-block_result_error">{loadingError}</p>
      </div>}
    </main>
  )
};

// Это стоило мне немало времени, сохраню на будущее) Т.к. ещё буду обращаться к этому проекту
// useEffect(() => { // функция не будет вызвана, пока данные не загрузятся из localStorage
//   const localMovies = JSON.parse(localStorage.getItem('savedMovies'));
//   // если в хранилище ещё ничего не сохранялось или из него уже что-то установилось
//   if ((localMovies === null) || (isStorageMoviesInstalled === true)) {
//     filmsProcessing();
//   }
// }, [savedMovies]);