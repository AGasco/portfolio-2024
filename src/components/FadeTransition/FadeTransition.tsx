/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useEffect, useRef, useState } from 'react';
import './FadeTransition.scss';

interface Props {
  children: ReactNode;
  trigger: any;
  duration?: number;
}

const FadeTransition = ({ children, trigger, duration = 1000 }: Props) => {
  const [isFadingOut, setFadingOut] = useState(false);
  const [isFadingIn, setFadingIn] = useState(false);
  const [curContent, setCurContent] = useState<ReactNode>(null);
  const [nextContent, setNextContent] = useState<ReactNode>(null);
  const previousTrigger = useRef(null);

  useEffect(() => {
    if (previousTrigger.current !== trigger) {
      setNextContent(children);

      if (previousTrigger.current !== null) {
        setFadingOut(true);
      } else {
        setCurContent(children);
        setFadingIn(true);
      }
      previousTrigger.current = trigger;
    }
  }, [trigger, children]);

  useEffect(() => {
    if (isFadingOut) {
      const timer = setTimeout(() => {
        setCurContent(nextContent);
        setFadingOut(false);
        setFadingIn(true);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isFadingOut, nextContent, duration]);

  useEffect(() => {
    if (isFadingIn) {
      const fadeInTimer = setTimeout(() => {
        setFadingIn(false);
      }, duration);

      return () => clearTimeout(fadeInTimer);
    }
  }, [isFadingIn, duration]);

  return (
    <div
      className={`fade-transition ${
        isFadingOut ? 'fade-out' : isFadingIn ? 'fade-in' : ''
      }`}
    >
      {curContent}
    </div>
  );
};

export default FadeTransition;
