import React, { useMemo } from 'react';
import { RootState } from '../../store/store.ts';
import { useDispatch, useSelector } from 'react-redux';
import './CountriesFilter.css';
import {
  filterCountriesByRegion,
  filterCountriesBySearch,
  sortCountriesByParam,
} from '../../store/countriesSlice.ts';
import { Country } from '../../models/countries.model.ts';
import { Sorting } from '../../models/soring.enum.ts';

const CountriesFilter: React.FC = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(
    (state: RootState) => state.countriesReducer.search
  );
  const countries = useSelector(
    (state: RootState) => state.countriesReducer.countries
  );
  const regionNames = useMemo(() => {
    const regions: string[] = countries.map(
      (country: Country) => country.region
    );
    return [...new Set(regions)];
  }, [countries]);

  function handleRegionChange(event: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(filterCountriesByRegion(event.target.value || null));
  }

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(filterCountriesBySearch(event.target.value));
  }

  function handleSortChange(event: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(sortCountriesByParam(event.target.value || null));
  }

  return (
    <>
      {regionNames?.length > 0 && (
        <div>
          <input
            className={'search'}
            type="text"
            placeholder="Search by country name"
            value={searchTerm}
            onChange={handleSearchChange}
          />

          <select className={'select'} onChange={handleRegionChange}>
            <option value={''}>Select a region</option>
            {regionNames.map((name: string) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>

          <select className={'select'} onChange={handleSortChange}>
            <option value={Sorting.NameAsc}>Name (A-Z)</option>
            <option value={Sorting.NameDesc}>Name (Z-A)</option>
            <option value={Sorting.PopulationAsc}>
              Population (Ascending)
            </option>
            <option value={Sorting.PopulationDesc}>
              Population (Descending)
            </option>
          </select>
        </div>
      )}
    </>
  );
};

export default React.memo(CountriesFilter);
