import './Search.css';
import { useEffect, useState } from 'react';
import { Film } from '../../helpers/film.model.ts';
import Loader from '../Loader/Loader.tsx';
import useLocalStorage from '../../helpers/local-storage/local-storage-hook.ts';
import { useGetFilmsQuery } from '../../store/api/film.api.ts';

interface SearchProps {
  searchResultsReceived: (results: Film[], error: Error | null) => void;
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
    console.log('searchValue', searchValue);
  }, [searchValue]);

  useEffect(() => {
    searchResultsReceived([], new Error('No results found'));
  }, [isError]);

  useEffect(() => {
    searchResultsReceived(data || [], null);
  }, [data]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <>
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
