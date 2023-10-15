// Форма поиска фильмов
import React from 'react';
import './SearchForm.css';
import { FilterChecbox } from '../FilterCheckbox/FilterCheckbox';

export function SearchForm() {
  return (
    <section className="search-form search-form_position section">
      <div className="search-form__container">
        <input className="search-form__input" placeholder="Фильм"></input>
        <button className="search-form__button">Найти</button>
      </div>
      <hr className="serch-form__underline" />
      <div className="search-form__wrapper">
        <FilterChecbox />
        <span className="serch-form__short-film">Короткометражки</span>
      </div>
    </section>
  )
};
