import { useState } from "react";
import { useAppDispatch, useAppState } from "../../hook/useAppState";

interface SearchProps {
  searchClicked: boolean;
  setSearchClickedTrue: () => void;
  setSearchClickedFalse: () => void;
}

function Search({
  searchClicked,
  setSearchClickedTrue,
  setSearchClickedFalse,
}: SearchProps) {
  const [currentQuery, setCurrentQuery] = useState<string>("");
  const appState = useAppState();
  const dispatch = useAppDispatch();

  const searching = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentQuery !== "") {
      dispatch.setQuery(currentQuery);
      dispatch.setSearchingTrue();
      dispatch.setPage(1);
      setCurrentQuery("");
      console.log(appState.query);
    } else {
      dispatch.setSearchingFalse();
    }
  };

  return (
    <div className={`relative ${searchClicked ? "w-full" : "w-12"} sm:w-80`}>
      <input
        className="h-[44px] w-full rounded-lg border border-[#d0d5dd] px-[14px] py-[10px] text-[16px] text-black placeholder-gray-500 placeholder-opacity-0 sm:placeholder-opacity-100"
        type="text"
        placeholder="검색"
        value={currentQuery}
        onFocus={() => setSearchClickedTrue()}
        onBlur={() => setSearchClickedFalse()}
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
