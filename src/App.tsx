import './App.css';
import Header from './components/Header.tsx';
import Search from './components/Search/Search.tsx';
import Result from './components/Results/Result.tsx';
import { useState } from 'react';
import { Film } from './helpers/film.model.ts';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import Button from './components/Button/Button.tsx';
import NotFound from './components/NotFound.tsx';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import React from 'react';

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
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/search" />} />
            <Route
              path="/search"
              element={
                <div>
                  <Search searchResultsReceived={searchResultsReceived} />
                  <Result searchResults={searchResults} error={error} />
                </div>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <div className={'trigger-button'}>
            <Button onButtonClick={triggerError} text={'Trigger Error'} />
          </div>
        </BrowserRouter>
      </main>
    </ErrorBoundary>
  );
};

export default App;
