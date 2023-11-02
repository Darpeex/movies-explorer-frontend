// Форма поиска фильмов
import './SearchForm.css';
import { FilterCheckbox } from '../FilterCheckbox/FilterCheckbox';

export function SearchForm({ handleSubmitForm, value, isInputFocused, setInputFocus, handleValueChange, isEmpty, isChecked, handleOnChange }) {
  return (
    <section className="search-form search-form_position section">
      <form className="search-form__container" onSubmit={handleSubmitForm}>
        <input
          className="search-form__input"
          placeholder="Фильм"
          type="text"
          value={value || ''}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
          onChange={handleValueChange}
        />
        <button className="search-form__button" type="submit">Найти</button>
      </form>
      <div className={`search-form__underline ${isInputFocused ? "search-form__underline_focused" : ""} ${isEmpty ? "search-form__underline_error" : ""}`}></div>
      {isEmpty && <span className="search-form__messsage search-form__messsage_error">Нужно ввести ключевое слово</span>}
      <div className="search-form__wrapper">
        <FilterCheckbox isChecked={isChecked} handleOnChange={handleOnChange} />
        <span className="search-form__short-film">Короткометражки</span>
      </div>
    </section>
  )
};