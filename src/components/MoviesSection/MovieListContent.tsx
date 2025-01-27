import { lazy, Suspense, useState } from "react";
import { IMAGE_URL } from "@/constants";
import useBoolean from "hook/useBoolean";
import { usePopularMovies } from "MoviesSection/hooks/usePopularMovies";
import useAppStore from "@/zustand/store";
import { useSearchMovies } from "MoviesSection/hooks/useSearchMovies";

function MovieListContent() {
  const MovieDetails = lazy(() => import("./MovieDetails"));
  const { isSearching } = useAppStore();

  const { data: popularMoviesData } = usePopularMovies();
  const { data: searchMoviesData } = useSearchMovies();

  const [isModalOpen, setIsModalOpenTrue, setIsModalOpenFalse] =
    useBoolean(false);
  const [selectedMovieId, setSelectedMovieId] = useState<number>();

  const movies = !isSearching
    ? (popularMoviesData?.pages?.flatMap((page) => page) ?? [])
    : (searchMoviesData?.pages?.flatMap((page) => page) ?? []);

  console.log("Popular Movies Data:", popularMoviesData);
  console.log("Search Movies Data:", searchMoviesData);

  const movieClick = async (movieId: number) => {
    setIsModalOpenTrue();
    setSelectedMovieId(movieId);
  };

  const closeModal = () => {
    setIsModalOpenFalse();
  };

  return (
    <>
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
      {isModalOpen && selectedMovieId && (
        <Suspense
          fallback={
            <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-80">
              <div className="relative mt-auto flex h-[490px] w-full items-center justify-center bg-[#212122] text-white sm:mt-0 sm:h-[577px] sm:w-[826px] sm:rounded-lg">
                <p className="text-lg font-semibold">
                  영화 정보를 불러오는 중...
                </p>
              </div>
            </div>
          }
        >
          <MovieDetails movieId={selectedMovieId} onClose={closeModal} />
        </Suspense>
      )}
    </>
  );
}

export default MovieListContent;
