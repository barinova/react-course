import './Pagination.css';
import Button from '../Button/Button.tsx';

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
      <Button
        text={'Previous'}
        disabled={currentPage === 1}
        onButtonClick={handlePreviousPage}
      ></Button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <Button
        text={'Next'}
        disabled={currentPage === totalPages}
        onButtonClick={handleNextPage}
      ></Button>
    </div>
  );
};

export default Pagination;
