import {
  BREAKPOINT_DESKTOP,
  BREAKPOINT_LARGEDESKTOP,
  BREAKPOINT_XLDESKTOP
} from '@/constants';
import { useDeviceType, useInView } from '@/hooks';
import { useRef } from 'react';
import './About.scss';
import AboutVideo from './AboutVideo';

const triggerPointEnter = window.innerHeight;

const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const device = useDeviceType();
  console.log('device', device);
  const finalTrigger =
    device !== BREAKPOINT_XLDESKTOP
      ? triggerPointEnter * 0.95
      : triggerPointEnter;
  const isInView = useInView(ref, finalTrigger);

  const isDesktopOrLarger = [
    BREAKPOINT_DESKTOP,
    BREAKPOINT_LARGEDESKTOP,
    BREAKPOINT_XLDESKTOP
  ].includes(device);

  return (
    <>
      <div ref={ref} className={`about ${isInView ? 'animate' : ''}`}>
        {isDesktopOrLarger && <AboutVideo isLoaded={isInView} />}
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
