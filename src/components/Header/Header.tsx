import Search from "./Search";
import logo from "../../assets/logo.png";
import useBoolean from "../../hook/useBoolean";
import { useAppDispatch } from "../../hook/useAppState";

function Header() {
  const dispatch = useAppDispatch();
  const [searchClicked, setSearchClickedTrue, setSearchClickedFalse] =
    useBoolean(false);

  const LogoClick = () => {
    dispatch.setQuery("");
    dispatch.setSearchingFalse();
    dispatch.setPage(1);
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
        className={`h-5 w-[123px] cursor-pointer ${
          searchClicked ? "hidden sm:block" : ""
        }`}
        onClick={LogoClick}
      />
      <Search
        searchClicked={searchClicked}
        setSearchClickedTrue={setSearchClickedTrue}
        setSearchClickedFalse={setSearchClickedFalse}
      />
    </header>
  );
}

export default Header;
