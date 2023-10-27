// Форма поиска фильмов
import './SearchForm.css';
import React, { useEffect, useState, useContext } from 'react';
import { MoviesContext } from '../../../context/MoviesContext';
import { FilterCheckbox } from '../FilterCheckbox/FilterCheckbox';

export function SearchForm({ loadMovies, initialMovies, setInitialMovies, setFilteredMovies, setMovieFound }) {
  const [isInputFocused, setInputFocus] = useState(false); // для подчеркивания input при фокусе
  const [isEmpty, setIsEmpty] = useState(false); // состояние введенной информации
  const [value, setValue] = useState(""); // состояние введенной информации
  const movies = useContext(MoviesContext);

  useEffect(() => { // нужно проверить поле после вывода ошибки
    if (value !== "") { // чтобы после ввода текста сообщение убиралось*
      setIsEmpty(false)
    }
  }, [value]);

  function handleValueChange(e) { // по событию на элементе устанавливаем значение value
    setValue(e.target.value); // чтобы взять значение из поля value*
  }

  function handleSubmitForm(e) { // проверяем пустое ли поле по клику
    e.preventDefault();
    if (value === "") {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
      if (movies.length === 0) { // проверяем, ести ли фильмы в массиве
        loadMovies((moviesInfo) => {
          const foundMovies = searchMovies(moviesInfo); // функция обратного вызова, которая будет вызвана после успешной загрузки фильмов
          setInitialMovies(foundMovies);
          setMovieFound(foundMovies.length > 0); // изменение состояния movieFound
        });
      } else {
        const foundMovies = searchMovies(movies); // функция, которая будет вызвана, если фильмы есть
        setInitialMovies(foundMovies);
        setMovieFound(foundMovies.length > 0); // изменение состояния movieFound
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

  return (
    <section className="search-form search-form_position section">
      <form className="search-form__container" onSubmit={handleSubmitForm}>
        <input
          className="search-form__input"
          placeholder="Фильм"
          type="text"
          value={value}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
          onChange={handleValueChange}
        />
        <button className="search-form__button" type="submit">Найти</button>
      </form>
      <div className={`search-form__underline ${isInputFocused ? "search-form__underline_focused" : ""} ${isEmpty ? "search-form__underline_error" : ""}`}></div>
      {isEmpty && <span className="search-form__messsage search-form__messsage_error">Нужно ввести ключевое слово</span>}
      <div className="search-form__wrapper">
        <FilterCheckbox initialMovies={initialMovies} setFilteredMovies={setFilteredMovies} />
        <span className="search-form__short-film">Короткометражки</span>
      </div>
    </section>
  )
};