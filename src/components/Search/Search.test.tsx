import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Search from './Search.tsx';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedItemsReducer from '../../store/selectedItemsSlice.ts';
import { filmsApi } from '../../store/api/film.api.ts';

jest.mock('../../helpers/films-api', () => ({
  fetchFilms: jest.fn(),
  useGetFilmsQuery: jest.fn(),
}));

describe('Search Component', () => {
  const renderWithProvider = (ui: React.ReactElement) => {
    const store = configureStore({
      reducer: {
        selectedItemsReducer,
        [filmsApi.reducerPath]: filmsApi.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(filmsApi.middleware),
    });

    return render(<Provider store={store}>{ui}</Provider>);
  };

  const defaultProps = {
    query: '',
    onSearch: jest.fn(),
    searchResultsReceived: jest.fn(),
  };

  test('renders search component', () => {
    const { container } = renderWithProvider(<Search {...defaultProps} />);
    expect(container.querySelector('input')).toBeTruthy();
  });

  test('input has correct initial value', () => {
    const { container } = renderWithProvider(<Search {...defaultProps} />);
    const inputElement = container.querySelector('input');
    expect(inputElement).toHaveValue('');
  });
});
