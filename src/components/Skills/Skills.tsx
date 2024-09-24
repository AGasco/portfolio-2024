import { AnimatedLine } from '@/components';
import { skills } from '@/data';
import { useInView } from '@/hooks';
import { Skill } from '@/types';
import { useEffect, useRef, useState } from 'react';
import './Skills.scss';

const triggerPointEnter = window.innerHeight * 0.8;
const triggerPointExit = window.innerHeight - 1000;

const Skills = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, triggerPointEnter, triggerPointExit);

  const [curSkill, setCurSkill] = useState<Skill | null>(null);
  const [newSkill, setNewSkill] = useState<Skill | null>(null);
  const [isFadingOut, setFadingOut] = useState(false);
  const [isFadingIn, setFadingIn] = useState(false);

  const handleSelectSkill = (skill: Skill) => {
    if (skill === curSkill) return;

    setNewSkill(skill);

    if (curSkill) {
      setFadingOut(true);
    } else {
      setCurSkill(skill);
      setFadingIn(true);
    }
  };

  useEffect(() => {
    if (isFadingOut) {
      const timer = setTimeout(() => {
        setCurSkill(newSkill);
        setFadingOut(false);
        setFadingIn(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isFadingOut, newSkill]);

  useEffect(() => {
    if (isFadingIn) {
      const fadeInTimer = setTimeout(() => {
        setFadingIn(false);
      }, 1000);
      return () => clearTimeout(fadeInTimer);
    }
  }, [isFadingIn]);

  return (
    <div className="skills">
      <div className="skills__left">
        <div
          className={`skills__title ${isInView ? 'animate' : ''}`}
          ref={titleRef}
        >
          <AnimatedLine animate={isInView} />
          <h2>Skills</h2>
        </div>
        <div className={`skills__menu ${isInView ? 'animate' : ''}`}>
          <ul>
            {skills.map((skill) => (
              <div
                className={`skills__menuItem ${
                  newSkill === skill ? 'selected' : ''
                }`}
                onClick={() => handleSelectSkill(skill)}
              >
                <AnimatedLine
                  animate={newSkill === skill}
                  width="20px"
                  className="skills__menu__line"
                />
                <div className="skills__menuItem__id">{skill.id}</div>
                <div className="skills__menuItem__name">{skill.name}</div>
              </div>
            ))}
          </ul>
        </div>
      </div>
      <div className="skills__right">
        {curSkill && (
          <div
            className={`skills__content ${
              isFadingOut ? 'fade-out' : isFadingIn ? 'fade-in' : ''
            }`}
          >
            <img src={curSkill?.logo} alt={`${curSkill?.name}'s logo`} />
            <h2>{curSkill?.name}</h2>
            <p>{curSkill?.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Skills;
