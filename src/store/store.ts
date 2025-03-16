import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../store/formSlice';

export const store = configureStore({
  reducer: {
    form: formReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
