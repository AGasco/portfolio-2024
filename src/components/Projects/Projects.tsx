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
  const [targetPosition, setTargetPosition] = useState(0);
  const [isAnimating, setAnimating] = useState(false);
  const [animDirection, setAnimDirection] =
    useState<ProjectAnimDirections | null>(null);
  const [animPhase, setAnimPhase] = useState<ProjectAnimPhase>(IDLE);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    setTargetPosition(0);
  }, [currentProjectIdx]);

  // Handling animPhases and setting new project idx
  useEffect(() => {
    if (animPhase !== OUTGOING) return;

    const outgoingDuration = 1500;
    const incomingDuration = 1500;
    const waitTime = 300;
    let timeout2: NodeJS.Timeout;

    const timeout1 = setTimeout(() => {
      setAnimPhase(WAITING);

      setTimeout(() => {
        setCurrentProjectIdx((prevIdx) => {
          if (animDirection === NEXT) {
            return (prevIdx + 1) % projects.length;
          } else {
            return (prevIdx - 1 + projects.length) % projects.length;
          }
        });

        setAnimPhase(INCOMING);

        timeout2 = setTimeout(() => {
          setAnimPhase(IDLE);
          setAnimDirection(null);
          setAnimating(false);
        }, incomingDuration);
      }, waitTime);
    }, outgoingDuration);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [animPhase, animDirection]);

  // Preload images to prevent visual hiccups when switching between projects
  useEffect(() => {
    if (animPhase === WAITING) {
      const { screenshots } =
        projects[
          (currentProjectIdx +
            (animDirection === NEXT ? 1 : -1) +
            projects.length) %
            projects.length
        ];

      const imgPromises = screenshots.map(
        (src) =>
          new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = resolve;
          })
      );

      Promise.all(imgPromises).then(() => {
        setImagesLoaded(true);
      });
    } else {
      setImagesLoaded(false);
    }
  }, [animPhase, animDirection]);

  useEffect(() => {
    if (imagesLoaded && animPhase === WAITING) {
      setAnimPhase(INCOMING);
    }
  }, [imagesLoaded, animPhase]);

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
  const {
    title,
    description,
    screenshots,
    links,
    backgroundColor,
    objectPosition
  } = projects[currentProjectIdx];

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
      <div className={`projects__content`}>
        {!(animPhase === WAITING && !imagesLoaded) && (
          <div
            className={`projects__content__inner ${
              animPhase === WAITING ? 'hidden' : ''
            }`}
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
        )}
      </div>
    </div>
  );
};

export default Projects;
