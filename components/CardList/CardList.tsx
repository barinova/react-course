import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { Film } from '../../helpers/film.model';
import Details from '@components/Details/Details';
import Pagination from '@components/Pagination/Pagination';
import Card from '@components/Card/Card';
import './CardList.css';

interface ResultProps {
  searchResults: Film[];
  error: Error | null;
}

const CardList: React.FC<ResultProps> = ({ searchResults }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const displayedResultsPerPage = 5;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentDisplayedResults, setCurrentDisplayedResults] = useState<
    Film[]
  >([]);
  const [selectedItemUrl, setSelectedItemUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!searchResults) {
      return;
    }

    const params = new URLSearchParams(router.asPath.split('?')[1]);
    const pageParam = Number(params.get('page')) || 1;
    const detailsParam = params.get('details');

    const totalPagesLength = Math.ceil(
      searchResults.length / displayedResultsPerPage
    );
    setTotalPages(totalPagesLength);

    if (pageParam > totalPagesLength) {
      updateURLParam('page', '1');
      setCurrentPage(1);
    } else {
      updateURLParam('page', pageParam.toString());
      setCurrentPage(pageParam);
    }

    if (detailsParam) {
      const selectedItemId = Number(detailsParam);

      if (!isNaN(selectedItemId) && searchResults[selectedItemId]) {
        updateURLParam('details', selectedItemId.toString());
        setSelectedItemUrl(searchResults[selectedItemId].url);
      } else {
        closeDetails();
      }
    }
  }, [searchResults]);

  useEffect(() => {
    updateDisplayedResults(currentPage);
  }, [currentPage, searchResults]);

  const handlePageChange = (newPage: number): void => {
    setCurrentPage(newPage);
    updateURLParam('page', newPage.toString());
    updateDisplayedResults(newPage);
  };

  const handleItemClick = (item: Film, index: number): void => {
    setSelectedItemUrl(item.url);
    updateURLParam('details', index.toString());
  };

  const closeDetails = (): void => {
    setSelectedItemUrl(null);
    removeURLParam('details');
  };

  const updateDisplayedResults = (currentPage: number): void => {
    if (!searchResults) {
      return;
    }

    const startIndex = (currentPage - 1) * displayedResultsPerPage;
    const endIndex = startIndex + displayedResultsPerPage;
    setCurrentDisplayedResults(searchResults.slice(startIndex, endIndex));
    console.log('Current displayed results:', currentDisplayedResults);
  };

  const getLastUrlSegment = (url: string): string => {
    try {
      return new URL(url).pathname.split('/').filter(Boolean).pop() || '';
    } catch {
      return '';
    }
  };

  const updateURLParam = (key: string, value: string): void => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    router.push(`?${params.toString()}`);
  };

  const removeURLParam = (key: string): void => {
    const params = new URLSearchParams(searchParams);
    params.delete(key);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="results-container">
      <section className="results">
        {searchResults?.length > 0 ? (
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

      {selectedItemUrl && (
        <section>
          <div className="details-container">
            <Details
              itemId={getLastUrlSegment(selectedItemUrl)}
              onCloseDetails={closeDetails}
            />
          </div>
        </section>
      )}
    </div>
  );
};

export default CardList;
