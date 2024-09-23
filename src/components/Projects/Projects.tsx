import { projects } from '@/data';
import { useState } from 'react';
import {
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Projects.scss';

const Projects = () => {
  const [currentProjectIdx, setCurrentProjectIdx] = useState(0);

  const handlePrevious = () =>
    setCurrentProjectIdx(
      (prevIdx) => (prevIdx - 1 + projects.length) % projects.length
    );

  const handleNext = () =>
    setCurrentProjectIdx((prevIdx) => (prevIdx + 1) % projects.length);

  const { title, description, screenshots, backgroundColor } =
    projects[currentProjectIdx];

  return (
    <div className="projects" style={{ backgroundColor }}>
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
