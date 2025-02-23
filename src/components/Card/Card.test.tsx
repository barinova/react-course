import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from './Card';
import { Film } from '../../helpers/film.model.ts';

describe('Card Component', () => {
  const mockFilm: Film = {
    title: 'A New Hope',
    director: 'George Lucas',
    producer: 'Gary Kurtz, Rick McCallum',
    release_date: '1977-05-25',
    url: 'https://swapi.dev/api/films/1/',
    episode_id: 4,
    opening_crawl: 'It is a period of civil war...',
  };

  test('renders the card with correct film details', () => {
    render(<Card film={mockFilm} onClick={() => {}} />);

    expect(screen.getByText('A New Hope')).toBeInTheDocument();
    expect(screen.getByText('Director: George Lucas')).toBeInTheDocument();
    expect(
      screen.getByText('Producer: Gary Kurtz, Rick McCallum')
    ).toBeInTheDocument();
    expect(screen.getByText('Release date: 1977-05-25')).toBeInTheDocument();
  });

  test('calls onClick when the card is clicked', () => {
    const handleClick = jest.fn();
    render(<Card film={mockFilm} onClick={handleClick} />);

    fireEvent.click(screen.getByText('A New Hope'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
