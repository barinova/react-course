import { Country } from './countries.model.ts';
import { Sorting } from './soring.enum.ts';
//todo: remove
export interface CountriesFilterProps {
  countries: Country[];
  setFilteredCountries: Country[];
  setSelectedRegion: string | null;
  setSearch: string;
  setSorting: Sorting;
}
