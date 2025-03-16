import React, { useEffect, useState } from 'react';
import { Film } from '../../helpers/film.model';
import './Details.css';
import Loader from '../Loader/Loader';
import { useGetFilmByIdQuery } from '@store/api/film.api';
import { useTheme } from '../ThemeSwitcher/ThemeContext';
import Button from '../Button/Button';

interface DetailsProps {
  itemId: string;
  onCloseDetails: () => void;
}

const Details: React.FC<DetailsProps> = ({ itemId, onCloseDetails }) => {
  const [item, setItem] = useState<Film | null>(null);
  const { isFetching, isError, data } = useGetFilmByIdQuery(itemId);
  const { isDarkTheme } = useTheme();

  useEffect(() => {
    if (isError) {
      setItem(null);
      console.error('Error fetching film details');
      return;
    }

    if (data) {
      setItem(data);
    }
  }, [data, isError]);

  const closeDetails = (): void => {
    onCloseDetails();
  };

  return (
    <aside className={`details ${isDarkTheme ? 'details-dark' : ''}`}>
      {isFetching && <Loader />}
      {item && (
        <>
          <h2>{item.title}</h2>
          <div className="details-description">
            <p>
              <strong>Director:</strong> {item.director}
            </p>
            <p>
              <strong>Producer:</strong> {item.producer}
            </p>
            <p>
              <strong>Release date:</strong> {item.release_date}
            </p>
            <p>{item.opening_crawl}</p>
          </div>
          <div className="details-close">
            <Button onButtonClick={closeDetails} text="Close Details" />
          </div>
        </>
      )}
    </aside>
  );
};

export default Details;
