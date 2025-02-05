import './App.css';
import Header from './components/Header.tsx';
import Search from './components/Search/Search.tsx';
import Result from './components/Results/Result.tsx';
import { Component } from 'react';
import { Film } from './helpers/film.model.ts';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import Button from './components/Button/Button.tsx';

interface AppState {
  searchResults: Film[];
  error: Error | string;
}

export default class App extends Component<object, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      error: null,
    };
  }

  searchResultsReceived = (results: Film[], error: string) => {
    console.log(results);
    this.setState({ searchResults: results, error });
  };

  triggerError = (): void => {
    this.setState({ error: new Error('Triggered error') });
  };

  render() {
    return (
      <ErrorBoundary>
        <Header />
        <main>
          <Search searchResultsReceived={this.searchResultsReceived} />
          <Result
            searchResults={this.state.searchResults}
            error={this.state.error}
          />
        </main>
        <div className={'trigger-button'}>
          <Button onButtonClick={this.triggerError} text={'Trigger Error'} />
        </div>
      </ErrorBoundary>
    );
  }
}
