import { fireEvent, render, screen } from '@testing-library/react';
import { Film } from '../../helpers/film.model';
import { act, MouseEventHandler } from 'react';
import mockRouter from 'next-router-mock';
import { useTheme } from '@components/ThemeSwitcher/ThemeContext';
import CardList from '@components/CardList/CardList';
import { useSearchParams } from 'next/navigation';

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

jest.mock('../Flyout/Flyout.tsx', () => {
  const MockFlyout = () => (
    <div data-testid="mock-flyout">Mock Flyout Component</div>
  );
  MockFlyout.displayName = 'MockFlyout';
  return MockFlyout;
});

jest.mock('../Card/Card.tsx', () => {
  const MockCard = (props: {
    onClick: MouseEventHandler<HTMLDivElement> | undefined;
  }) => (
    <div className="card" onClick={props.onClick}>
      Mock Card Component
    </div>
  );
  MockCard.displayName = 'MockCard';
  return MockCard;
});

jest.mock('../../store/api/film.api.ts', () => ({
  useGetFilmByIdQuery: jest.fn().mockReturnValue({
    isFetching: false,
    isError: false,
    data: {
      title: 'Mock Film',
      director: 'Mock Director',
      producer: 'Mock Producer',
      release_date: '2000-01-01',
    },
  }),
  filmsApi: {
    reducerPath: 'filmsApi',
    reducer: (state = {}) => state,
  },
}));

jest.mock('next/router', () => ({
  useRouter: () => mockRouter,
}));

let searchParams = new URLSearchParams('details=1&page=2');

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => searchParams),
}));

const updateSearchParams = (newParams: string) => {
  searchParams = new URLSearchParams(newParams);
};

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

jest.mock('../ThemeSwitcher/ThemeContext.tsx');

describe('CardList Component', () => {
  beforeEach(() => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: {
        colors: {
          primary: '#000',
          secondary: '#fff',
        },
      },
    });
  });

  test('renders correct number of cards', () => {
    render(<CardList searchResults={mockFilms} error={null} />);

    const cards = document.querySelectorAll('.card');
    expect(cards.length).toBe(mockFilms.length);
  });

  test('fetches details, and displays them on card click', async () => {
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

  test('changes pages when url page param updates', async () => {
    render(
      <CardList searchResults={new Array(8).fill(mockFilms[0])} error={null} />
    );

    expect(useSearchParams().get('details')).toBe('1');

    await act(async () => {
      updateSearchParams('page=2');
    });

    expect(useSearchParams().get('details')).toBeNull();
    expect(useSearchParams().get('page')).toBe('2');

    expect(screen.getByTestId('pagination-text')?.textContent).toBe(
      'Page 2 of 2'
    );
  });

  test('does nothing if searchResults is null', () => {
    const { container } = render(
      <CardList searchResults={null} error={null} />
    );

    expect(container.querySelector('.card-list')).toBeNull();
    expect(container.querySelector('.details-container')).toBeNull();
  });

  test('displays empty search result message when searchResults is empty array', () => {
    render(<CardList searchResults={[]} error={null} />);
    expect(screen.getByText('Empty search result')).toBeInTheDocument();
  });
});
