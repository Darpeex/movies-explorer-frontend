// Чекбокс для поиска короткометражек
import './FilterCheckbox.css';
import React, { useState, useEffect } from 'react';

export function FilterCheckbox({ initialMovies, setFilteredMovies }) {
  const [isChecked, setIsChecked] = useState(false); // нажат чексбокс или нет

  const handleOnChange = (e) => { // при нажатии 
    setIsChecked(e.target.checked); // меняем значение чекбокса на противоположное
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
