import { render, screen } from '@testing-library/react';
import { act } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import selectedItemsReducer from '@store/selectedItemsSlice';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { filmsApi, useGetFilmByIdQuery } from '@store/api/film.api';
import { useTheme } from '@components/ThemeSwitcher/ThemeContext';
import Details from '@components/Details/Details';

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

jest.mock('../ThemeSwitcher/ThemeContext.tsx');

describe('Details Component', () => {
  const renderWithProvider = (ui: React.ReactElement) => {
    const store = configureStore({
      reducer: {
        selectedItemsReducer,
        [filmsApi.reducerPath]: filmsApi.reducer,
      },
    });

    return render(<Provider store={store}>{ui}</Provider>);
  };

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

  test('shows loader while fetching results', async () => {
    (useGetFilmByIdQuery as jest.Mock).mockReturnValueOnce({
      isFetching: true,
      isError: false,
      data: null,
    });

    await act(async () => {
      renderWithProvider(<Details itemId="1" onCloseDetails={() => {}} />);
    });

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('displays all details about film correctly', async () => {
    await act(async () => {
      renderWithProvider(<Details itemId="1" onCloseDetails={() => {}} />);
    });

    expect(screen.getByText('Mock Film')).toBeInTheDocument();
    expect(screen.getByText('Mock Director')).toBeInTheDocument();
    expect(screen.getByText('Mock Producer')).toBeInTheDocument();
    expect(screen.getByText('2000-01-01')).toBeInTheDocument();
  });

  test('handles error state', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    (useGetFilmByIdQuery as jest.Mock).mockReturnValueOnce({
      isFetching: false,
      isError: true,
      data: null,
    });

    await act(async () => {
      renderWithProvider(<Details itemId="1" onCloseDetails={() => {}} />);
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching film details');
    expect(screen.queryByText('Mock Film')).toBeNull();
    consoleErrorSpy.mockRestore();
  });
});
