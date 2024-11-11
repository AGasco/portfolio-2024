import {
  BREAKPOINT_DESKTOP,
  BREAKPOINT_XLDESKTOP,
  IDLE,
  NEXT,
  PREVIOUS,
  SMALLER,
  WAITING
} from '@/constants';
import { projects } from '@/data';
import {
  useBreakpointComparison,
  useFinalTrigger,
  useInView,
  useScrollOpacity
} from '@/hooks';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faChevronLeft,
  faChevronRight,
  faLaptop
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import './Projects.scss';
import ProjectScreenshot from './ProjectScreenshot';
import useProjectAnimation from './useProjectAnimation';

const triggerPointEnter = window.innerHeight * 0.6;
const offset = 0.4;

const Projects = () => {
  const topRef = useRef(null);
  const screenshotsRef = useRef(null);
  const opacity = useScrollOpacity(topRef, offset);

  const finalTrigger = useFinalTrigger(triggerPointEnter, {
    [BREAKPOINT_XLDESKTOP]: 0.6,
    default: 1
  });
  const isInView = useInView(screenshotsRef, finalTrigger);
  const {
    currentProjectIdx,
    displayedProjectIdx,
    isAnimating,
    animDirection,
    animPhase,
    targetPosition,
    setTargetPosition,
    handleNavigation
  } = useProjectAnimation();

  const isSmallerThanDesktop = useBreakpointComparison(
    BREAKPOINT_DESKTOP,
    SMALLER
  );

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
      {isSmallerThanDesktop ? (
        <p style={{ fontSize: '22px' }}>
          This section is currently under development for mobile & tablets.{' '}
          <br />
          You can view this section in a desktop for now. Sorry for the
          inconveniences.
        </p>
      ) : (
        <>
          <div className="projects__controls">
            <button
              onClick={() => handleNavigation(PREVIOUS)}
              disabled={isAnimating}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <span>
              {String(currentProjectIdx + 1).padStart(2, '0')} /{' '}
              {String(projects.length).padStart(2, '0')}
            </span>
            <button
              onClick={() => handleNavigation(NEXT)}
              disabled={isAnimating}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
          <div
            className={`projects__content ${
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
                  {links && (
                    <>
                      <h4>Links</h4>
                      <Link to={links.demo} target="_blank">
                        <FontAwesomeIcon icon={faLaptop} size="lg" />
                      </Link>
                      <Link to={links.github} target="_blank">
                        <FontAwesomeIcon icon={faGithub} size="lg" />
                      </Link>
                    </>
                  )}
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
                {screenshots?.map((src, idx) => (
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
        </>
      )}
    </div>
  );
};

export default Projects;
