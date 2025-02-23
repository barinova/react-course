import { useEffect, useState } from 'react';
import { Film } from '../../helpers/film.model.ts';
import Pagination from '../Pagination/Pagination.tsx';
import './CardList.css';
import { useSearchParams } from 'react-router-dom';
import Details from '../Details/Details.tsx';
import Button from '../Button/Button.tsx';
import Card from '../Card/Card.tsx';
import Flyout from '../Flyout/Flyout.tsx';

interface ResultProps {
  searchResults: Film[];
  error: Error | null;
}

const CardList: React.FC<ResultProps> = ({ searchResults }: ResultProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get('page') || '1';
  const displayedResultsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(Number(pageParam));
  const [totalPages, setTotalPages] = useState(0);
  const [currentDisplayedResults, setCurrentDisplayedResults] = useState<
    Film[]
  >([]);
  const [selectedItemUrl, setSelectedItemUrl] = useState<string | null>(null);

  useEffect(() => {
    setTotalPages(Math.ceil(searchResults.length / displayedResultsPerPage));
    updateDisplayedResults(currentPage);
    setSelectedItemUrl(null);

    searchParams.delete('details');
  }, [searchResults]);

  useEffect((): void => {
    const urlPage = searchParams.get('page');

    if (totalPages && Number(urlPage) > totalPages) {
      setCurrentPage(1);
      setSearchParams({ page: currentPage.toString() });
    }
  }, [totalPages]);

  useEffect((): void => {
    handlePageChange(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage: number): void => {
    setCurrentPage(newPage);
    searchParams.set('page', newPage.toString());
    setSearchParams(searchParams);
    updateDisplayedResults(newPage);
  };

  const handleItemClick = (item: Film, index: number): void => {
    setSearchParams({ page: String(currentPage), details: String(index) });
    setSelectedItemUrl(item.url);
  };

  const closeDetails = (): void => {
    setSearchParams({ page: String(currentPage) });
    setSelectedItemUrl(null);
  };

  const updateDisplayedResults = (currentPage: number): void => {
    const startIndex = (currentPage - 1) * displayedResultsPerPage;
    const endIndex = startIndex + displayedResultsPerPage;
    setCurrentDisplayedResults(searchResults.slice(startIndex, endIndex));
  };

  return (
    <>
      <div className={'results-container'}>
        <section className="results">
          <h3 className="results-header">Results</h3>
          {searchResults.length > 0 ? (
            <div className="card-list">
              {currentDisplayedResults.map((result: Film, index: number) => (
                <Card
                  key={index}
                  film={result}
                  onClick={() => handleItemClick(result, index)}
                />
              ))}
            </div>
          ) : (
            <span className="results-empty">Empty search result</span>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages || 1}
            onPageChange={handlePageChange}
          />
        </section>
        <section>
          {selectedItemUrl && (
            <div className={'details-container'}>
              <Details itemUrl={selectedItemUrl} />
              <div className="details-close">
                <Button onButtonClick={closeDetails} text="Close Details" />
              </div>
            </div>
          )}
        </section>
      </div>

      <Flyout />
    </>
  );
};

export default CardList;
