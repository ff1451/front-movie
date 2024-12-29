import React, { useState, useEffect } from "react";
import { IMAGE_URL } from "../../constants";
import { getPopularMovies } from "../../apis/getPopularMovies";
import { Movie, MovieDetail } from "../../types/movie";
import { searchMoviesByName } from "../../apis/searchMoviesByName";
import { getMovieDetail } from "../../apis/getMovieDetail";
import MovieDetails from "./MovieDetails";

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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetail | null>(null);

  useEffect(() => {
    if (appState.page >= 1) {
      loadMovies();
    }
  }, [appState.page]);

  useEffect(() => {
    if (appState.isSearching) {
      setMovies([]);
      loadMovies();
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
      appDispatch.setHasResults(Movies.length > 0);
    }
    appDispatch.setIsLoading(false);
  };

  const movieClick = async (movieId: number) => {
    const movieDetail = await getMovieDetail(movieId);
    setIsModalOpen(true);
    setSelectedMovie(movieDetail);
    console.log("click");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <>
      {appState.isLoading ? (
        <ul id="movie-list" className="grid grid-cols-4 gap-16 p-0">
          {Array.from({ length: 8 }, (_, index) => (
            <li key={index} className="mb-4 rounded-lg bg-[#2d2d2d]">
              <div className="h-[273px] w-full animate-pulse rounded-lg bg-[#424242]"></div>
              <div className="my-2 h-5 w-[70%] animate-pulse rounded-lg bg-[#4a4a4a]"></div>
              <div className="h-4 w-[30%] animate-pulse rounded-lg bg-[#4a4a4a]"></div>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="grid grid-cols-4 gap-16 p-0">
          {movies.map((movie, index) => (
            <li
              key={`${movie.id}-${index}`}
              className="cursor-pointer text-center"
              onClick={() => movieClick(movie.id)}
            >
              <div className="mb-[19px] h-[273px] w-full rounded-[15px] bg-cover bg-center">
                <img
                  className="h-full w-full rounded-2xl object-cover"
                  src={`${IMAGE_URL}${movie.poster_path}`}
                  alt={movie.title}
                />
              </div>
              <div className="mb-[13px] text-left text-lg font-semibold">
                {movie.title}
              </div>
              <div className="text-left text-[14px] font-medium">
                {movie.vote_average.toFixed(1)}
                <span className="ml-[6px] inline-block h-[14px] w-[14px] bg-[url('/src/assets/star.svg')] bg-contain bg-no-repeat align-middle"></span>
              </div>
            </li>
          ))}
        </ul>
      )}
      {isModalOpen && selectedMovie && (
        <MovieDetails movieDetail={selectedMovie} onClose={closeModal} />
      )}
    </>
  );
}

export default MovieList;
