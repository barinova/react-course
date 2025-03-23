import { useGetAllCountriesQuery } from '../../store/countriesApiSlice.ts';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Country } from '../../models/countries.model.ts';
import CountriesFilter from '../CountriesFilter/CountriesFilter.tsx';
import CountriesTable from '../CountriesTable/CountriesTable.tsx';
import { Sorting } from '../../models/soring.enum.ts';

export const Countries: React.FC = () => {
  const { data, isFetching, isError } = useGetAllCountriesQuery();
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');
  const [sorting, setSorting] = useState<Sorting>(Sorting.NameAsc);

  const sortCountries = useCallback(
    (countries: Country[], sorting: Sorting): Country[] => {
      return [...countries].sort((a: Country, b: Country) => {
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
    },
    []
  );

  const filteredCountries = useMemo(() => {
    if (!data) {
      return [];
    }

    const filtered = data.filter(
      (country: Country): boolean =>
        (selectedRegion ? country.region === selectedRegion : true) &&
        country.name.common.toLowerCase().includes(search.toLowerCase())
    );

    return sortCountries(filtered, sorting);
  }, [data, selectedRegion, search, sorting, sortCountries]);

  useEffect(() => {
    if (data) {
      setCountries(data);
    }
  }, [data]);

  return (
    <>
      {isFetching && <div>Loading...</div>}
      {isError && <div>Error loading countries</div>}
      <CountriesFilter
        countries={countries}
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
