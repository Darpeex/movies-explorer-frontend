// Чекбокс для поиска короткометражек
import React from 'react';
import './FilterCheckbox.css';

export function FilterChecbox() {
  return (
    <div className="checkbox checkbox_switch">
      <label className="checkbox_switch" htmlFor="checkbox__input">
        <input id="checkbox__input" type="checkbox" />
        <span className="checkbox_slider round"></span>
      </label>
    </div>
  )
};
