import { logoEvent } from './handler/displayEvent';
import { searchEvent } from './handler/searchEvent';
import { moreButton } from './handler/moreButtonEvent';
import { handleError } from './handler/errorHandler';
import { loadInitialMovies } from './handler/init';


async function initial() {
  try {
    loadInitialMovies();
    searchEvent();
    moreButton();
    logoEvent();
  } catch (error) {
    handleError(error, '영화를 로드 중 오류 발생');
  }
}

initial();

