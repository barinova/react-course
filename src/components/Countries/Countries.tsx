import { useGetAllCountriesQuery } from '../../store/countriesApiSlice.ts';
import { useEffect, useState } from 'react';
import { Country } from '../../models/countries.model.ts';
import { Sorting } from '../../models/soring.enum.ts';
import { CountriesFilter } from '../CountriesFilter/CountriesFilter.tsx';
import { CountriesTable } from '../CountriesTable/CountriesTable.tsx';

export const Countries: React.FC = () => {
  const { data, isFetching, isError } = useGetAllCountriesQuery();
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');
  const [sorting, setSorting] = useState<Sorting>(Sorting.NameAsc);

  useEffect(() => {
    if (data) {
      setCountries(data);
      setFilteredCountries(
        filterAndSortCountries(data, selectedRegion, search, sorting)
      );
    }
  }, [data, selectedRegion, search, sorting]);

  const filterAndSortCountries = (
    countries: Country[],
    selectedRegion: string | null,
    search: string,
    sorting: Sorting
  ): Country[] => {
    const filteredCountries = countries.filter(
      (country: Country) =>
        (selectedRegion ? country.region === selectedRegion : true) &&
        country.name.common.toLowerCase().includes(search.toLowerCase())
    );
    return sortCountries(filteredCountries, sorting);
  };

  const sortCountries = (countries: Country[], sorting: Sorting): Country[] => {
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
  };

  return (
    <>
      {isFetching && <div>Loading...</div>}
      {isError && <div>Error loading countries</div>}
      <CountriesFilter
        countries={countries}
        setFilteredCountries={setFilteredCountries}
        setSelectedRegion={setSelectedRegion}
        setSearch={setSearch}
        setSorting={setSorting}
      />
      {!isFetching && !isError && (
        <CountriesTable countries={filteredCountries} />
      )}
    </>
  );
};
