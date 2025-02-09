import { useEffect, useState } from 'react';
import { Film } from '../../helpers/film.model.ts';
import Pagination from '../Pagination/Pagination.tsx';
import './Results.css';
import { useSearchParams } from 'react-router-dom';
import Details from '../Details/Details.tsx';
import Button from '../Button/Button.tsx';
import Loader from '../Loader/Loader.tsx';

interface ResultProps {
  searchResults: Film[];
  error: Error | null;
}

const Result: React.FC<ResultProps> = ({ searchResults }: ResultProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get('page') || '1';
  const detailsParam = searchParams.get('details');

  const displayedResultsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(Number(pageParam));
  const [totalPages, setTotalPages] = useState(1);
  const [currentDisplayedResults, setCurrentDisplayedResults] = useState<
    Film[]
  >([]);
  const [selectedItem, setSelectedItem] = useState<Film | null>(null);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    setTotalPages(Math.ceil(searchResults.length / displayedResultsPerPage));
  }, [searchResults]);

  useEffect(() => {
    handlePageChange(currentPage);
  }, [currentPage, searchResults]);

  useEffect(() => {
    if (!detailsParam) {
      setSelectedItem(null); // Ensure details are cleared if there is no details param
      return;
    }

    const index = Number(detailsParam);
    const item =
      searchResults[(currentPage - 1) * displayedResultsPerPage + index];

    if (item) {
      fetchItemDetails(item);
    } else {
      setSelectedItem(null);
    }
  }, [detailsParam, searchResults]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setSearchParams({ page: newPage.toString() });

    const startIndex = (newPage - 1) * displayedResultsPerPage;
    const endIndex = startIndex + displayedResultsPerPage;
    setCurrentDisplayedResults(searchResults.slice(startIndex, endIndex));
  };

  const fetchItemDetails = async (item: Film) => {
    setShowLoader(true);
    try {
      const response = await fetch(item.url);
      const data = await response.json();
      setSelectedItem(data);
    } catch (error) {
      throw Error(`Error while fetching details: ${error}`);
    } finally {
      setShowLoader(false);
    }
  };

  const handleItemClick = (index: number) => {
    setSearchParams({ page: String(currentPage), details: String(index) });
  };

  const closeDetails = () => {
    setSearchParams({ page: String(currentPage) });
  };

  return (
    <div className={'results-container'}>
      <section className="results">
        <h3 className="results-header">Results</h3>
        {searchResults.length > 0 ? (
          <table className="result-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {currentDisplayedResults.map((result: Film, index: number) => (
                <tr key={index} onClick={() => handleItemClick(index)}>
                  <td>{result.title}</td>
                  <td className="results-description">
                    <span>Director: {result.director}</span>
                    <span>Producer: {result.producer}</span>
                    <span>Release date: {result.release_date}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
        {showLoader && <Loader></Loader>}

        {selectedItem && <h1>Test {selectedItem.title}</h1>}
        {selectedItem && (
          <div>
            <Button onButtonClick={closeDetails} text="Close Details" />
            <Details item={selectedItem} />
          </div>
        )}
      </section>
    </div>
  );
};

export default Result;
