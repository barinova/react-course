import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedItemsReducer from '@store/selectedItemsSlice';
import { useGetFilmsQuery } from '@store/api/film.api';
import { filmsApi } from '@store/api/film.api';
import Search from './Search.jsx';

jest.mock('../../store/api/film.api.ts', () => ({
  useGetFilmsQuery: jest.fn(),
  filmsApi: {
    reducerPath: 'filmsApi',
    reducer: (state = {}) => state,
  },
}));

describe('Search Component', () => {
  const renderWithProvider = (ui: React.ReactElement) => {
    const store = configureStore({
      reducer: {
        selectedItemsReducer,
        [filmsApi.reducerPath]: filmsApi.reducer,
      },
    });

    return render(<Provider store={store}>{ui}</Provider>);
  };

  const defaultProps = {
    searchResultsReceived: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders search component', () => {
    (useGetFilmsQuery as jest.Mock).mockReturnValue({
      isFetching: false,
      isError: false,
      data: [],
    });

    renderWithProvider(<Search {...defaultProps} />);
    expect(screen.getByPlaceholderText('Enter text here')).toBeInTheDocument();
  });

  test('input has correct initial value', () => {
    (useGetFilmsQuery as jest.Mock).mockReturnValue({
      isFetching: false,
      isError: false,
      data: [],
    });

    renderWithProvider(<Search {...defaultProps} />);
    const inputElement = screen.getByPlaceholderText('Enter text here');
    expect(inputElement).toHaveValue('');
  });

  test('calls searchResultsReceived with data when API returns results', () => {
    const mockFilms = [{ id: 1, title: 'Test Movie' }];
    (useGetFilmsQuery as jest.Mock).mockReturnValue({
      isFetching: false,
      isError: false,
      data: mockFilms,
    });

    renderWithProvider(<Search {...defaultProps} />);
    expect(defaultProps.searchResultsReceived).toHaveBeenCalledWith(
      mockFilms,
      null
    );
  });

  test('calls searchResultsReceived with error when API request fails', () => {
    (useGetFilmsQuery as jest.Mock).mockReturnValue({
      isFetching: false,
      isError: true,
      data: undefined,
    });

    renderWithProvider(<Search {...defaultProps} />);
    expect(defaultProps.searchResultsReceived).toHaveBeenCalledWith(
      [],
      expect.any(Error)
    );
  });

  test('updates input value on change', () => {
    (useGetFilmsQuery as jest.Mock).mockReturnValue({
      isFetching: false,
      isError: false,
      data: [],
    });

    renderWithProvider(<Search {...defaultProps} />);
    const inputElement = screen.getByPlaceholderText('Enter text here');

    fireEvent.change(inputElement, { target: { value: 'Star Wars' } });
    expect(inputElement).toHaveValue('Star Wars');
  });

  test('shows loader when fetching', () => {
    (useGetFilmsQuery as jest.Mock).mockReturnValue({
      isFetching: true,
      isError: false,
      data: [],
    });

    renderWithProvider(<Search {...defaultProps} />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
