import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Film } from '../helpers/film.model.ts';

export interface SelectedItemsState {
  selectedItems: Film[];
}

const initialState: SelectedItemsState = {
  selectedItems: [],
};

export const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    selectItem: (state, action: PayloadAction<Film>) => {
      const item = action.payload;
      const isSelected = state.selectedItems.find(
        (film: Film) => film.title === item.title
      );

      if (isSelected) {
        state.selectedItems = state.selectedItems.filter(
          (film) => film.title !== item.title
        );
        return;
      }

      state.selectedItems.push(item);
    },
    clearItems: (state) => {
      state.selectedItems = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { selectItem, clearItems } = selectedItemsSlice.actions;

export default selectedItemsSlice.reducer;
