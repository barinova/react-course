import './Search.css';
import { useEffect, useState } from 'react';
import { fetchFilms } from '../../helpers/films-api.ts';
import { Film, FilmsResponse } from '../../helpers/film.model.ts';
import Button from '../Button/Button.tsx';

interface SearchProps {
  searchResultsReceived: (results: Film[], error: Error | null) => void;
}

const Search: React.FC<SearchProps> = ({
  searchResultsReceived,
}: SearchProps) => {
  const searchValueKey = 'searchValue';
  const [searchValue, setSearchValue] = useState(
    localStorage.getItem(searchValueKey) || ''
  );
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (searchValue) {
      searchResults();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(searchValueKey, searchValue);
  }, [searchValue]);

  const searchResults = async () => {
    setShowLoader(true);
    const response: FilmsResponse = await fetchFilms(searchValue);
    searchResultsReceived(response.results, null);
    setShowLoader(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <>
      {showLoader && (
        <div className={'loader-overlay'}>
          <div className={'loader'}></div>
        </div>
      )}
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
