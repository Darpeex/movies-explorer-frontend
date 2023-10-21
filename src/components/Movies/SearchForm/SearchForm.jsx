// Форма поиска фильмов
import React from 'react';
import './SearchForm.css';
import { FilterChecbox } from '../FilterCheckbox/FilterCheckbox';

export function SearchForm() {
  const [isInputFocused, setInputFocus] = React.useState(false);

  return (
    <section className="search-form search-form_position section">
      <div className="search-form__container">
        <input
          className="search-form__input"
          placeholder="Фильм"
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
        />
        <button className="search-form__button" type="button">Найти</button>
      </div>
      <div className={`search-form__underline ${isInputFocused ? "search-form__underline-focused" : ""}`}></div>
      <div className="search-form__wrapper">
        <FilterChecbox />
        <span className="search-form__short-film">Короткометражки</span>
      </div>
    </section>
  )
};
