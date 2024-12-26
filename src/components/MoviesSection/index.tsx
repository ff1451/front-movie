import { useRef } from "react";
import Button from "./Button";
import MovieList from "./MovieList";
import PageTitle from "./PageTitle";
import "./MovieSection.css";

interface MoviesSectionProps {
  appState: {
    page: number;
    query: string;
    isSearching: boolean;
    isLoading: boolean;
    hasResults: boolean;
  };
  appDispatch: {
    setPage: (page: number) => void;
    setQuery: (query: string) => void;
    setIsSearching: (isSearching: boolean) => void;
    setIsLoading: (isLoading: boolean) => void;
    setHasResults: (hasResults: boolean) => void;
  };
}

function MoviesSection({ appState, appDispatch }: MoviesSectionProps) {
  const prevQueryRef = useRef<string>("");
  const movieLengthRef = useRef<number>(0);

  return (
    <div id="movie-container">
      <PageTitle prevQueryRef={prevQueryRef.current} appState={appState} />
      <MovieList
        prevQueryRef={prevQueryRef}
        movieLengthRef={movieLengthRef}
        appState={appState}
        appDispatch={appDispatch}
      />
      <Button
        movieLengthRef={movieLengthRef.current}
        appState={appState}
        appDispatch={appDispatch}
      />
    </div>
  );
}

export default MoviesSection;
