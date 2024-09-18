import { ReactNode, useEffect, useState } from 'react';
import './FadeWrapper.scss';

interface Props {
  children: ReactNode;
  isFadingOut: boolean;
  duration: number;
}

const FadeWrapper = ({ children, isFadingOut, duration }: Props) => {
  const [isVisible, setVisible] = useState(!isFadingOut);

  useEffect(() => {
    setVisible(!isFadingOut);
  }, [isFadingOut]);

  return (
    <div
      className={`fade-wrapper ${isVisible ? 'fade-in' : 'fade-out'}`}
      style={{
        transitionDuration: `${duration}ms`
      }}
    >
      {children}
    </div>
  );
};

export default FadeWrapper;
