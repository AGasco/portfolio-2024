import { AnimatedLine, FadeTransition } from '@/components';
import { skills } from '@/data';
import { useInView } from '@/hooks';
import { Skill } from '@/types';
import { useRef, useState } from 'react';
import './Skills.scss';

const triggerPointEnter = window.innerHeight * 0.8;
const triggerPointExit = window.innerHeight - 1000;

const Skills = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, triggerPointEnter, triggerPointExit);

  const [curSkill, setCurSkill] = useState<Skill | null>(null);
  const [newSkill, setNewSkill] = useState<Skill | null>(null);

  const handleSelectSkill = (skill: Skill) => {
    if (skill === curSkill) return;

    setNewSkill(skill);
    setCurSkill(skill);
  };

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
          <FadeTransition trigger={curSkill.id}>
            <div className="skills__content">
              <img src={curSkill?.logo} alt={`${curSkill?.name}'s logo`} />
              <h2>{curSkill?.name}</h2>
              <p>{curSkill?.description}</p>
            </div>
          </FadeTransition>
        )}
      </div>
    </div>
  );
};

export default Skills;
