import { lazy, Suspense } from "react";

function Skeleton() {
  return (
    <ul id="movie-list" className="grid grid-cols-4 gap-16 p-0">
      {Array.from({ length: 8 }, (_, index) => (
        <li key={index} className="mb-4 rounded-lg bg-[#2d2d2d]">
          <div className="h-[273px] w-full animate-pulse rounded-lg bg-[#424242]"></div>
          <div className="my-2 h-5 w-[70%] animate-pulse rounded-lg bg-[#4a4a4a]"></div>
          <div className="h-4 w-[30%] animate-pulse rounded-lg bg-[#4a4a4a]"></div>
        </li>
      ))}
    </ul>
  );
}

function MovieList() {
  const MovieListContent = lazy(() => import("./MovieListContent"));
  return (
    <Suspense fallback={<Skeleton />}>
      <MovieListContent />
    </Suspense>
  );
}

export default MovieList;
