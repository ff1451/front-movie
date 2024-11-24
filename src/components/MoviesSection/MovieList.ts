import { Movie } from "../../types/movie";
import { IMAGE_URL } from "../../constants";
import { getPopularMovies } from "../../apis/getPopularMovies";
import { Button } from "./Button";
import { handleError } from "../../handler/errorHandler";
import { PageTitle } from "./PageTitle";

export const MovieList = {
  movieContainer: document.getElementById('movie-list')!,
  
  template() {
    return `<ul id="movie-list"></ul>`;
  },

  loadMovies(movies: Movie[]) {
    movies.forEach((movie) => {
      const movieInfo = document.createElement('li');
      movieInfo.classList.add('movie');

      movieInfo.innerHTML = `
        <div class="movie-image">
          <img src="${IMAGE_URL}${movie.poster_path}" alt="${movie.title}" />
        </div>
        <div class="movie-title">${movie.title}</div>
        <div class="movie-rate">${movie.vote_average.toFixed(1)}<span class="star-icon"></span></div>
      `;

      this.movieContainer.appendChild(movieInfo);
    });
  },

  loadSkeletonUI(count: number) {
    for (let i = 0; i < count; i++) {
      const skeletonElement = document.createElement('li');
      skeletonElement.classList.add('movie', 'skeleton');
  
      skeletonElement.innerHTML = `
        <div class="skeleton-image"></div>
        <div class="skeleton-title"></div>
        <div class="skeleton-rate"></div>
      `;
  
      this.movieContainer.appendChild(skeletonElement);
    }
  },

  async loadPopularMovies() {
    try {
      PageTitle.updatePageTitle();
      this.clearMovies();
      this.loadSkeletonUI(8);
  
      const movies = await getPopularMovies();
      this.clearSkeleton();
      this.loadMovies(movies);
      Button.toggleLoadMoreButton(movies.length);
    } catch (error) {
      handleError(error, '홈화면 오류 발생');
      this.clearSkeleton();
    }
  },

  clearMovies() {
    this.movieContainer.innerHTML = '';
  },

  clearSkeleton() {
    const skeletons = document.querySelectorAll('.skeleton');
    skeletons.forEach((skeleton) => skeleton.remove());
  }
}
