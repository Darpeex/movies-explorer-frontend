// Чекбокс для поиска короткометражек
import React from 'react';
import './FilterCheckbox.css';

export function FilterChecbox() {
  return (
    <div className="checkbox">
      <label className="checkbox_switch" htmlFor="checkbox__input">
        <input id="checkbox__input" type="checkbox" />
        <div className="checkbox_slider round"></div>
      </label>
    </div>
  )
};
