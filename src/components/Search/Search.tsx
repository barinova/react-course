import './Search.css';
import { useEffect, useState } from 'react';
import { fetchFilms } from '../../helpers/films-api.ts';
import { Film, FilmsResponse } from '../../helpers/film.model.ts';
import Button from '../Button/Button.tsx';
import Loader from '../Loader/Loader.tsx';
import useLocalStorage from '../../helpers/local-storage/local-storage-hook.ts';

interface SearchProps {
  searchResultsReceived: (results: Film[], error: Error | null) => void;
}

const Search: React.FC<SearchProps> = ({
  searchResultsReceived,
}: SearchProps) => {
  const searchValueKey = 'searchValue';
  const [searchItem, setSearchItem] = useLocalStorage(searchValueKey, '');
  const [searchValue, setSearchValue] = useState(searchItem || '');
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    setSearchItem(searchValue);
    searchResults();
  }, [searchValue]);

  const searchResults = async () => {
    setShowLoader(true);
    const response: FilmsResponse = await fetchFilms(searchValue);

    if (response?.results) {
      searchResultsReceived(response.results, null);
    } else {
      searchResultsReceived([], new Error('No results found'));
    }

    setShowLoader(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <>
      {showLoader && <Loader></Loader>}
      <div>
        <input
          className={'search-input'}
          type="text"
          placeholder="Enter text here"
          value={searchValue}
          onChange={handleInputChange}
        />
        <Button onButtonClick={searchResults} text="Search here" />
      </div>
    </>
  );
};

export default Search;
