// Чекбокс для поиска короткометражек
import './FilterCheckbox.css';
import React, { useEffect } from 'react';

export function FilterCheckbox({ initialMovies, setFilteredMovies, isChecked, setIsChecked }) {

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
      const shortMovies = initialMovies.filter(movie => movie.duration <= 40); // короткометражки - менее 40мин включительно
      setFilteredMovies(shortMovies); // отсортированные фильмы
    } else {
      return setFilteredMovies(initialMovies); // фильмы, полученные при поиске
    }
  }, [isChecked, initialMovies]); // запутанно, но только сейчас заработало

  return (
    <div className="checkbox">
      <label className="checkbox__switch" htmlFor="checkbox__input">
        <input id="checkbox__input" type="checkbox" checked={isChecked} onChange={handleOnChange} />
        <span className="checkbox__slider round"></span>
      </label>
    </div>
  )
};
