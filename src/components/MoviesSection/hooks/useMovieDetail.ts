import { useSuspenseQuery } from "@tanstack/react-query";
import { getMovieDetail } from "../../../apis/getMovieDetail";

export const useMovieDetail = (movieId: number) => {
  return useSuspenseQuery({
    queryKey: ["movieDetail", movieId],
    queryFn: () => getMovieDetail(movieId),
  });
};
