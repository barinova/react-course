import React from 'react';
import { Film } from '../../helpers/film.model.ts';
import './Card.css';

interface CardProps {
  film: Film;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ film, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <h3>{film.title}</h3>
      <div className="card-details">
        <p>Director: {film.director}</p>
        <p>Producer: {film.producer}</p>
        <p>Release date: {film.release_date}</p>
      </div>
    </div>
  );
};

export default Card;
