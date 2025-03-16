import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormData } from './form.model.ts';
import { countries } from '../consts/countries.const.ts';

interface FormState {
  userForm: FormData | null;
  countries: string[];
  isNewData: boolean;
}

const initialState: FormState = {
  userForm: null,
  countries,
  isNewData: false,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addFormData: (state, action: PayloadAction<FormData>) => {
      return {
        ...state,
        userForm: action.payload,
        isNewData: true,
      };
    },
    clearNewDataFlag: (state) => {
      return {
        ...state,
        isNewData: false,
      };
    },
  },
});

export const { addFormData, clearNewDataFlag } = formSlice.actions;
export default formSlice.reducer;
