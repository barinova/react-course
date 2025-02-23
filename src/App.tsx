import './App.css';
import Search from './components/Search/Search.tsx';
import CardList from './components/CardList/CardList.tsx';
import { useState } from 'react';
import { Film } from './helpers/film.model.ts';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import Button from './components/Button/Button.tsx';
import NotFound from './components/NotFound.tsx';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import React from 'react';
import { useTheme } from './components/ThemeSwitcher/ThemeContext.tsx';

const App: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Film[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const { isDarkTheme, themeSwitchHandler } = useTheme();

  const searchResultsReceived = (results: Film[], error: Error | null) => {
    setSearchResults(results);
    setError(error);
  };

  const triggerError = (): void => {
    setError(new Error('Triggered error'));
  };

  return (
    <ErrorBoundary>
      <div className={`app ${isDarkTheme ? 'dark' : 'light'}`}>
        <header className={'app-header'}>
          <h1>Films</h1>
          <Button
            text={`${isDarkTheme ? 'Light' : 'Dark'} Theme`}
            onButtonClick={themeSwitchHandler}
          ></Button>
        </header>
        <main>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/search" />} />
              <Route
                path="/search"
                element={
                  <div>
                    <Search searchResultsReceived={searchResultsReceived} />
                    <CardList searchResults={searchResults} error={error} />
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
      </div>
    </ErrorBoundary>
  );
};

export default App;
