export const state = {
  currentPage: 1,
  currentQuery: '',
  isSearching: false,
  isLoading: false,
  hasResults: true,
};

export function resetState() {
  state.currentPage = 1;
  state.currentQuery = '';
  state.isSearching = false;
  state.isLoading = false;
  state.hasResults = true;
}
