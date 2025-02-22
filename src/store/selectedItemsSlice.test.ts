// selectedItemsSlice.test.ts
import selectedItemsReducer, { selectItem } from './selectedItemsSlice.ts';
import { Film } from '../helpers/film.model.ts';

describe('selectedItemsSlice', () => {
  const initialState = {
    selectedItems: [],
  };

  test('should handle selectItem - add item', () => {
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
      selectedItems: [newItem.title],
    };
    expect(selectedItemsReducer(initialState, selectItem(newItem))).toEqual(
      expectedState
    );
  });

  test('should handle selectItem - remove item', () => {
    const initialStateWithItem = {
      selectedItems: ['Film 1'],
    };
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
      selectedItems: [],
    };
    expect(
      selectedItemsReducer(initialStateWithItem, selectItem(newItem))
    ).toEqual(expectedState);
  });
});
