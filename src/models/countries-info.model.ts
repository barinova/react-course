import { Country } from './countries.model.ts';
import { Sorting } from './soring.enum.ts';

export interface CountriesFilterProps {
  countries: Country[];
  setSelectedRegion: (region: string | null) => void;
  setSearch: (search: string) => void;
  setSorting: (sorting: Sorting) => void;
}
