import { state } from '../../state/state';
import { searchMoviesByName } from '../../apis/searchMoviesByName';
import { MovieList } from './MovieList';
import { getPopularMovies } from '../../apis/getPopularMovies';
import { handleError } from '../../handler/errorHandler';

export const Button = {
  loadMoreButton: document.getElementById('more') as HTMLButtonElement,
  
  template () {
    return `
    <button id="more">더보기</button>
    `;
  },

  setEvent() {
    this.loadMoreButton.addEventListener('click', async () => {
      this.loadMoreMovies();
    });
  },

  async loadMoreMovies() {
    if (state.isLoading) return;

    state.isLoading = true;
    this.loadMoreButton.disabled = true;
    MovieList.loadSkeletonUI(8);
  
    state.currentPage++;
  
    try {
      let movies;
  
      if (state.isSearching && state.currentQuery) {
        movies = await searchMoviesByName(state.currentQuery, state.currentPage);
      } else {
        movies = await getPopularMovies(state.currentPage);
      }
  
      MovieList.clearSkeleton();
      MovieList.loadMovies(movies);
      this.toggleLoadMoreButton(movies.length);
    } catch (error) {
      handleError(error, '영화를 로드 중 오류 발생');
    } finally {
      state.isLoading = false;
      this.loadMoreButton.disabled = false;
    }
  },

  toggleLoadMoreButton(movieCount: number) {
    if (movieCount < 20) {
      this.loadMoreButton.style.display = 'none';
    } else {
      this.loadMoreButton.style.display = 'block';
    }
  }
}
