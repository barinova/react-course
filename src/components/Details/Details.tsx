import React, { useEffect, useState } from 'react';
import { Film } from '../../helpers/film.model.ts';
import './Details.css';
import Loader from '../Loader/Loader.tsx';

interface DetailsProps {
  itemUrl: string;
}

const Details: React.FC<DetailsProps> = ({ itemUrl }) => {
  const [item, setItem] = useState<Film | null>(null);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const fetchItemDetails = async () => {
      setShowLoader(true);
      try {
        const response = await fetch(itemUrl);
        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error(`Error while fetching details: ${error}`);
      } finally {
        setShowLoader(false);
      }
    };

    fetchItemDetails();
  }, [itemUrl]);

  return (
    <>
      {showLoader && <Loader></Loader>}
      <h3 className={'details'}>Details</h3>
      {item && (
        <div className="details-description">
          <h3>{item.title}</h3>
          <p>Director: {item.director}</p>
          <p>Producer: {item.producer}</p>
          <p>Release date: {item.release_date}</p>
          <p>{item.opening_crawl}</p>
        </div>
      )}
    </>
  );
};

export default Details;
