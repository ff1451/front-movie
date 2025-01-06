import Button from "./Button";
import MovieList from "./MovieList";
import PageTitle from "./PageTitle";

function MoviesSection() {
  return (
    <div className="h-full w-full max-w-[920px] px-5 py-10 text-center">
      <PageTitle />
      <MovieList />
      <Button />
    </div>
  );
}

export default MoviesSection;
