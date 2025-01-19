import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getPopularMovies } from "../../../apis/getPopularMovies";

export const usePopularMovies = () => {
  return useSuspenseInfiniteQuery({
    queryKey: ["popularMovies"],
    queryFn: ({ pageParam = 1 }) => getPopularMovies(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, Pages) => {
      if (lastPage.length < 20) return undefined;
      return Pages.length + 1;
    },
  });
};
