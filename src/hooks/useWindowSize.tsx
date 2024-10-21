import { useEffect, useState } from 'react';

type WindowSizeObject = {
  width: number | undefined;
  height: number | undefined;
};

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSizeObject>({
    width: undefined,
    height: undefined
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth * window.devicePixelRatio,
        height: window.innerHeight * window.devicePixelRatio
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;
