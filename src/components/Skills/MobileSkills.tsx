import { AnimatedLine, FadeTransition } from '@/components';
import { skills } from '@/data';
import { useRef, useState } from 'react';
import {
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './MobileSkills.scss';
import { useInView } from '@/hooks';

const triggerPointEnter = window.innerHeight * 0.8;

const MobileSkills = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, triggerPointEnter);

  const [currentIndex, setCurrentIndex] = useState(0);
  const curSkill = skills[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? skills.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === skills.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="mobile-skills">
      <div
        className={`mobile-skills__title ${isInView ? 'animate' : ''}`}
        ref={titleRef}
      >
        <AnimatedLine animate={isInView} />
        <h2>Skills</h2>
      </div>
      <div className="mobile-skills__selector">
        <button onClick={handlePrev} className="mobile-skills__arrow">
          <FontAwesomeIcon icon={faChevronLeft} color="white" />
        </button>
        <h2 className="mobile-skills__name">{curSkill.name}</h2>
        <button onClick={handleNext} className="mobile-skills__arrow">
          <FontAwesomeIcon icon={faChevronRight} color="white" />
        </button>
      </div>
      <div className="mobile-skills__content">
        <FadeTransition trigger={curSkill.id}>
          <div className="skills__content">
            <img src={curSkill.logo} alt={`${curSkill.name}'s logo`} />
            <h2>{curSkill.name}</h2>
            <p>{curSkill.description}</p>
          </div>
        </FadeTransition>
      </div>
    </div>
  );
};

export default MobileSkills;
