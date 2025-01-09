import { useState } from "react";

function useBoolean(
  initialValue: boolean,
): [boolean, () => void, () => void, () => void] {
  const [value, setValue] = useState(initialValue);

  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);
  const toggle = () => setValue((prev) => !prev);

  return [value, setTrue, setFalse, toggle];
}

export default useBoolean;
