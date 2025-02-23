import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from './Pagination.tsx';

describe('Pagination Component', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 5,
    onPageChange: jest.fn(),
  };

  test('renders pagination component', () => {
    const { container } = render(<Pagination {...defaultProps} />);
    expect(container.querySelector('.pagination')).toBeTruthy();
  });

  test('pagination has correct number of pages', () => {
    const { container } = render(<Pagination {...defaultProps} />);
    const pageElements = container.querySelector('span');
    expect(pageElements?.innerHTML).toBe('Page 1 of 5');
  });

  test('handleNextPage triggered by Next clicked', () => {
    const { container } = render(<Pagination {...defaultProps} />);
    const nextButton = container.querySelector('button:last-of-type');
    expect(nextButton).toBeTruthy();

    if (!nextButton) {
      return;
    }

    fireEvent.click(nextButton);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
  });

  test('handlePreviousPage triggered by Previous clicked', () => {
    const props = { ...defaultProps, currentPage: 2 };
    const { container } = render(<Pagination {...props} />);
    const previousButton = container.querySelector('button:first-of-type');
    expect(previousButton).toBeTruthy();

    if (!previousButton) {
      return;
    }

    fireEvent.click(previousButton);
    expect(props.onPageChange).toHaveBeenCalledWith(1);
  });

  test('Previous button disabled when user on the 1st page', () => {
    const { container } = render(<Pagination {...defaultProps} />);
    const previousButton = container.querySelector('button:first-of-type');
    expect(previousButton).toBeDisabled();
  });

  test('Next button disabled if user on last page', () => {
    const props = { ...defaultProps, currentPage: 5 };
    const { container } = render(<Pagination {...props} />);
    const nextButton = container.querySelector('button:last-of-type');
    expect(nextButton).toBeDisabled();
  });
});
