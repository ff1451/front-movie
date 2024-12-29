import { useState } from "react";

interface SearchProps {
  appState: { query: string; isSearching: boolean };
  appDispatch: {
    setQuery: (query: string) => void;
    setIsSearching: (isSearching: boolean) => void;
    setPage: (page: number) => void;
  };
}

function Search({ appState, appDispatch }: SearchProps) {
  const [currentQuery, setCurrentQuery] = useState<string>("");

  const searching = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentQuery !== "") {
      appDispatch.setQuery(currentQuery);
      appDispatch.setIsSearching(true);
      appDispatch.setPage(1);
      setCurrentQuery("");
      console.log(appState.query);
    } else {
      appDispatch.setIsSearching(false);
    }
  };

  return (
    <div className="relative w-80">
      <input
        className="h-[44px] w-full rounded-lg border border-[#d0d5dd] px-[14px] py-[10px] text-[16px] text-black"
        type="text"
        placeholder="검색"
        value={currentQuery}
        onChange={(e) => setCurrentQuery(e.target.value.trim())}
        onKeyDown={(e) => e.key === "Enter" && searching(e)}
      />
      <button
        className="absolute right-[14px] top-1/2 h-6 w-6 -translate-y-1/2 transform cursor-pointer border-none bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/src/assets/search_button.png')` }}
        type="submit"
        onClick={(e) => searching(e)}
      />
    </div>
  );
}

export default Search;
