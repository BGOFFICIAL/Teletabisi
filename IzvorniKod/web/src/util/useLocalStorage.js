import { useState, useEffect } from 'react';

function useLocalState(defaultValue, key) {
 const [value, setValue] = useState(() => {
   const stickyValue = localStorage.getItem(key);
  
if(stickyValue === 'undefined' || stickyValue === 'null' || stickyValue === null){
  return defaultValue;}

   return stickyValue !== null
     ? JSON.parse(stickyValue)
     : defaultValue;
 });

 useEffect(() => {
  if(value !== undefined || value !== null)
    localStorage.setItem(key, JSON.stringify(value));

}, [key, value]);
    return [value, setValue];
}


export { useLocalState};