import Search from "./Search";
import "./Header.css";

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
    <header>
      <h1 id="logo" onClick={LogoClick}></h1>
      <Search appState={appState} appDispatch={appDispatch} />
    </header>
  );
}

export default Header;
