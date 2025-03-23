import { Country } from '../models/countries.model.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Sorting } from '../models/soring.enum.ts';

interface CountriesState {
  countries: Country[];
  filterCountries: Country[];
  selectedRegion: string | null;
  search: string;
  sorting: Sorting;
}

const initialState: CountriesState = {
  countries: [],
  filteredCountries: [],
  selectedRegion: null,
  search: '',
  sorting: Sorting.NameAsc,
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    addCountries(state, action: PayloadAction<Country[]>) {
      state.countries = action.payload;
      state.filteredCountries = filterAndSortCountries(
        state.countries,
        state.selectedRegion,
        state.search,
        state.sorting
      );
    },
    filterCountriesByRegion(state, action: PayloadAction<string>) {
      state.selectedRegion = action.payload || null;
      state.filteredCountries = filterAndSortCountries(
        state.countries,
        action.payload,
        state.search,
        state.sorting
      );
    },
    filterCountriesBySearch(state, action: PayloadAction<string>) {
      state.search = action.payload || '';
      state.filteredCountries = filterAndSortCountries(
        state.countries,
        state.selectedRegion,
        action.payload,
        state.sorting
      );
    },
    sortCountriesByParam(state, action: PayloadAction<Sorting.NameAsc>) {
      state.sorting = action.payload;
      state.filteredCountries = filterAndSortCountries(
        state.countries,
        state.selectedRegion,
        state.search,
        action.payload
      );
    },
  },
});

function sortCountries(countries: Country[], sorting: Sorting): Country[] {
  return countries.sort((a, b) => {
    switch (sorting) {
      case Sorting.NameAsc:
        return a.name.common.localeCompare(b.name.common);
      case Sorting.NameDesc:
        return b.name.common.localeCompare(a.name.common);
      case Sorting.PopulationAsc:
        return a.population - b.population;
      case Sorting.PopulationDesc:
        return b.population - a.population;
      default:
        return 0;
    }
  });
}

function filterAndSortCountries(
  countries: Country[],
  selectedRegion: string | null,
  search: string,
  sorting: Sorting
): Country[] {
  const filteredCountries = countries.filter(
    (country: Country) =>
      (selectedRegion ? country.region === selectedRegion : true) &&
      country.name.common.toLowerCase().includes(search.toLowerCase())
  );
  const sortedCountries = sortCountries(filteredCountries, sorting);
  return sortedCountries;
}

export const {
  addCountries,
  filterCountriesByRegion,
  filterCountriesBySearch,
  sortCountriesByParam,
} = countriesSlice.actions;
export default countriesSlice.reducer;
