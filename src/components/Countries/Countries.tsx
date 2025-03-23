import { useGetAllCountriesQuery } from '../../store/countriesApiSlice.ts';
import { useEffect } from 'react';
import { addCountries } from '../../store/countriesSlice.ts';
import { useDispatch } from 'react-redux';
import { CountriesTable } from '../CountriesTable/CountriesTable.tsx';
import { CountriesFilter } from '../CountriesFilter/CountriesFilter.tsx';

export const Countries: React.FC = () => {
  const dispatch = useDispatch();
  const { data, isFetching, isError } = useGetAllCountriesQuery();

  useEffect(() => {
    dispatch(addCountries(data || []));
  }, [data]);

  return (
    <>
      {isFetching && <div>Loading...</div>}
      {isError && <div>Error loading countries</div>}
      <CountriesFilter></CountriesFilter>
      {!isFetching && !isError && <CountriesTable></CountriesTable>}
    </>
  );
};
