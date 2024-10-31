import { IDLE, INCOMING, NEXT, OUTGOING, PREVIOUS, WAITING } from '@/constants';
import { projects } from '@/data';
import { useInView, useScrollOpacity } from '@/hooks';
import { ProjectAnimDirections, ProjectAnimPhase } from '@/types';
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
  const [isAnimating, setAnimating] = useState(false);
  const [animDirection, setAnimDirection] =
    useState<ProjectAnimDirections | null>(null);
  const [animPhase, setAnimPhase] = useState<ProjectAnimPhase>(IDLE);

  useEffect(() => {
    setTargetPosition(0);
  }, [currentProjectIdx]);

  const handlePrevious = () => {
    if (isAnimating) return;

    setAnimating(true);
    setAnimDirection(PREVIOUS);
    setAnimPhase(OUTGOING);
  };

  const handleNext = () => {
    if (isAnimating) return;

    setAnimating(true);
    setAnimDirection(NEXT);
    setAnimPhase(OUTGOING);
  };

  useEffect(() => {
    if (animPhase !== OUTGOING) return;

    const outgoingDuration = 1500;
    const incomingDuration = 1500;
    const waitTime = 300;

    setTimeout(() => {
      setAnimPhase(WAITING);

      setCurrentProjectIdx((prevIdx) => {
        if (animDirection === NEXT) {
          return (prevIdx + 1) % projects.length;
        } else {
          return (prevIdx - 1 + projects.length) % projects.length;
        }
      });

      setTimeout(() => {
        setAnimPhase(INCOMING);

        setTimeout(() => {
          setAnimPhase(IDLE);
          setAnimDirection(null);
          setAnimating(false);
        }, incomingDuration);
      }, waitTime);
    }, outgoingDuration);
  }, [animPhase, animDirection]);

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
    } else if (animPhase === IDLE) {
      translateZValue = positionOffset * -200;
      rotateYValue = positionOffset * 10;
    } else {
      translateZValue = 0;
      rotateYValue = 0;
    }

    return { translateZValue, rotateYValue };
  };

  const renderScreenshot = (src: string, idx: number) => {
    const { translateZValue, rotateYValue } = getImgTransformValues(idx);
    let positionOffset = idx - targetPosition;
    if (positionOffset < 0) positionOffset += screenshots.length;

    const zIndex = screenshots.length - positionOffset;
    const opacity = Math.max(1 - positionOffset * 0.2, 0.2);

    return (
      <img
        key={idx}
        src={src}
        className={`screenshot ${idx === targetPosition ? 'active' : ''}`}
        style={{
          transform: `translateZ(${translateZValue}px) rotateY(${rotateYValue}deg)`,
          transition: 'transform 1s ease',
          zIndex,
          opacity
        }}
        onClick={() => setTargetPosition(idx)}
      />
    );
  };
  const { title, description, screenshots, backgroundColor } =
    projects[currentProjectIdx];

  return (
    <div className="projects" ref={topRef} style={{ backgroundColor, opacity }}>
      <div className="projects__controls">
        <button onClick={handlePrevious} disabled={isAnimating}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <span>
          {String(currentProjectIdx + 1).padStart(2, '0')} /{' '}
          {String(projects.length).padStart(2, '0')}
        </span>
        <button onClick={handleNext} disabled={isAnimating}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      <div
        className={`projects__content ${animPhase === WAITING ? 'hidden' : ''}`}
      >
        <div className="projects__content__details">
          <h2
            className={`projects__title stagger-1 ${
              animPhase !== IDLE && animPhase !== WAITING && animDirection
                ? `animate-${animPhase} ${animDirection}`
                : ''
            }`}
          >
            {title}
          </h2>
          <p
            className={`projects__description stagger-2 ${
              animPhase !== IDLE && animPhase !== WAITING && animDirection
                ? `animate-${animPhase} ${animDirection} description`
                : ''
            }`}
          >
            {description}
          </p>
        </div>
        <div
          ref={screenshotsRef}
          className={`projects__content__screenshots stagger-3 ${
            animPhase !== IDLE && animPhase !== WAITING && animDirection
              ? `animate-${animPhase} ${animDirection}`
              : ''
          }`}
        >
          <div
            className={`projects__content__screenshots__carousel ${
              isInView ? 'animate' : ''
            }`}
          >
            {screenshots.map((src, idx) => renderScreenshot(src, idx))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
