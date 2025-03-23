import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import './CountriesTable.css';
import { Country } from '../../models/countries.model.ts';

export const CountriesTable: React.FC = () => {
  const countries = useSelector(
    (state: RootState) => state.countriesReducer.filteredCountries
  );

  return (
    <>
      {countries ? (
        <table className={'table'}>
          <thead>
            <tr>
              <th className={'cell'}>Name</th>
              <th className={'cell'}>Population</th>
              <th className={'cell'}>Region</th>
              <th className={'cell'}>Flag</th>
            </tr>
          </thead>
          <tbody>
            {countries &&
              countries.map((country: Country) => (
                <tr key={country.cca3}>
                  <td className={'cell'}>{country.name.common}</td>
                  <td className={'cell'}>{country.population}</td>
                  <td className={'cell'}>{country.region}</td>
                  <td className={'cell'}>
                    <img
                      src={country.flags.png}
                      alt={country.name.common}
                      width="50"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <div>No results found</div>
      )}
    </>
  );
};
