import { loadMoreMovies} from '../elements/button';

const loadMoreButton = document.getElementById('more') as HTMLButtonElement;

export function moreButton() {
  loadMoreButton.addEventListener('click', async () => {
    loadMoreMovies();
  });
}
