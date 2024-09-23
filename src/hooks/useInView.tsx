import { SCROLL_EVENT } from '@/constants';
import { RefObject, useEffect, useState } from 'react';

const useInView = (
  ref: RefObject<HTMLDivElement>,
  triggerPointEnter: number,
  triggerPointExit?: number
): boolean => {
  const [isInView, setInView] = useState(false);

  const handleScroll = () => {
    const section = ref.current;
    if (section) {
      const sectionRect = section.getBoundingClientRect();
      const sectionTop = sectionRect.top;
      const sectionBottom = sectionRect.bottom;

      if (triggerPointExit)
        setInView(
          sectionTop <= triggerPointEnter && sectionBottom >= triggerPointExit
        );
      else setInView(sectionTop <= triggerPointEnter);
    }
  };

  useEffect(() => {
    window.addEventListener(SCROLL_EVENT, handleScroll);
    return () => window.removeEventListener(SCROLL_EVENT, handleScroll);
  }, [ref]);

  return isInView;
};

export default useInView;
