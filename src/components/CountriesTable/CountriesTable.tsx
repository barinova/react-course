import React, { useMemo } from 'react';
import './CountriesTable.css';
import { Country } from '../../models/countries.model.ts';
import CountryRow from '../CountryRow/CountryRow.tsx';

interface CountriesTableProps {
  countries: Country[];
}

const CountriesTable: React.FC<CountriesTableProps> = ({
  countries,
}: CountriesTableProps) => {
  const memoizedRows = useMemo(() => {
    return countries.map((country: Country) => (
      <CountryRow key={country.cca3} country={country} />
    ));
  }, [countries]);

  return (
    <>
      {countries.length > 0 ? (
        <table className={'table'}>
          <thead>
            <tr>
              <th className={'cell'}>Name</th>
              <th className={'cell'}>Population</th>
              <th className={'cell'}>Region</th>
              <th className={'cell'}>Flag</th>
              <th className={'cell'}>Visited</th>
            </tr>
          </thead>
          <tbody>{memoizedRows}</tbody>
        </table>
      ) : (
        <div>No results found</div>
      )}
    </>
  );
};

export default React.memo(CountriesTable);
