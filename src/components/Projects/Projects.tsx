import { SCROLL_EVENT } from '@/constants';
import { projects } from '@/data';
import {
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import './Projects.scss';

const Projects = () => {
  const [currentProjectIdx, setCurrentProjectIdx] = useState(0);
  const [opacity, setOpacity] = useState(1);

  const handlePrevious = () =>
    setCurrentProjectIdx(
      (prevIdx) => (prevIdx - 1 + projects.length) % projects.length
    );

  const handleNext = () =>
    setCurrentProjectIdx((prevIdx) => (prevIdx + 1) % projects.length);

  const handleScroll = () => {
    const projectsSection = document.querySelector('.projects') as HTMLElement;
    if (projectsSection) {
      const sectionRect = projectsSection.getBoundingClientRect();
      const sectionTop = sectionRect.top + window.scrollY;
      const sectionHeight = projectsSection.offsetHeight;
      const offset = sectionHeight * 0.4;

      const scrollStart =
        sectionTop + sectionHeight - window.innerHeight + offset;
      const scrollEnd = sectionTop + sectionHeight - offset / 3;

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
  }, []);

  const { title, description, screenshots, backgroundColor } =
    projects[currentProjectIdx];

  return (
    <div className="projects" style={{ backgroundColor, opacity }}>
      <div className="projects__controls">
        <button onClick={handlePrevious}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <span>
          {String(currentProjectIdx + 1).padStart(2, '0')} /{' '}
          {String(projects.length).padStart(2, '0')}
        </span>
        <button onClick={handleNext}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      <div className="projects__content">
        <div className="projects__content__details">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="projects__content__screenshots">
          <div className="projects__content__screenshots__carousel">
            {screenshots.map((src, idx) => (
              <img
                key={idx}
                src={src}
                className={`screenshot ${idx === 0 ? 'active' : ''}`}
                alt={`Screenshot ${idx + 1}`}
                style={{
                  transform: `translateZ(${idx * -200}px) rotateY(${
                    idx * 5
                  }deg)`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
