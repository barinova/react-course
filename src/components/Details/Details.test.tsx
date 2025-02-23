import { render } from '@testing-library/react';
import Details from '../Details/Details.tsx';
import { act } from 'react';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        title: 'Test Film',
        director: 'John Doe',
        producer: 'Jane Doe',
        release_date: '2024-01-01',
        opening_crawl: 'Test opening crawl',
      }),
  })
) as jest.Mock;

describe('Details Component', () => {
  test('shows loader while fetching results', async () => {
    let resolveFetch: (value: unknown) => void;
    global.fetch = jest.fn(
      () =>
        new Promise((resolve) => {
          resolveFetch = resolve;
        })
    ) as jest.Mock;

    await act(async () => {
      render(<Details itemUrl="https://api.example.com/film1" />);
    });

    expect(document.querySelector('.loader')).toBeTruthy();

    await act(async () => {
      resolveFetch({
        json: () =>
          Promise.resolve({
            title: 'Test Film',
            director: 'John Doe',
            producer: 'Jane Doe',
            release_date: '2024-01-01',
            opening_crawl: 'Test opening crawl',
          }),
      });
    });
  });

  test('displays all details about film correctly', async () => {
    let resolveFetch: (value: unknown) => void;
    global.fetch = jest.fn(
      () =>
        new Promise((resolve) => {
          resolveFetch = resolve;
        })
    ) as jest.Mock;

    await act(async () => {
      render(<Details itemUrl="https://api.example.com/film1" />);
    });

    await act(async () => {
      resolveFetch({
        json: () =>
          Promise.resolve({
            title: 'Test Film',
            director: 'John Doe',
            producer: 'Jane Doe',
            release_date: '2024-01-01',
            opening_crawl: 'Test opening crawl',
          }),
      });
    });

    expect(document.querySelector('body')?.textContent).not.toContain(
      'Loading...'
    );
    expect(document.querySelector('body')?.textContent).toContain('Test Film');
    expect(document.querySelector('body')?.textContent).toContain(
      'Director: John Doe'
    );
    expect(document.querySelector('body')?.textContent).toContain(
      'Producer: Jane Doe'
    );
    expect(document.querySelector('body')?.textContent).toContain(
      'Release date: 2024-01-01'
    );
    expect(document.querySelector('body')?.textContent).toContain(
      'Test opening crawl'
    );
  });
});
