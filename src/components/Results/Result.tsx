import { useEffect, useState } from 'react';
import { Film } from '../../helpers/film.model.ts';
import Pagination from '../Pagination/Pagination.tsx';
import './Results.css';
import { useParams } from 'react-router-dom';
import Details from '../Details/Details.tsx';

interface ResultProps {
  searchResults: Film[];
  error: Error | null;
}

const Result: React.FC<ResultProps> = ({ searchResults }: ResultProps) => {
  const { page, details } = useParams();
  const displayedResultsPerPage = 5;

  const [currentPage, setCurrentPage] = useState(Number(page) || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentDisplayedResults, setCurrentDisplayedResults] = useState<
    Film[]
  >([]);

  useEffect(() => {
    setTotalPages(Math.ceil(searchResults.length / displayedResultsPerPage));
  }, [searchResults]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    } else {
      handlePageChange(currentPage);
    }
  }, [currentPage, searchResults, totalPages]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage); // Update current page
    const startIndex = (newPage - 1) * displayedResultsPerPage;
    const endIndex = startIndex + displayedResultsPerPage;
    setCurrentDisplayedResults(searchResults.slice(startIndex, endIndex));
  };

  return (
    <div className="results">
      <h3 className="results-header">Results</h3>
      <section>
        {searchResults.length > 0 ? (
          <table className="result-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {currentDisplayedResults.map((result, index) => (
                <tr key={index}>
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
      </section>

      {details && (
        <section>
          <Details />
        </section>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Result;
