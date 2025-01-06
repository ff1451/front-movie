import { createContext, ReactNode, useContext, useState } from "react";

interface AppState {
  page: number;
  query: string;
  isSearching: boolean;
  isLoading: boolean;
  hasResults: boolean;
  movieLength: number;
}

const initialState: AppState = {
  page: 1,
  query: "",
  isSearching: false,
  isLoading: false,
  hasResults: true,
  movieLength: 0,
};

const initialAction = {
  setPage: (page: number) => {},
  setQuery: (query: string) => {},
  setSearchingTrue: () => {},
  setSearchingFalse: () => {},
  setLoadingTrue: () => {},
  setLoadingFalse: () => {},
  setHasResults: (data: any[]) => {},
  setMovieLength: (movieLength: number) => {},
};

const AppStateContext = createContext<AppState>(initialState);
const AppDispatchContext = createContext(initialAction);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>(initialState);

  const actions = {
    setPage: (page: number) => setState((prev) => ({ ...prev, page })),
    setQuery: (query: string) => setState((prev) => ({ ...prev, query })),
    setSearchingTrue: () =>
      setState((prev) => ({ ...prev, isSearching: true })),
    setSearchingFalse: () =>
      setState((prev) => ({ ...prev, isSearching: false })),
    setLoadingTrue: () => setState((prev) => ({ ...prev, isLoading: true })),
    setLoadingFalse: () => setState((prev) => ({ ...prev, isLoading: false })),
    setHasResults: (data: any[]) =>
      setState((prev) => ({ ...prev, hasResults: data.length > 0 })),
    setMovieLength: (movieLength: number) =>
      setState((prev) => ({ ...prev, movieLength })),
  };

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={actions}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  return context;
};

export const useAppDispatch = () => {
  const context = useContext(AppDispatchContext);
  return context;
};
