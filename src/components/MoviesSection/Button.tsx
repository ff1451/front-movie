import { usePopularMovies } from "./hooks/usePopularMovies";
import useAppStore from "../../zustand/store";
import { useSearchMovies } from "./hooks/useSearchMovies";

function Button() {
  const { isSearching } = useAppStore();
  const {
    fetchNextPage: fetchNextPopularPage,
    hasNextPage: hasNextPopularPage,
  } = usePopularMovies();
  const { fetchNextPage: fetchNextSearchPage, hasNextPage: hasNextSearchPage } =
    useSearchMovies();

  const hasNextPage = isSearching ? hasNextSearchPage : hasNextPopularPage;
  const fetchNextPage = isSearching
    ? fetchNextSearchPage
    : fetchNextPopularPage;

  return hasNextPage ? (
    <>
      <button
        id="more"
        className="mt-16 w-full cursor-pointer rounded-lg border border-[#f33f3f] bg-[#f33f3f] px-[18px] py-[10px] text-base font-semibold"
        onClick={() => fetchNextPage()}
      >
        더보기
      </button>
    </>
  ) : null;
}

export default Button;
