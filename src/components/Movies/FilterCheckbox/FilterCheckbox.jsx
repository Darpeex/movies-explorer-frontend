// Чекбокс для поиска короткометражек
import './FilterCheckbox.css';

export function FilterCheckbox({ isChecked, handleOnChange }) {
  return (
    <div className="checkbox">
      <label className="checkbox__switch" htmlFor="checkbox__input">
        <input id="checkbox__input" type="checkbox" checked={isChecked | false} onChange={handleOnChange} />
        <span className="checkbox__slider round"></span>
      </label>
    </div>
  )
};
