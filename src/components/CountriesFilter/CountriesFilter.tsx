import React from 'react';
import './CountriesFilter.css';
import { Country } from '../../models/countries.model.ts';
import { Sorting } from '../../models/soring.enum.ts';
import { CountriesFilterProps } from '../../models/countries-info.model.ts';

export const CountriesFilter: React.FC<CountriesFilterProps> = ({
  countries,
  setSelectedRegion,
  setSearch,
  setSorting,
}) => {
  const regions: string[] = countries.map((country: Country) => country.region);
  const regionNames = [...new Set(regions)];

  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(event.target.value || null);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSorting(event.target.value as Sorting);
  };

  return (
    <>
      {regionNames?.length > 0 && (
        <div>
          <input
            className={'search'}
            type="text"
            placeholder="Search by country name"
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

// export default React.memo(CountriesFilter);
