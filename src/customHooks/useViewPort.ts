import { useEffect, useState } from 'react';

export const useVeiwPort = () => {
  const [width, setWidth] = useState(0);

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
