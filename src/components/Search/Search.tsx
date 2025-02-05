import './Search.css';
import { Component } from 'react';
import { fetchFilms } from '../../helpers/films-api.ts';
import { Film, FilmsResponse } from '../../helpers/film.model.ts';
import Button from '../Button/Button.tsx';

interface SearchProps {
  searchResultsReceived: (results: Film[]) => void;
}

interface SearchState {
  searchValue: string;
  showLoader: boolean;
}

export default class Search extends Component<SearchProps, SearchState> {
  private readonly searchValueKey = 'searchValue';

  constructor(props: SearchProps) {
    super(props);
    this.state = {
      searchValue: localStorage.getItem(this.searchValueKey) || '',
      showLoader: false,
    };
  }

  componentDidMount(): void {
    if (this.state.searchValue) {
      this.searchResults();
    }
  }

  componentDidUpdate(prevProps: SearchProps, prevState: SearchState): void {
    if (prevState.searchValue !== this.state.searchValue) {
      localStorage.setItem(this.searchValueKey, this.state.searchValue);
    }
  }

  searchResults = async () => {
    this.showLoader();
    const response: FilmsResponse = await fetchFilms(this.state.searchValue);
    this.props.searchResultsReceived(response.results);
    this.hideLoader();
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchValue: event.target.value });
  };

  private showLoader() {
    this.setState({ showLoader: true });
  }

  private hideLoader() {
    this.setState({ showLoader: false });
  }
  render() {
    return (
      <>
        {this.state.showLoader && (
          <div className={'loader-overlay'}>
            <div className={'loader'}></div>
          </div>
        )}
        <div>
          <input
            className={'search-input'}
            type="text"
            placeholder="Enter text here"
            value={this.state.searchValue}
            onChange={this.handleInputChange}
          />
          <Button onButtonClick={this.searchResults} text="Search here" />
        </div>
      </>
    );
  }
}
