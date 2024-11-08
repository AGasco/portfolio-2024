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
import ProjectScreenshot from './ProjectScreenshot';

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
            {screenshots.map((src, idx) => (
              <ProjectScreenshot
                idx={idx}
                src={src}
                screenshotsLength={screenshots.length}
                isInView={isInView}
                animPhase={animPhase}
                objectPosition={objectPosition}
                targetPosition={targetPosition}
                setTargetPosition={setTargetPosition}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
