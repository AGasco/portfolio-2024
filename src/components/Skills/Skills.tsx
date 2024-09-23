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

  console.log(curSkill?.name);

  return (
    <div className="skills">
      <div className="skills__left">
        <div
          className={`skills__title ${isInView ? 'animate' : ''}`}
          ref={titleRef}
        >
          <div className="skills__lineContainer">
            <span className={`line ${isInView ? 'animate' : ''}`}></span>
          </div>
          <h2>Skills</h2>
        </div>
        <div className={`skills__menu ${isInView ? 'animate' : ''}`}>
          <ul>
            {skills.map((skill) => (
              <div
                className={`skills__menuItem ${
                  curSkill === skill ? 'selected' : ''
                }`}
                onClick={() => setCurSkill(skill)}
              >
                <div className="skills__menu__lineContainer">
                  <span
                    className={`line ${curSkill === skill ? 'animate' : ''}`}
                  ></span>
                </div>
                <div className="skills__menuItem__id">{skill.id}</div>
                <div className="skills__menuItem__name">{skill.name}</div>
              </div>
            ))}
          </ul>
        </div>
      </div>
      <div className="skills__right">
        <h2>{curSkill?.name}</h2>
        <p>{curSkill?.description}</p>
      </div>
    </div>
  );
};

export default Skills;
