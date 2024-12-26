import React, { useState, useEffect } from "react";
import { IMAGE_URL } from "../../constants";
import { getPopularMovies } from "../../apis/getPopularMovies";
import { Movie } from "../../types/movie";
import { searchMoviesByName } from "../../apis/searchMoviesByName";

interface MovieListProps {
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
  prevQueryRef: React.MutableRefObject<string>;
  movieLengthRef: React.MutableRefObject<number>;
}

function MovieList({
  appState,
  appDispatch,
  prevQueryRef,
  movieLengthRef,
}: MovieListProps) {
  const [movies, setMovies] = useState<Movie[]>([]);

  // useEffect(() => {
  //   setMovies([]);
  //   loadMovies();
  // }, []);

  useEffect(() => {
    if (appState.page >= 1) {
      loadMovies();
    }
  }, [appState.page]);

  useEffect(() => {
    if (appState.isSearching) {
      setMovies([]);
      loadMovies();
      // appDispatch.setIsSearching(false);
    }
  }, [appState.isSearching, appState.query]);

  const loadMovies = async () => {
    appDispatch.setIsLoading(true);
    if (!appState.isSearching) {
      const Movies = await getPopularMovies(appState.page);
      setMovies((prevMovies) => [...prevMovies, ...Movies]);
      console.log("Movies:", Movies);
      appDispatch.setHasResults(Movies.length > 0);
      movieLengthRef.current = Movies.length;
    } else {
      const Movies = await searchMoviesByName(appState.query, appState.page);
      setMovies((prevMovies) => [...prevMovies, ...Movies]);
      prevQueryRef.current = appState.query;
      movieLengthRef.current = Movies.length;
      // appDispatch.setIsSearching(false);
      appDispatch.setHasResults(Movies.length > 0);
      // appDispatch.setQuery("");
    }
    appDispatch.setIsLoading(false);
  };

  return appState.isLoading ? (
    <ul id="movie-list">
      {Array.from({ length: 8 }, (_, index) => (
        <li key={index} className="skeleton">
          <div className="skeleton-image"></div>
          <div className="skeleton-title"></div>
          <div className="skeleton-rate"></div>
        </li>
      ))}
    </ul>
  ) : (
    <ul id="movie-list">
      {movies.map((movie, index) => (
        <li key={`${movie.id}-${index}`} className="movie">
          <div className="movie-image">
            <img src={`${IMAGE_URL}${movie.poster_path}`} alt={movie.title} />
          </div>
          <div className="movie-title">{movie.title}</div>
          <div className="movie-rate">
            {movie.vote_average.toFixed(1)}
            <span className="star-icon"></span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
