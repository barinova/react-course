import React, { useMemo } from 'react';
import './CountriesTable.css';
import { Country } from '../../models/countries.model.ts';

interface CountriesTableProps {
  countries: Country[];
}

const CountriesTable: React.FC<CountriesTableProps> = ({ countries }) => {
  const memoizedRows = useMemo(() => {
    return countries.map((country: Country) => (
      <tr key={country.cca3}>
        <td className={'cell'}>{country.name.common}</td>
        <td className={'cell'}>{country.population}</td>
        <td className={'cell'}>{country.region}</td>
        <td className={'cell'}>
          <img src={country.flags.png} alt={country.name.common} width="50" />
        </td>
      </tr>
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
