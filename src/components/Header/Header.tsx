import Search from "./Search";
import "./Header.css";
import logo from "../../assets/logo.png";
import { useState } from "react";

interface HeaderProps {
  appState: { query: string; isSearching: boolean; isLoading: boolean };
  appDispatch: {
    setPage: (page: number) => void;
    setQuery: (query: string) => void;
    setIsSearching: (isSearching: boolean) => void;
    setIsLoading: (isLoading: boolean) => void;
    resetState: () => void;
  };
}

function Header({ appState, appDispatch }: HeaderProps) {
  const [searchClicked, setSearchClicked] = useState<boolean>(false);

  const LogoClick = () => {
    appDispatch.resetState();
    console.log("Logo Clicked");
  };

  return (
    <header
      className="flex h-[60px] w-full items-center justify-between border-b border-white/50 bg-black px-8 py-2"
      style={{ boxShadow: " 0px 4px 8px #ffffff33" }}
    >
      {!searchClicked && (
        <img
          src={logo}
          alt="logo"
          className="h-5 w-[123px] cursor-pointer"
          onClick={LogoClick}
        />
      )}
      <Search
        appState={appState}
        appDispatch={appDispatch}
        searchClicked={searchClicked}
        setSearchClicked={setSearchClicked}
      />
    </header>
  );
}

export default Header;
