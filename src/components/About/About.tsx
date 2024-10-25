import {
  BREAKPOINT_LARGEDESKTOP,
  BREAKPOINT_XLDESKTOP,
  LARGER,
  LEFT,
  RIGHT
} from '@/constants';
import { useBreakpointComparison, useFinalTrigger, useInView } from '@/hooks';
import { useRef } from 'react';
import './About.scss';
import AboutVideo from './AboutVideo';

const triggerPointEnter = window.innerHeight;

const About = () => {
  const ref = useRef<HTMLDivElement>(null);

  const finalTrigger = useFinalTrigger(triggerPointEnter, {
    [BREAKPOINT_XLDESKTOP]: 1,
    default: 0.95
  });
  const isInView = useInView(ref, finalTrigger);

  const isLargeDesktop = useBreakpointComparison(
    BREAKPOINT_LARGEDESKTOP,
    LARGER
  );

  return (
    <>
      <div ref={ref} className={`about ${isInView ? 'animate' : ''}`}>
        {isLargeDesktop && (
          <>
            <AboutVideo position={LEFT} isLoaded={isInView} />
            <AboutVideo position={RIGHT} isLoaded={isInView} />
          </>
        )}
        I'm a frontend developer who quickly adapts to new concepts, projects
        and technologies, consistently delivering quality results. I take great
        responsibility for my work and thrive in collaborative environments,
        always ready to support my team with a positive attitude. <br />
        <br />
        With a strong mix of technical expertise and effective communication
        skills, I aim to contribute meaningfully to any tech team.
      </div>
    </>
  );
};

export default About;
