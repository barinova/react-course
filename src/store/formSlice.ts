import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  userForm: FormData | null;
}

const initialState: FormState = {
  userForm: null,
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
