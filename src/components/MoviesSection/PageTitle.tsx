import { useAppState } from "../../hook/useAppState";

function PageTitle() {
  const appState = useAppState();
  const getTitle = () => {
    if (appState.query && !appState.hasResults) {
      return `"${appState.query}"의 결과가 없습니다.`;
    }
    if (appState.query && appState.hasResults) {
      return `${appState.query}의 검색 결과`;
    }
    return "지금 인기있는 영화";
  };

  return (
    <h2 className="mb-12 text-left text-[34px] font-semibold">{getTitle()}</h2>
  );
}

export default PageTitle;
