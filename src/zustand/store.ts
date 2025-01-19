import { create } from "zustand";

interface AppState {
  query: string;
  isSearching: boolean;
}

interface AppAction {
  setQuery: (query: string) => void;
  setIsSearching: (isSearching: boolean) => void;
}

const useStore = create<AppState & AppAction>((set) => ({
  query: "",
  isSearching: false,

  setQuery: (query) => set({ query }),
  setIsSearching: (isSearching) => set({ isSearching }),
}));

export default useStore;
