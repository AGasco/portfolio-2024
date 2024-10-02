import { useEffect } from 'react';

const ScrollToTop = () => {
  useEffect(() => {
    // Disable scroll restoration by the browser on refresh
    if ('scrollRestoration' in window.history)
      window.history.scrollRestoration = 'manual';

    window.scrollTo(0, 0);

    return () => {
      // Restore default behavior when the component unmounts
      if ('scrollRestoration' in window.history)
        window.history.scrollRestoration = 'auto';
    };
  }, []);

  return null;
};

export default ScrollToTop;
