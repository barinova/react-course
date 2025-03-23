import { Country } from './countries.model.ts';
import { Sorting } from './soring.enum.ts';

export interface CountriesFilterProps {
  countries: Country[];
  setSelectedRegion: string | null;
  setSearch: string;
  setSorting: Sorting;
}
