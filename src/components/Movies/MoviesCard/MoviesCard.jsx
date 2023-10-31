// Компонент MoviesCard
import './MoviesCard.css';
import React, { useEffect, useState } from "react";
import { Card } from '../../shared/Card/Card';
import { SavedMoviesContext } from '../../../context/SavedMoviesContext';

export function MoviesCard({ movie, handleLikeClick }) {
  const image = `https://api.nomoreparties.co${movie.image.url}` // т.к. у карточек сервера и сохранённых разная запись картинке в объектах
  const savedMovies = React.useContext(SavedMoviesContext)
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