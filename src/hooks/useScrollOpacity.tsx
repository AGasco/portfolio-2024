import { SCROLL_EVENT } from '@/constants';
import { RefObject, useEffect, useState } from 'react';

const useScrollOpacity = (
  ref: RefObject<HTMLDivElement>,
  offset: number
): number => {
  const [opacity, setOpacity] = useState(1);

  const handleScroll = () => {
    const element = ref.current;
    if (element) {
      const sectionRect = element.getBoundingClientRect();
      const sectionTop = sectionRect.top + window.scrollY;
      const sectionHeight = element.offsetHeight;
      const offsetValue = sectionHeight * offset;

      const scrollStart =
        sectionTop + sectionHeight - window.innerHeight + offsetValue;
      const scrollEnd = sectionTop + sectionHeight - offsetValue / 3;

      const windowScrollTop = window.scrollY;

      if (windowScrollTop >= scrollStart && windowScrollTop <= scrollEnd) {
        const opacityReduction =
          (windowScrollTop - scrollStart) / (scrollEnd - scrollStart);
        setOpacity(Math.max(1 - opacityReduction, 0));
      } else if (windowScrollTop < scrollStart) {
        setOpacity(1);
      } else {
        setOpacity(0);
      }
    }
  };

  useEffect(() => {
    window.addEventListener(SCROLL_EVENT, handleScroll);
    return () => window.removeEventListener(SCROLL_EVENT, handleScroll);
  }, [ref, offset]);

  return opacity;
};

export default useScrollOpacity;
