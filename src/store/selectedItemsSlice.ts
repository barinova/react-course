import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Film } from '../helpers/film.model.ts';

export interface SelectedItemsState {
  selectedItems: string[];
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
      const isSelected = state.selectedItems.includes(item.title);

      if (isSelected) {
        state.selectedItems = state.selectedItems.filter(
          (id) => id !== item.title
        );
        return;
      }

      state.selectedItems.push(item.title);
    },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

// Action creators are generated for each case reducer function
export const { selectItem } = selectedItemsSlice.actions;

export default selectedItemsSlice.reducer;
