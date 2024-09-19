import { ABOUT_SECTION, SCROLL_EVENT } from '@/constants';
import { useEffect, useState } from 'react';
import './About.scss';

const About = () => {
  const [isInView, setInView] = useState(false);

  const handleScroll = () => {
    const aboutSection = document.getElementById(ABOUT_SECTION);
    if (aboutSection) {
      const sectionTop = aboutSection.getBoundingClientRect().top;
      const triggerPoint = window.innerHeight * 0.55;

      setInView(sectionTop < triggerPoint);
    }
  };

  useEffect(() => {
    window.addEventListener(SCROLL_EVENT, handleScroll);
    return () => {
      window.removeEventListener(SCROLL_EVENT, handleScroll);
    };
  }, []);

  return (
    <div className={`about ${isInView ? 'animate' : ''}`}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, corporis
      repellendus? Cumque qui quos aperiam cum provident, optio ab, atque itaque
      incidunt cupiditate quo magnam saepe illum dignissimos quisquam et.
    </div>
  );
};

export default About;
