import React, { useCallback, useMemo } from 'react';
import './CountriesFilter.css';
import { Country } from '../../models/countries.model';
import { CountriesFilterProps } from '../../models/countries-info.model';
import { Sorting } from '../../models/soring.enum.ts';

const CountriesFilter: React.FC<CountriesFilterProps> = ({
  countries,
  setSelectedRegion,
  setSearch,
  setSorting,
}: CountriesFilterProps) => {
  const regionNames: string[] = useMemo(() => {
    return [...new Set(countries?.map((c: Country) => c.region))];
  }, [countries]);

  const handleRegionChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedRegion(event.target.value || null);
    },
    [setSelectedRegion]
  );

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    },
    [setSearch]
  );

  const handleSortChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSorting(event.target.value as Sorting);
    },
    [setSorting]
  );

  return (
    <>
      {regionNames.length > 0 && (
        <div>
          <input
            className="search"
            type="text"
            placeholder="Search by country name"
            onChange={handleSearchChange}
          />

          <select className="select" onChange={handleRegionChange}>
            <option value="">Select a region</option>
            {regionNames.map((name: string) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>

          <select className="select" onChange={handleSortChange}>
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
