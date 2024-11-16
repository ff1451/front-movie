const titleElement = document.querySelector('#movie-container h2')!;

export function updatePageTitle(query?: string, hasResults: boolean = true) {
  if (!hasResults) {
    titleElement.textContent = '검색 결과가 없습니다.';
  } else if (query) {
    titleElement.textContent = `"${query}" 검색 결과`;
  } else {
    titleElement.textContent = '지금 인기있는 영화';
  }
}
