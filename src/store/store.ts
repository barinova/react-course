import { configureStore } from '@reduxjs/toolkit';
import { countriesApi } from './countriesApiSlice.ts';
import countriesReducer from './countriesSlice.ts';

export const store = configureStore({
  reducer: {
    countriesReducer: countriesReducer,
    [countriesApi.reducerPath]: countriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(countriesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
