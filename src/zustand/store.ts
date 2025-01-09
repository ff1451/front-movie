import { create } from "zustand";

interface AppState {
  page: number;
  query: string;
  isSearching: boolean;
  isLoading: boolean;
  hasResults: boolean;
  movieLength: number;
}

interface AppAction {
  setPage: (page: number) => void;
  setQuery: (query: string) => void;
  setIsSearching: (isSearching: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setHasResults: (data: any[]) => void;
  setMovieLength: (movieLength: number) => void;
}

const useStore = create<AppState & AppAction>((set) => ({
  page: 1,
  query: "",
  isSearching: false,
  isLoading: false,
  hasResults: true,
  movieLength: 0,

  setPage: (page) => set({ page }),
  setQuery: (query) => set({ query }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setIsSearching: (isSearching) => set({ isSearching }),
  setHasResults: (data) => {
    const hasResults = data.length > 0;
    set({ hasResults });
  },
  setMovieLength: (movieLength) => set({ movieLength }),
}));

export default useStore;
