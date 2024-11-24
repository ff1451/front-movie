import { resetState } from '../../state/state';
import { search } from './Search';
import { loadPopularMovies } from '../../elements/loadMovies';
import './header.css';

export const header = {
  template() {
    return `
    <header>
      <h1 id="logo"></h1>
      ${search.template()}
    </header>
    `;
  },

  setEvent() {
    const logo = document.getElementById('logo')!;
    logo.addEventListener('click', () => {
      resetState();
      loadPopularMovies();
    });
  }
}