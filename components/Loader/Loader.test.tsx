import { render } from '@testing-library/react';
import Loader from '@components/Loader/Loader';

describe('Loader Component', () => {
  test('renders loader component', () => {
    const { container } = render(<Loader />);
    expect(container.querySelector('.loader')).toBeTruthy();
  });
});
