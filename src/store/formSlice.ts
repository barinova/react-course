import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormData } from './form.model.ts';
import { countries } from '../consts/countries.const.ts';

interface FormState {
  userForm: FormData | null;
  countries: string[];
}

const initialState: FormState = {
  userForm: null,
  countries,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addFormData: (state, action: PayloadAction<FormData>) => {
      return {
        ...state,
        userForm: action.payload,
      };
    },
  },
});

export const { addFormData } = formSlice.actions;
export default formSlice.reducer;
