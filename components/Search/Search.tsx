import './Search.css';
import { useEffect, useState } from 'react';
import useLocalStorage from '../../helpers/local-storage/local-storage-hook';
import { useGetFilmsQuery } from '../../store/api/film.api';
import Loader from '@components/Loader/Loader';
import { Film } from '../../helpers/film.model';

interface SearchProps {
  searchResultsReceived: (results: Film[] | null, error: Error | null) => void;
}

const Search: React.FC<SearchProps> = ({
  searchResultsReceived,
}: SearchProps) => {
  const searchValueKey = 'searchValue';
  const [searchItem, setSearchItem] = useLocalStorage(searchValueKey, '');
  const [searchValue, setSearchValue] = useState(searchItem || '');
  const { isFetching, isError, data } = useGetFilmsQuery(searchValue);

  useEffect(() => {
    setSearchItem(searchValue);
  }, [searchValue]);

  useEffect((): void => {
    searchResultsReceived(null, new Error('No results found'));
  }, [isError]);

  useEffect((): void => {
    searchResultsReceived(data || null, null);
  }, [data]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchValue(event.target.value);
  };

  return (
    <>
      {/* eslint-disable-next-line react/jsx-no-undef */}
      {isFetching && <Loader></Loader>}
      <div>
        <input
          className={'search-input'}
          type="text"
          placeholder="Enter text here"
          value={searchValue}
          onChange={handleInputChange}
        />
      </div>
    </>
  );
};

export default Search;
