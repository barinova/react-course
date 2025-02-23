import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const handleNextPage = () => onPageChange(currentPage + 1);
  const handlePreviousPage = () => onPageChange(currentPage - 1);

  return (
    <div className="pagination">
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button disabled={currentPage === totalPages} onClick={handleNextPage}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
