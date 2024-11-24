import { handleError } from './handler/errorHandler';

import { Header } from '../src/components/Header/index'
import { MovieSection } from '../src/components/MoviesSection/index';

export const App = {
  async initial() {
    try {
      // this.render();
      await MovieSection.loadInitialMovies();
      this.setEvent();
    } catch (error) {
      handleError(error, '영화를 로드 중 오류 발생');
    }
  },

  setEvent() {
    Header.setEvent();
    MovieSection.setEvent();
  },

  render() {
    document.body.innerHTML = `
    ${Header.template()}
    ${MovieSection.template()}
    `;
  },
};


App.initial();
