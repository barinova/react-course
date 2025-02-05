import { Component } from 'react';
import { Film } from '../../helpers/film.model.ts';
import './Results.css';

interface ResultProps {
  searchResults: Film[];
  error: Error | null;
}

export default class Result extends Component<ResultProps> {
  render() {
    const { searchResults, error } = this.props;

    if (error) {
      return <h3 className={'error'}>Error: {error.message}</h3>;
    }

    return (
      <div className={'results'}>
        <h3 className={'results-header'}>Results</h3>
        {searchResults?.length ? (
          <table className={'result-table'}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((result, index) => (
                <tr key={index}>
                  <td>{result.title}</td>
                  <td className={'results-description'}>
                    <span>Director: {result.director}</span>
                    <span>Producer: {result.producer}</span>
                    <span>Release date: {result.release_date}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <span className={'results-empty'}>Empty search result</span>
        )}
      </div>
    );
  }
}
