interface PageTitleProps {
  prevQueryRef: string;
  appState: {
    isSearching: boolean;
    hasResults: boolean;
  };
}

function PageTitle({ prevQueryRef, appState }: PageTitleProps) {
  const getTitle = () => {
    if (prevQueryRef && !appState.hasResults) {
      return `"${prevQueryRef}"의 결과가 없습니다.`;
    }
    if (prevQueryRef && appState.hasResults) {
      return `${prevQueryRef}의 검색 결과`;
    }
    return "지금 인기있는 영화";
  };

  return (
    <h2 className="mb-12 text-left text-[34px] font-semibold">{getTitle()}</h2>
  );
}

export default PageTitle;
