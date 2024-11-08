import { IDLE, INCOMING, NEXT, OUTGOING, PREVIOUS, WAITING } from '@/constants';
import { projects } from '@/data';
import { useInView, useScrollOpacity } from '@/hooks';
import { ProjectAnimDirections, ProjectAnimPhase } from '@/types';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faChevronLeft,
  faChevronRight,
  faLaptop
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Projects.scss';

const triggerPointEnter = window.innerHeight * 0.6;
const offset = 0.4;

const Projects = () => {
  const topRef = useRef(null);
  const screenshotsRef = useRef(null);
  const opacity = useScrollOpacity(topRef, offset);
  const isInView = useInView(screenshotsRef, triggerPointEnter);

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
  }, [animPhase, animDirection, currentProjectIdx]);

  useEffect(() => {
    const currentTimeouts = timeouts.current;

    return () => {
      clearTimeout(currentTimeouts.timeout1);
      clearTimeout(currentTimeouts.timeout2);
      clearTimeout(currentTimeouts.timeout3);
    };
  }, []);

  const {
    title,
    description,
    screenshots,
    links,
    backgroundColor,
    objectPosition
  } = projects[displayedProjectIdx];

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
          opacity,
          objectPosition
        }}
        onClick={() => setTargetPosition(idx)}
      />
    );
  };

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
                ? `animate-${animPhase}`
                : ''
            }`}
          >
            {title}
          </h2>
          <p
            className={`projects__description stagger-2 ${
              animPhase !== IDLE && animPhase !== WAITING && animDirection
                ? `animate-${animPhase} description`
                : ''
            }`}
          >
            {description}
            <div className="dividerLine" />
            <div className="projects__linksContainer">
              <h4>Links</h4>
              <Link to={links.demo} target="_blank">
                <FontAwesomeIcon icon={faLaptop} size="lg" />
              </Link>
              <Link to={links.github} target="_blank">
                <FontAwesomeIcon icon={faGithub} size="lg" />
              </Link>
            </div>
          </p>
        </div>
        <div
          ref={screenshotsRef}
          className={`projects__content__screenshots stagger-3 ${
            animPhase !== IDLE && animPhase !== WAITING && animDirection
              ? `animate-${animPhase}`
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
