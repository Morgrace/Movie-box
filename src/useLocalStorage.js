import { useEffect, useState } from 'react';
const useLocalStorage = function (key) {
  const [value, setValue] = useState(
    () => JSON.parse(localStorage.getItem(`${key}`)) || []
  );

  useEffect(
    function () {
      localStorage.setItem(`${key}`, JSON.stringify(value));
    },
    [value, key]
  );
  return [value, setValue];
};
export { useLocalStorage };
