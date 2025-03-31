import { useEffect } from 'react';

const useKeyDown = function (key, callBack) {
  useEffect(
    function () {
      function callback(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) callBack();
      }
      document.addEventListener('keydown', callback);
      return function () {
        document.removeEventListener('keydown', callback);
      };
    },
    [callBack, key]
  );
};
export { useKeyDown };
