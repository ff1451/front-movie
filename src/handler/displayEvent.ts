import { getPopularMovies } from '../apis/getPopularMovies';
import { clearMovies, loadMovies } from '../elements/loadMovies';
import { toggleLoadMoreButton } from '../elements/button';
import { resetState } from '../state/state';
import { updatePageTitle } from '../elements/updateTitle';
import { clearSkeleton, loadSkeletonUI } from '../elements/skeletonUI';
import { loadPopularMovies } from '../elements/loadMovies';

const logo = document.getElementById('logo')!;

export function logoEvent() {
  logo.addEventListener('click', () => {
    resetState();
    loadPopularMovies();
  });
}
