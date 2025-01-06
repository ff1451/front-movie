import { useRef } from "react";
import Button from "./Button";
import MovieList from "./MovieList";
import PageTitle from "./PageTitle";

function MoviesSection() {
  const prevQueryRef = useRef<string>("");
  const movieLengthRef = useRef<number>(0);

  return (
    <div className="h-full w-full max-w-[920px] px-5 py-10 text-center">
      <PageTitle prevQueryRef={prevQueryRef.current} />
      <MovieList prevQueryRef={prevQueryRef} movieLengthRef={movieLengthRef} />
      <Button movieLengthRef={movieLengthRef.current} />
    </div>
  );
}

export default MoviesSection;
