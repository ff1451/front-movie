import { searching } from '../elements/search';

const searchInput = document.querySelector('.search-bar') as HTMLInputElement;
const searchButton = document.querySelector('.search-button') as HTMLButtonElement;

export function searchEvent() {

  searchButton.addEventListener('click', () => {
    searching();
  });

  searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      searching();
    }
  });
}
