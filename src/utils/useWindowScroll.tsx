import { useEffect } from 'react';

import { debounce } from './debounce';

export const useWindowScroll = (callback: () => void, delay = 500) => {
  useEffect(() => {
    console.log(window.scrollbars);
    const debouncedCallback = debounce(callback, delay);
    window.addEventListener('scroll', debouncedCallback);
    return () => {
      window.removeEventListener('scroll', debouncedCallback);
    };
  }, [callback, delay]);
};
