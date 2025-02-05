import { FilmsResponse } from './film.model.ts';

const API_URL = 'https://swapi.dev/api/films/';

export async function fetchFilms(search: string): Promise<FilmsResponse> {
  try {
    const response = await fetch(`${API_URL}?search=${search}`);

    return await response.json();
  } catch (error) {
    throw new Error(`Error fetching films: ${error.message}`);
  }
}
