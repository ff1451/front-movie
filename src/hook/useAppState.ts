import { useState } from "react";
import useBoolean from "./useBoolean";
import useHasResults from "./useHasResults";

function useAppState() {
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");

  const [isSearching, setSearchingTrue, setSearchingFalse, toggleSearching] =
    useBoolean(false);
  const [isLoading, setLoadingTrue, setLoadingFalse, toggleLoading] =
    useBoolean(false);
  const [hasResults, setHasResults] = useHasResults(true);

  const resetState = () => {
    setPage(1);
    setQuery("");
    setSearchingFalse();
    setLoadingFalse();
  };

  return {
    state: {
      page,
      query,
      isSearching,
      isLoading,
      hasResults,
    },
    dispatch: {
      setPage,
      setQuery,
      setSearchingTrue,
      setSearchingFalse,
      toggleSearching,
      setLoadingTrue,
      setLoadingFalse,
      toggleLoading,
      setHasResults,
      resetState,
    },
  };
}

export default useAppState;
