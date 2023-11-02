// Раздел для карточек с сохранёнными фильмами
import './SavedMoviesCardList.css';
import { SavedMoviesCard } from '../SavedMoviesCard/SavedMoviesCard';

export function SavedMoviesCardList({ moviesToShow, handleDeleteClick }) {
  return ( // Отрисовываем каждый фильм при помощи компонента Movie и возвращаем в разметку внутрь section
    <section id="elements" className="elements page__elements-position section">
      {moviesToShow && moviesToShow.map(movie => ( // Пробегаем по переданному массиву и возвращаем карточки с фильмами
        <SavedMoviesCard key={`${movie.movieId}-saved`} movie={movie} handleDeleteClick={handleDeleteClick} />))}
    </section>
  )
}
