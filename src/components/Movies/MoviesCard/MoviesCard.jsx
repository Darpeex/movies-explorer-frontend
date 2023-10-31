// Компонент MoviesCard
import './MoviesCard.css';
import { Card } from '../../template/Card/Card';
import { useEffect, useState, useContext } from "react";
import { SavedMoviesContext } from '../../../context/SavedMoviesContext';

export function MoviesCard({ movie, handleLikeClick }) {
  const image = `https://api.nomoreparties.co${movie.image.url}` // т.к. у карточек сервера и сохранённых разная запись картинке в объектах
  const savedMovies = useContext(SavedMoviesContext)
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (savedMovies && savedMovies.length > 0) {
      setIsLiked(savedMovies.some(card => card.movieId === movie.id)) // Определяем, есть ли фильм в БД
    } else {
      setIsLiked(false)
    }
  }, [savedMovies]);

  return (
    <Card movie={movie} isLiked={isLiked} handleLike={handleLikeClick} image={image} />
  )
}