export const PageTitle = {
  titleElement: document.querySelector('#movie-container h2')!,

  template() {
    return `<h2>지금 인기있는 영화</h2>`;
  },

  updatePageTitle(query?: string, hasResults: boolean = true) {
    if (!hasResults) {
      this.titleElement.textContent = '검색 결과가 없습니다.';
    } else if (query) {
      this.titleElement.textContent = `"${query}" 검색 결과`;
    } else {
      this.titleElement.textContent = '지금 인기있는 영화';
    }
  }
}
