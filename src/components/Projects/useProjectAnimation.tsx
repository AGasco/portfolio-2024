import { IDLE, INCOMING, NEXT, OUTGOING, WAITING } from '@/constants';
import { projects } from '@/data';
import { ProjectAnimDirections, ProjectAnimPhase } from '@/types';
import { useEffect, useRef, useState } from 'react';

const useProjectAnimation = () => {
  const [currentProjectIdx, setCurrentProjectIdx] = useState(0);
  const [displayedProjectIdx, setDisplayedProjectIdx] = useState(0);
  const [targetPosition, setTargetPosition] = useState(0);
  const [isAnimating, setAnimating] = useState(false);
  const [animDirection, setAnimDirection] =
    useState<ProjectAnimDirections | null>(null);
  const [animPhase, setAnimPhase] = useState<ProjectAnimPhase>(IDLE);

  const prevAnimPhaseRef = useRef<ProjectAnimPhase>(animPhase);

  const timeouts = useRef<{
    timeout1?: number;
    timeout2?: number;
    timeout3?: number;
  }>({});

  useEffect(() => {
    setTargetPosition(0);
  }, [displayedProjectIdx]);

  useEffect(() => {
    const prevAnimPhase = prevAnimPhaseRef.current;

    if (prevAnimPhase !== OUTGOING && animPhase === OUTGOING) {
      const outgoingDuration = 1500;
      const incomingDuration = 1500;
      const waitTime = 300;

      timeouts.current.timeout1 = window.setTimeout(() => {
        setAnimPhase(WAITING);

        let nextProjectIdx;
        if (animDirection === NEXT) {
          nextProjectIdx = (currentProjectIdx + 1) % projects.length;
        } else {
          nextProjectIdx =
            (currentProjectIdx - 1 + projects.length) % projects.length;
        }
        setCurrentProjectIdx(nextProjectIdx);

        timeouts.current.timeout2 = window.setTimeout(() => {
          setDisplayedProjectIdx(nextProjectIdx);
          setTargetPosition(0);
          setAnimPhase(INCOMING);

          timeouts.current.timeout3 = window.setTimeout(() => {
            setAnimPhase(IDLE);
            setAnimDirection(null);
            setAnimating(false);
          }, incomingDuration);
        }, waitTime);
      }, outgoingDuration);
    }

    prevAnimPhaseRef.current = animPhase;
  }, [animPhase, animDirection]);

  useEffect(() => {
    const currentTimeouts = timeouts.current;

    return () => {
      clearTimeout(currentTimeouts.timeout1);
      clearTimeout(currentTimeouts.timeout2);
      clearTimeout(currentTimeouts.timeout3);
    };
  }, []);

  const handleNavigation = (direction: ProjectAnimDirections) => {
    if (isAnimating) return;
    setAnimating(true);
    setAnimDirection(direction);
    setAnimPhase(OUTGOING);
  };

  return {
    currentProjectIdx,
    displayedProjectIdx,
    isAnimating,
    animDirection,
    animPhase,
    targetPosition,
    setTargetPosition,
    handleNavigation
  };
};

export default useProjectAnimation;
