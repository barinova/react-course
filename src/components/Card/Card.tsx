import React from 'react';
import { Film } from '../../helpers/film.model.ts';
import './Card.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store.ts';
import { selectItem } from '../../store/selectedItemsSlice.ts';

interface CardProps {
  film: Film;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ film, onClick }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isSelected = useSelector((state: RootState) =>
    state.selectedItemsReducer.selectedItems.includes(film)
  );

  const handleCheckboxChange = (): void => {
    dispatch(selectItem(film));
  };

  const checkboxClick = (event: React.MouseEvent<HTMLInputElement>): void => {
    event.stopPropagation();
  };

  return (
    <section className="card" onClick={onClick}>
      <div className="card-checkbox">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleCheckboxChange}
          onClick={checkboxClick}
        />
      </div>
      <div>
        <h3>{film.title}</h3>
        <div className="card-details">
          <p>Director: {film.director}</p>
          <p>Producer: {film.producer}</p>
          <p>Release date: {film.release_date}</p>
        </div>
      </div>
    </section>
  );
};

export default Card;
