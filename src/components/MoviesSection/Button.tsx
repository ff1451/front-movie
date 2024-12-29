interface ButtonProps {
  appState: {
    page: number;
    query: string;
    isSearching: boolean;
    isLoading: boolean;
    hasResults: boolean;
  };
  appDispatch: {
    setPage: (page: number) => void;
    setQuery: (query: string) => void;
    setIsSearching: (isSearching: boolean) => void;
    setIsLoading: (isLoading: boolean) => void;
    setHasResults: (hasResults: boolean) => void;
  };
  movieLengthRef: number;
}

function Button({ appState, appDispatch, movieLengthRef }: ButtonProps) {
  const loadMore = () => {
    if (!appState.isLoading) {
      appDispatch.setPage(appState.page + 1);
    }
  };
  return movieLengthRef >= 20 ? (
    <>
      <button
        id="more"
        className="mt-16 w-full cursor-pointer rounded-lg border border-[#f33f3f] bg-[#f33f3f] px-[18px] py-[10px] text-base font-semibold"
        onClick={loadMore}
      >
        더보기
      </button>
    </>
  ) : null;
}

export default Button;
