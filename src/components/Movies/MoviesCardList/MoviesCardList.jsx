// Раздел для карточек с фильмами
import './MoviesCardList.css';
import { MoviesCard } from '../MoviesCard/MoviesCard';

export function MoviesCardList({ moviesToShow, handleLikeClick }) {
  return ( // Отрисовываем каждый фильм при помощи компонента Movie и возвращаем в разметку внутрь section
    <section id="elements" className="elements page__elements-position section">
      {moviesToShow && moviesToShow.map(movie => ( // Пробегаем по переданному массиву и возвращаем карточки с фильмами
        <MoviesCard key={movie.id} movie={movie} handleLikeClick={handleLikeClick} />))}
    </section>
  )
}