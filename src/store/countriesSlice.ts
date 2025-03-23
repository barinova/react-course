import { Country } from '../models/countries.model.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CountriesState {
  countries: Country[];
  filtersByRegion: string[];
  searchByCountryName: string;
  sortByPopulation: string[];
}

const initialState: CountriesState = {
  countries: [],
  filtersByRegion: [],
  searchByCountryName: '',
  sortByPopulation: [],
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    addCountries(state, action: PayloadAction<Country[]>) {
      state.countries = action.payload;
    },
  },
});

export const { addCountries } = countriesSlice.actions;
export default countriesSlice.reducer;
