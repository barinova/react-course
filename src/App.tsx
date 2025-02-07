import './App.css';
import Header from './components/Header.tsx';
import Search from './components/Search/Search.tsx';
import Result from './components/Results/Result.tsx';
import { useState } from 'react';
import { Film } from './helpers/film.model.ts';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import Button from './components/Button/Button.tsx';

const App: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Film[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const searchResultsReceived = (results: Film[], error: Error | null) => {
    setSearchResults(results);
    setError(error);
  };

  const triggerError = (): void => {
    setError(new Error('Triggered error'));
  };

  return (
    <ErrorBoundary>
      <Header />
      <main>
        <Search searchResultsReceived={searchResultsReceived} />
        <Result searchResults={searchResults} error={error} />
      </main>
      <div className={'trigger-button'}>
        <Button onButtonClick={triggerError} text={'Trigger Error'} />
      </div>
    </ErrorBoundary>
  );
};

export default App;
