import Search from "./Search";
import "./Header.css";
import logo from "../../assets/logo.png";

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
  console.log("appState:", appState);
  console.log("appDispatch:", appDispatch);

  const LogoClick = () => {
    appDispatch.resetState();
    console.log("Logo Clicked");
  };

  return (
    <header
      className="flex h-[60px] w-full items-center justify-between border-b border-white/50 bg-black px-8 py-2"
      style={{ boxShadow: " 0px 4px 8px #ffffff33" }}
    >
      <img
        src={logo}
        alt="logo"
        className="h-5 w-[123px] cursor-pointer"
        onClick={LogoClick}
      />
      <Search appState={appState} appDispatch={appDispatch} />
    </header>
  );
}

export default Header;
