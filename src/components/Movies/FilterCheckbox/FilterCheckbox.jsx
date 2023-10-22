// Чекбокс для поиска короткометражек
import React from 'react';
import './FilterCheckbox.css';

export function FilterChecbox() {
  return (
    <div className="checkbox">
      <label className="checkbox__switch" htmlFor="checkbox__input">
        <input id="checkbox__input" type="checkbox" />
        <span className="checkbox__slider round"></span>
      </label>
    </div>
  )
};
