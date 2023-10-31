// Компонент SavedMoviesCard
import './SavedMoviesCard.css';
import React from "react";
import { Card } from '../../shared/Card/Card';

export function SavedMoviesCard({ movie, handleDeleteClick }) {
  const image = movie.image // т.к. у карточек сервера и сохранённых разная запись картинке в объектах
  const isLiked = true;  // нет условия для повторной проверки фильмов, т.к. они берутся из savedMovies

  return (
    <Card movie={movie} isLiked={isLiked} handleLike={handleDeleteClick} image={image} />
  )
}