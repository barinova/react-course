import { fireEvent, render } from '@testing-library/react';
import { Film } from '../../helpers/film.model';
import CardList from './CardList.tsx';
import { act } from 'react';
import { useSearchParams } from 'react-router-dom';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        title: 'Test Film',
        director: 'John Doe',
        producer: 'Jane Doe',
        release_date: '2024-01-01',
      }),
  })
) as jest.Mock;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: jest.fn(),
}));

const mockFilms: Film[] = [
  {
    title: 'Film 1',
    director: 'Director 1',
    producer: 'Producer 1',
    release_date: '2023-01-01',
    url: 'https://api.example.com/film1',
    opening_crawl: 'Opening crawl 1',
    episode_id: 1,
  },
  {
    title: 'Film 2',
    director: 'Director 2',
    producer: 'Producer 2',
    release_date: '2023-02-01',
    url: 'https://api.example.com/film2',
    opening_crawl: 'Opening crawl 2',
    episode_id: 2,
  },
];

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: jest
    .fn()
    .mockReturnValue([new URLSearchParams(), jest.fn()]),
}));

describe('CardList Component', () => {
  test('renders correct number of cards', () => {
    render(<CardList searchResults={mockFilms} error={null} />);

    const cards = document.querySelectorAll('.card');
    expect(cards.length).toBe(mockFilms.length);
  });

  test('shows loader, fetches details, and displays them on card click', async () => {
    await act(async () => {
      render(<CardList searchResults={mockFilms} error={null} />);
    });

    const cards = document.querySelector('.card-list');
    const firstCard = cards?.children?.[0];

    expect(firstCard).toBeTruthy();

    if (!firstCard) {
      return;
    }

    await act(async () => {
      fireEvent.click(firstCard);
    });

    expect(document.querySelector('.details-container')).toBeTruthy();
    expect(document.querySelector('.details-close')).toBeTruthy();
  });

  test('closes details when close button is clicked', async () => {
    await act(async () => {
      render(<CardList searchResults={mockFilms} error={null} />);
    });

    const cards = document.querySelector('.card-list');
    const firstCard = cards?.children?.[0];

    expect(firstCard).toBeTruthy();

    if (!firstCard) {
      return;
    }

    await act(async () => {
      fireEvent.click(firstCard);
    });

    expect(document.querySelector('.details-container')).toBeTruthy();

    const closeButton = document.querySelector('.details-close button');
    expect(closeButton).toBeTruthy();

    if (!closeButton) {
      return;
    }

    await act(async () => {
      fireEvent.click(closeButton);
    });

    expect(document.querySelector('.details-container')).toBeNull();
  });

  test('handles details query param correctly', async () => {
    const setSearchParams = jest.fn();
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams('details=0'),
      setSearchParams,
    ]);

    await act(async () => {
      render(<CardList searchResults={mockFilms} error={null} />);
    });

    expect(document.querySelector('.details-container')).toBeTruthy();
    expect(document.querySelector('.details-close')).toBeTruthy();
  });

  test('handles details query param being null', async () => {
    const setSearchParams = jest.fn();
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams(),
      setSearchParams,
    ]);

    await act(async () => {
      render(<CardList searchResults={mockFilms} error={null} />);
    });

    expect(document.querySelector('.details-container')).toBeNull();
  });

  test('handles invalid details param correctly', async () => {
    const setSearchParams = jest.fn();
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams('details=10'),
      setSearchParams,
    ]);

    await act(async () => {
      render(<CardList searchResults={mockFilms} error={null} />);
    });

    expect(document.querySelector('.details-container')).toBeNull();
  });
});
