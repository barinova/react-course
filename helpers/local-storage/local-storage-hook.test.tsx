import { render, act } from '@testing-library/react';
import useLocalStorage from './local-storage-hook.ts';
import '@testing-library/jest-dom';

beforeEach(() => {
  localStorage.clear();

  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn(),
    },
    writable: true,
  });
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('useLocalStorage hook', () => {
  it('should return initialValue when there is no value in localStorage', () => {
    (localStorage.getItem as jest.Mock).mockReturnValue(null);

    const TestComponent = () => {
      const [value, setValue] = useLocalStorage('testKey', 'defaultValue');
      return (
        <div>
          <span>{value}</span>
          <button onClick={() => setValue('newValue')}>Set Value</button>
        </div>
      );
    };

    const { getByText } = render(<TestComponent />);

    expect(getByText('defaultValue')).toBeInTheDocument();
  });

  it('should get the value from localStorage if it exists', () => {
    (localStorage.getItem as jest.Mock).mockReturnValue(
      JSON.stringify('storedValue')
    );

    const TestComponent = () => {
      const [value] = useLocalStorage('testKey', 'defaultValue');
      return <span>{value}</span>;
    };

    const { getByText } = render(<TestComponent />);

    expect(getByText('storedValue')).toBeInTheDocument();
  });

  it('should update localStorage and state when the value is set', () => {
    (localStorage.getItem as jest.Mock).mockReturnValue(null);

    const TestComponent = () => {
      const [value, setValue] = useLocalStorage('testKey', 'defaultValue');
      return (
        <div>
          <span>{value}</span>
          <button onClick={() => setValue('newStoredValue')}>Set Value</button>
        </div>
      );
    };

    const { getByText } = render(<TestComponent />);

    expect(getByText('defaultValue')).toBeInTheDocument();

    act(() => {
      getByText('Set Value').click();
    });

    expect(getByText('newStoredValue')).toBeInTheDocument();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'testKey',
      JSON.stringify('newStoredValue')
    );
  });

  it('should handle errors when writing to localStorage', () => {
    (localStorage.setItem as jest.Mock).mockImplementation(() => {
      throw new Error('Error writing to localStorage');
    });

    const TestComponent = () => {
      const [value, setValue] = useLocalStorage('testKey', 'defaultValue');
      return (
        <div>
          <span>{value}</span>
          <button onClick={() => setValue('newValue')}>Set Value</button>
        </div>
      );
    };

    const { getByText } = render(<TestComponent />);

    act(() => {
      getByText('Set Value').click();
    });

    expect(getByText('newValue')).toBeInTheDocument();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'testKey',
      JSON.stringify('newValue')
    );
  });
});
