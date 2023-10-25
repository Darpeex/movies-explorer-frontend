// Форма поиска фильмов
import './SearchForm.css';
import React, { useEffect, useState, useContext } from 'react';
import { MoviesContext } from '../../../context/MoviesContext';
import { FilterChecbox } from '../FilterCheckbox/FilterCheckbox';

export function SearchForm({ loadMovies, setSearchResults }) {
  const [isInputFocused, setInputFocus] = useState(false); // для подчеркивания input при фокусе
  const [isEmpty, setIsEmpty] = useState(false); // состояние введенной информации
  const [value, setValue] = useState(""); // состояние введенной информации
  const movies = useContext(MoviesContext);

  const searchMovies = () => {
    const foundMovies = movies.filter(movie => { // фильтруем фильмы по названию
      const title = movie.nameRU || movie.nameEN;
      return title.toLowerCase().includes(value.toLowerCase())
    });
    return foundMovies;
  }

  useEffect(() => { // нужно проверить поле после вывода ошибки
    if (value !== "") { // чтобы после ввода текста сообщение убиралось*
      setIsEmpty(false)
    }
  }, [value]);

  function handleValueChange(e) { // по событию на элементе устанавливаем значение value
    setValue(e.target.value); // чтобы взять значение из поля value*
  }

  function checkInputField(e) { // проверяем пустое ли поле по клику
    e.preventDefault();
    if (value === "") {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
      if (movies.length === 0) { // проверяем, ести ли фильмы в массиве
        loadMovies(); // загружаем фильмы с сервера
      }
      setSearchResults(searchMovies());
    }
  }

  return (
    <section className="search-form search-form_position section">
      <form className="search-form__container" onSubmit={checkInputField}>
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
        <FilterChecbox setSearchResults={setSearchResults} />
        <span className="search-form__short-film">Короткометражки</span>
      </div>
    </section>
  )
};