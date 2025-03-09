import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

test('renders button with text and handles click', () => {
  const handleClick = jest.fn();
  render(<Button onButtonClick={handleClick} text="Click Me" />);

  const button = screen.getByRole('button', { name: /click me/i });
  expect(button).toBeInTheDocument();

  fireEvent.click(button);
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('displays small button', () => {
  render(<Button onButtonClick={() => {}} text="Click Me" small />);

  const button = screen.getByRole('button', { name: /click me/i });
  expect(button).toHaveClass('button-small');
});
