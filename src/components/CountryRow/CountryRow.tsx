import React, { useState } from 'react';
import { Country } from '../../models/countries.model.ts';
import './CountryRow.css';

const LOCAL_STORAGE_KEY = 'visitedCountries';

interface CountryRowProps {
  country: Country;
}

const CountryRow: React.FC<CountryRowProps> = ({
  country,
}: CountryRowProps) => {
  const [visited, setVisited] = useState<boolean>(() => {
    const visitedCountries = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) || '[]'
    );
    return visitedCountries.includes(country.cca3);
  });

  const selectCountry = () => {
    const newVisited = !visited;
    setVisited(newVisited);

    const visitedCountries: string[] = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) || '[]'
    );

    if (newVisited) {
      visitedCountries.push(country.cca3);
    } else {
      const index: number = visitedCountries.indexOf(country.cca3);
      if (index !== -1) visitedCountries.splice(index, 1);
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(visitedCountries));
  };

  return (
    <tr className={visited ? 'visited' : ''}>
      <td className={'cell'}>{country.name.common}</td>
      <td className={'cell'}>{country.population}</td>
      <td className={'cell'}>{country.region}</td>
      <td className={'cell'}>
        <img src={country.flags.png} alt={country.name.common} width="50" />
      </td>
      <td className={'cell'}>
        <input type="checkbox" checked={visited} onChange={selectCountry} />
      </td>
    </tr>
  );
};

export default React.memo(CountryRow);
