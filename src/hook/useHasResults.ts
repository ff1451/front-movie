import useBoolean from "./useBoolean";

function useHasResults(initialValue: boolean) {
  const [hasResults, setTrue, setFalse] = useBoolean(initialValue);

  const setHasResults = (data: any[]) => {
    data.length > 0 ? setTrue() : setFalse();
  };

  return [hasResults, setHasResults];
}

export default useHasResults;
