import type { Movie } from '../types/movie';
import { IMAGE_URL } from '../constants';
import { loadSkeletonUI, clearSkeleton } from './skeletonUI';
import { getPopularMovies } from '../apis/getPopularMovies';
import { toggleLoadMoreButton } from './button';
import { updatePageTitle } from './updateTitle';
import { handleError } from '../handler/errorHandler';

const movieContainer = document.getElementById('movie-list')!;

export function loadMovies(movies: Movie[]): void {
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

    movieContainer.appendChild(movieInfo);
  });
}

export async function loadPopularMovies() {
  try {
    updatePageTitle();
    clearMovies();
    loadSkeletonUI(8);

    const movies = await getPopularMovies();
    clearSkeleton();
    loadMovies(movies);
    toggleLoadMoreButton(movies.length);
  } catch (error) {
    handleError(error, '홈화면 오류 발생');
    clearSkeleton();
  }
}

export function clearMovies() {
  movieContainer.innerHTML = '';
}
