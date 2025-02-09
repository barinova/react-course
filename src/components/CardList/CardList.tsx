import { useEffect, useState } from 'react';
import { Film } from '../../helpers/film.model.ts';
import Pagination from '../Pagination/Pagination.tsx';
import './CardList.css';
import { useSearchParams } from 'react-router-dom';
import Details from '../Details/Details.tsx';
import Button from '../Button/Button.tsx';
import Card from '../Card/Card.tsx';

interface ResultProps {
  searchResults: Film[];
  error: Error | null;
}

const CardList: React.FC<ResultProps> = ({ searchResults }: ResultProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get('page') || '1';
  const detailsParam = searchParams.get('details');

  const displayedResultsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(Number(pageParam));
  const [totalPages, setTotalPages] = useState(1);
  const [currentDisplayedResults, setCurrentDisplayedResults] = useState<
    Film[]
  >([]);
  const [selectedItemUrl, setSelectedItemUrl] = useState<string | null>(null);

  useEffect(() => {
    setTotalPages(Math.ceil(searchResults.length / displayedResultsPerPage));
  }, [searchResults]);

  useEffect(() => {
    handlePageChange(currentPage);
  }, [currentPage, searchResults]);

  useEffect(() => {
    if (!detailsParam) {
      setSelectedItemUrl(null);
      return;
    }

    const index = Number(detailsParam);
    const item =
      searchResults[(currentPage - 1) * displayedResultsPerPage + index];
    if (item) {
      console.log('TETS1');
      setSelectedItemUrl(item.url);
    } else {
      setSelectedItemUrl(null);
      console.log('TETS2');
    }
  }, [detailsParam, searchResults, currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setSearchParams({ page: newPage.toString() });

    const startIndex = (newPage - 1) * displayedResultsPerPage;
    const endIndex = startIndex + displayedResultsPerPage;
    setCurrentDisplayedResults(searchResults.slice(startIndex, endIndex));
  };

  const handleItemClick = (item: Film, index: number): void => {
    setSearchParams({ page: String(currentPage), details: String(index) });
    setSelectedItemUrl(item.url);
  };

  const closeDetails = (): void => {
    setSearchParams({ page: String(currentPage) });
    setSelectedItemUrl(null);
  };

  return (
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
  );
};

export default CardList;
