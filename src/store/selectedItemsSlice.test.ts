// selectedItemsSlice.test.ts
import selectedItemsReducer, { selectItem } from './selectedItemsSlice.tsx';
import { Film } from '../helpers/film.model.ts';

describe('selectedItemsSlice', () => {
  const initialState = {
    selectedItems: [],
  };

  test('should add item', () => {
    const newItem: Film = {
      title: 'Film 1',
      director: '',
      producer: '',
      release_date: '',
      url: '',
      opening_crawl: '',
      episode_id: 1,
    };
    const expectedState = {
      selectedItems: [{ ...newItem }],
    };
    expect(selectedItemsReducer(initialState, selectItem(newItem))).toEqual(
      expectedState
    );
  });

  test('should remove item', () => {
    const newItem: Film = {
      title: 'Film 1',
      director: '',
      producer: '',
      release_date: '',
      url: '',
      opening_crawl: '',
      episode_id: 1,
    };

    const initialStateWithItem = {
      selectedItems: [{ ...newItem }],
    };
    const expectedState = {
      selectedItems: [],
    };
    expect(
      selectedItemsReducer(initialStateWithItem, selectItem(newItem))
    ).toEqual(expectedState);
  });
});
