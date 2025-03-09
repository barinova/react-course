import { render } from '@testing-library/react';
import Loader from './Loader.tsx';

describe('Loader Component', () => {
  test('renders loader component', () => {
    const { container } = render(<Loader />);
    expect(container.querySelector('.loader')).toBeTruthy();
  });
});
