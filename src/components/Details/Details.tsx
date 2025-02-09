import { Film } from '../../helpers/film.model';

interface DetailsProps {
  item: Film;
}

const Details: React.FC<DetailsProps> = ({ item }: DetailsProps) => {
  return (
    <div>
      <h1>Details</h1>
      <h2>{item.title}</h2>
      <p>
        <strong>Opening Crawl:</strong> {item.opening_crawl}
      </p>
      <p>
        <strong>Director:</strong> {item.director}
      </p>
      <p>
        <strong>Producer:</strong> {item.producer}
      </p>
      <p>
        <strong>Release Date:</strong> {item.release_date}
      </p>
    </div>
  );
};

export default Details;
