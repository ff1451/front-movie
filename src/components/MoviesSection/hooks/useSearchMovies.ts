import { useInfiniteQuery } from "@tanstack/react-query";
import { searchMoviesByName } from "../../../apis/searchMoviesByName";
import useAppStore from "../../../zustand/store";

export const useSearchMovies = () => {
  const { query } = useAppStore();

  return useInfiniteQuery({
    queryKey: ["searchMovies", query],
    queryFn: ({ pageParam = 1 }) => searchMoviesByName(query, pageParam),
    enabled: !!query,
    initialPageParam: 1,
    getNextPageParam: (lastPage, Pages) => {
      if (lastPage.length < 20) return undefined;
      return Pages.length + 1;
    },
  });
};
