import { MovieList } from '../MoviesSection/MovieList';
import { resetState } from '../../state/state';
import { Search } from './Search';
import './header.css';

export const Header = {
  template() {
    return `
    <header>
      <h1 id="logo"></h1>
      ${Search.template()}
    </header>
    `;
  },

  setEvent() {
    const logo = document.getElementById('logo')!;
    Search.setEvent();

    logo.addEventListener('click', () => {
      resetState();
      MovieList.loadPopularMovies();
    });
  }
}
