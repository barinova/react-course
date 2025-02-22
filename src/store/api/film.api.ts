import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Film, FilmsResponse } from '../../helpers/film.model.ts';

export const filmsApi = createApi({
  reducerPath: 'filmsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    getFilms: builder.query<Film[], string>({
      query: (search: string) => ({
        url: 'films/',
        params: { search },
      }),
      transformResponse: (response: FilmsResponse) => response?.results || [],
    }),
  }),
});

export const { useGetFilmsQuery } = filmsApi;
