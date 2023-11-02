// Компонент SavedMoviesCard
import './SavedMoviesCard.css';
import { Card } from '../../template/Card/Card';

export function SavedMoviesCard({ movie, handleDeleteClick }) {
  const image = movie.image // т.к. у карточек сервера и сохранённых разная запись картинке в объектах
  const isLiked = true;  // нет условия для повторной проверки фильмов, т.к. они берутся из savedMovies
  const typeOfMovie = 'savedMovie'; // для определения места отрисовки карточки и постановки соотв. иконки

  return (
    <Card movie={movie} isLiked={isLiked} handleLike={handleDeleteClick} image={image} typeOfMovie={typeOfMovie} />
  )
}