import { searchMoviesByName } from '../apis/searchMoviesByName';
import { loadMovies, clearMovies } from '../elements/loadMovies';
import { toggleLoadMoreButton } from '../elements/button';
import { clearSkeleton, loadSkeletonUI } from '../elements/skeletonUI';
import { updatePageTitle } from '../elements/updateTitle';
import { state } from '../state/state';
import { handleError } from '../handler/errorHandler';

const searchInput = document.querySelector('.search-bar') as HTMLInputElement;

export async function searching() {
  state.currentQuery = searchInput.value.trim();

  if (state.currentQuery) {
    state.isSearching = true;
    state.currentPage = 1;
    clearMovies();
    loadSkeletonUI(8);

    try {
      const movies = await searchMoviesByName(state.currentQuery, state.currentPage);
      clearSkeleton();

      if (movies.length === 0) {
        state.hasResults = false;
      } else {
        state.hasResults = true;
      }

      updatePageTitle(state.currentQuery, state.hasResults);

      loadMovies(movies);
      toggleLoadMoreButton(movies.length);
      searchInput.value = '';
    } catch (error) {
      handleError(error, '검색 중 오류 발생');
      clearMovies();
    }
  }
}
