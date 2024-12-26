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
    <div className="search-container">
      <input
        className="search-bar"
        type="text"
        placeholder="검색"
        value={currentQuery}
        onChange={(e) => setCurrentQuery(e.target.value.trim())}
        onKeyDown={(e) => e.key === "Enter" && searching(e)}
      />
      <button
        className="search-button"
        type="submit"
        onClick={(e) => searching(e)}
      />
    </div>
  );
}

export default Search;
