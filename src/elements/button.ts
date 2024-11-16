import { state } from '../state/state';
import { getPopularMovies } from '../apis/getPopularMovies';
import { searchMoviesByName } from '../apis/searchMoviesByName';
import { loadSkeletonUI, clearSkeleton } from '../elements/skeletonUI';
import { loadMovies } from '../elements/loadMovies';
import { handleError } from '../handler/errorHandler';

const loadMoreButton = document.getElementById('more') as HTMLButtonElement;

export async function loadMoreMovies() {
  if (state.isLoading) return;

  state.isLoading = true;
  loadMoreButton.disabled = true;
  loadSkeletonUI(8);

  state.currentPage++;

  try {
    let movies;

    if (state.isSearching && state.currentQuery) {
      movies = await searchMoviesByName(state.currentQuery, state.currentPage);
    } else {
      movies = await getPopularMovies(state.currentPage);
    }

    clearSkeleton();
    loadMovies(movies);
    toggleLoadMoreButton(movies.length);
  } catch (error) {
    handleError(error, '영화를 로드 중 오류 발생');
  } finally {
    state.isLoading = false;
    loadMoreButton.disabled = false;
  }
}


export function toggleLoadMoreButton(movieCount: number) {
  if (movieCount < 20) {
    loadMoreButton.style.display = 'none';
  } else {
    loadMoreButton.style.display = 'block';
  }
}
