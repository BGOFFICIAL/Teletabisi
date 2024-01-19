import { useState, useEffect } from "react";

function useLocalState(defaultValue, key) {
  const [value, setValue] = useState(() => {
    const stickyValue = localStorage.getItem(key);

    if (
      stickyValue === "undefined" ||
      stickyValue === "null" ||
      stickyValue === null ||
      stickyValue === "" ||
      stickyValue === " " ||
      stickyValue === undefined ||
      stickyValue === '"' ||
      stickyValue === '""' ||
      stickyValue.length <= 150
    ) {
      return defaultValue;
    }
    try{return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;}
    catch(e){return defaultValue;}

  });

  useEffect(() => {
    if (value !== undefined || value !== null)
      localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

export { useLocalState };