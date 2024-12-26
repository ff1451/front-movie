import { useState } from "react";

function useAppState() {
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasResults, setHasResults] = useState<boolean>(true);

  const resetState = () => {
    setPage(1);
    setQuery("");
    setIsSearching(false);
    setIsLoading(false);
    setHasResults(true);
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
      setIsSearching,
      setIsLoading,
      setHasResults,
      resetState,
    },
  };
}

export default useAppState;
