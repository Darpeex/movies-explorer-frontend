// Раздел с фильмами
import './Movies.css';
import React from 'react';
import { SearchForm } from './SearchForm/SearchForm';
import { MoviesCardList } from './MoviesCardList/MoviesCardList';

export function Movies() {  // Передаются функции из App.js
  return (
    <main className="content">
      <SearchForm />
      <MoviesCardList />
    </main>
  )
};
