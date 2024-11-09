import { useState } from "react";

const useBoolean = () => {
  const [boolean, setBoolean] = useState(false);
  const onTrue = () => setBoolean(true);
  const onFalse = () => setBoolean(false);
  const toggle = () => setBoolean(!boolean);
  return { boolean, onTrue, onFalse, toggle };
};

export default useBoolean;
