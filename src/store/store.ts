import { configureStore } from '@reduxjs/toolkit';
import selectedItemsReducer from './selectedItemsSlice.tsx';
import { filmsApi } from './api/film.api.ts';

export const store = configureStore({
  reducer: {
    selectedItemsReducer: selectedItemsReducer,
    [filmsApi.reducerPath]: filmsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(filmsApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
