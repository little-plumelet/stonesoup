import { useEffect, useState } from 'react';

export const useVeiwPort = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function resizeWidth() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', resizeWidth);
    return () => {
      window.removeEventListener('resize', resizeWidth);
    };
  }, []);

  return { width };
};
