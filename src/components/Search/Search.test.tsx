import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Search from './Search.tsx';
import { fetchFilms } from '../../helpers/films-api.ts';

jest.mock('../../helpers/films-api', () => ({
  fetchFilms: jest.fn(),
}));

describe('Search Component', () => {
  const defaultProps = {
    query: '',
    onSearch: jest.fn(),
    searchResultsReceived: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders search component', () => {
    const { container } = render(<Search {...defaultProps} />);
    expect(container.querySelector('input')).toBeTruthy();
  });

  test('input has correct initial value', () => {
    const { container } = render(<Search {...defaultProps} />);
    const inputElement = container.querySelector('input');
    expect(inputElement).toHaveValue('');
  });

  test('fetches films and calls searchResultsReceived', async () => {
    const mockFilms = { results: [{ title: 'A New Hope' }] };
    (fetchFilms as jest.Mock).mockResolvedValue(mockFilms);

    const { container } = render(<Search {...defaultProps} />);
    const button = container.querySelector('button');
    expect(button).toBeTruthy();

    if (!button) {
      return;
    }

    fireEvent.click(button);

    await waitFor(() => {
      expect(defaultProps.searchResultsReceived).toHaveBeenCalledWith(
        mockFilms.results,
        null
      );
    });
  });
});
