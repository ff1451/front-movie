import { useState } from "react";
import { IMAGE_URL } from "../../constants";
import MovieDetails from "./MovieDetails";
import useBoolean from "../../hook/useBoolean";
import { usePopularMovies } from "./hooks/usePopularMovies";
import useAppStore from "../../zustand/store";
import { useSearchMovies } from "./hooks/useSearchMovies";

function MovieList() {
  const { isSearching } = useAppStore();

  const { data: popularMoviesData, isLoading: popularMovieLoading } =
    usePopularMovies();
  const { data: searchMoviesData, isLoading: searchMovieLoading } =
    useSearchMovies();

  const [isModalOpen, setIsModalOpenTrue, setIsModalOpenFalse] =
    useBoolean(false);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  const movies = !isSearching
    ? (popularMoviesData?.pages?.flatMap((page) => page) ?? [])
    : (searchMoviesData?.pages?.flatMap((page) => page) ?? []);

  const movieClick = async (movieId: number) => {
    setIsModalOpenTrue();
    setSelectedMovieId(movieId);
  };

  const closeModal = () => {
    setIsModalOpenFalse();
  };

  return (
    <>
      {popularMovieLoading || searchMovieLoading ? (
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
        <ul className="grid grid-cols-2 gap-9 p-0 sm:grid-cols-3 sm:gap-16 lg:grid-cols-4">
          {movies.map((movie, index) => (
            <li
              key={`${movie.id}-${index}`}
              className="cursor-pointer text-center"
              onClick={() => movieClick(movie.id)}
            >
              <div className="h-[220px] w-[140px] rounded-[15px] bg-cover bg-center sm:mb-[19px] sm:h-[273px] sm:w-[182px]">
                <img
                  className="h-[220px] w-[140px] rounded-2xl object-cover sm:h-full sm:w-full"
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
      {isModalOpen && selectedMovieId && (
        <MovieDetails movieId={selectedMovieId} onClose={closeModal} />
      )}
    </>
  );
}

export default MovieList;
