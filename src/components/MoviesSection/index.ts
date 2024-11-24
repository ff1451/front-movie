import './MovieSection.css';
import { Button } from './Button';
import { MovieList } from './MovieList';
import { getPopularMovies } from '../../apis/getPopularMovies';
import { handleError } from '../../handler/errorHandler';
import { PageTitle } from './PageTitle';

export const MovieSection = {
  template() {
    return `
    <div id="movie-container">
      ${PageTitle.template()}
      ${MovieList.template()}
      ${Button.template()}
    </div>
    `;
  },

  async loadInitialMovies() {
    try {
      const movies = await getPopularMovies();
      MovieList.clearMovies();
      PageTitle.updatePageTitle();
      MovieList.loadMovies(movies);
      Button.toggleLoadMoreButton(movies.length);
    } catch (error) {
      handleError(error, '영화 로드 중 오류');
    }
  },

  setEvent() {
    Button.setEvent();
  }
};
