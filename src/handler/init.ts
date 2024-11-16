import { getPopularMovies } from '../apis/getPopularMovies';
import { loadMovies, clearMovies } from '../elements/loadMovies';
import { toggleLoadMoreButton } from '../elements/button';
import { handleError } from './errorHandler';
import { updatePageTitle } from '../elements/updateTitle';

export async function loadInitialMovies() {
  try {
    const movies = await getPopularMovies();
    clearMovies();
    updatePageTitle();
    loadMovies(movies);
    toggleLoadMoreButton(movies.length);
  } catch (error) {
    handleError(error, '영화 로드 중 오류');
  }
}

