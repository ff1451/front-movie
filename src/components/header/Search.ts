import { state } from '../../state/state';
import { searchMoviesByName } from '../../apis/searchMoviesByName';
import { MovieList } from '../MoviesSection/MovieList';
import { Button } from '../MoviesSection/Button';
import { handleError } from '../../handler/errorHandler';
import { PageTitle } from '../MoviesSection/PageTitle';

export const Search = {
  template() {
    return `
    <div class="search-container">
      <input class="search-bar" type="text" placeholder="검색" />
      <button class="search-button" type="submit"></button>
    </div>
    `;
  },

  searchInput: document.querySelector('.search-bar') as HTMLInputElement,
  searchButton: document.querySelector('.search-button') as HTMLButtonElement,
  
  setEvent() {
    this.searchButton.addEventListener('click', () => {
      this.searching();
    });

    this.searchInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        this.searching();
      }
    });
  },

  async searching() {
    state.currentQuery = this.searchInput.value.trim();

    if (state.currentQuery) {
      state.isSearching = true;
      state.currentPage = 1;
      MovieList.clearMovies();
      MovieList.loadSkeletonUI(8);

      try {
        const movies = await searchMoviesByName(state.currentQuery, state.currentPage);
        MovieList.clearSkeleton();

        if (movies.length === 0) {
          state.hasResults = false;
        } else {
          state.hasResults = true;
        }

        PageTitle.updatePageTitle(state.currentQuery, state.hasResults);

        MovieList.loadMovies(movies);
        Button.toggleLoadMoreButton(movies.length);
        this.searchInput.value = '';
      } catch (error) {
        handleError(error, '검색 중 오류 발생');
        MovieList.clearMovies();
      }
    }
  }
}
