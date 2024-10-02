import { projects } from '@/data';
import { useInView, useScrollOpacity } from '@/hooks';
import {
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import './Projects.scss';

const triggerPointEnter = window.innerHeight * 0.6;
const offset = 0.4;

const Projects = () => {
  const topRef = useRef(null);
  const screenshotsRef = useRef(null);
  const opacity = useScrollOpacity(topRef, offset);
  const isInView = useInView(screenshotsRef, triggerPointEnter);

  const [currentProjectIdx, setCurrentProjectIdx] = useState(0);
  const [targetPosition, setTargetPosition] = useState(0);

  useEffect(() => {
    setTargetPosition(0);
  }, [currentProjectIdx]);

  const handlePrevious = () => {
    setCurrentProjectIdx(
      (prevIdx) => (prevIdx - 1 + projects.length) % projects.length
    );
  };

  const handleNext = () => {
    setCurrentProjectIdx((prevIdx) => (prevIdx + 1) % projects.length);
  };

  const getImgTransformValues = (idx: number) => {
    let positionOffset = idx - targetPosition;
    if (positionOffset < 0) positionOffset += screenshots.length;

    let translateZValue;
    let rotateYValue;

    if (!isInView) {
      if (positionOffset === 0) {
        translateZValue = 100;
        rotateYValue = 0;
      } else {
        translateZValue = positionOffset * -300;
        rotateYValue = positionOffset * 20;
      }
    } else {
      translateZValue = positionOffset * -200;
      rotateYValue = positionOffset * 10;
    }

    return { translateZValue, rotateYValue };
  };

  const { title, description, screenshots, backgroundColor } =
    projects[currentProjectIdx];

  return (
    <div className="projects" ref={topRef} style={{ backgroundColor, opacity }}>
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
        <div ref={screenshotsRef} className="projects__content__screenshots">
          <div
            className={`projects__content__screenshots__carousel ${
              isInView ? 'animate' : ''
            }`}
          >
            {screenshots.map((src, idx) => {
              const { translateZValue, rotateYValue } =
                getImgTransformValues(idx);
              let positionOffset = idx - targetPosition;
              if (positionOffset < 0) positionOffset += screenshots.length;

              const zIndex = screenshots.length - positionOffset;
              const opacity = Math.max(1 - positionOffset * 0.2, 0.2);

              return (
                <img
                  key={idx}
                  src={src}
                  className={`screenshot ${
                    idx === targetPosition ? 'active' : ''
                  }`}
                  style={{
                    transform: `translateZ(${translateZValue}px) rotateY(${rotateYValue}deg)`,
                    transition: 'transform 1s ease',
                    zIndex: zIndex,
                    opacity: opacity
                  }}
                  onClick={() => setTargetPosition(idx)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
