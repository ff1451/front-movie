import useAppStore from "../../zustand/store";

function Button() {
  const { page, isLoading, movieLength, setPage } = useAppStore();

  const loadMore = () => {
    if (!isLoading) {
      setPage(page + 1);
    }
  };
  return movieLength >= 20 ? (
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
