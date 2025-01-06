import { useAppDispatch, useAppState } from "../../hook/useAppState";

interface ButtonProps {
  movieLengthRef: number;
}

function Button({ movieLengthRef }: ButtonProps) {
  const appState = useAppState();
  const dispatch = useAppDispatch();

  const loadMore = () => {
    if (!appState.isLoading) {
      dispatch.setPage(appState.page + 1);
    }
  };
  return movieLengthRef >= 20 ? (
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
