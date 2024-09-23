import { useInView } from '@/hooks';
import { useRef } from 'react';
import './About.scss';

const triggerPointEnter = window.innerHeight;

const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, triggerPointEnter);

  return (
    <div ref={ref} className={`about ${isInView ? 'animate' : ''}`}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, corporis
      repellendus? Cumque qui quos aperiam cum provident, optio ab, atque itaque
      incidunt cupiditate quo magnam saepe illum dignissimos quisquam et.
    </div>
  );
};

export default About;
