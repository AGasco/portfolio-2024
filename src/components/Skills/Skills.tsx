import { skills } from '@/data';
import { useInView } from '@/hooks';
import { Skill } from '@/types';
import { useRef, useState } from 'react';
import './Skills.scss';

const triggerPointEnter = window.innerHeight * 0.8;
const triggerPointExit = window.innerHeight - 1000;

const ServicesSkills = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, triggerPointEnter, triggerPointExit);
  const [curSkill, setCurSkill] = useState<Skill | null>(null);

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
              <div className="skills__menuItem">
                <div className="skills__menu__lineContainer">
                  <span className={`line ${isInView ? 'animate' : ''}`}></span>
                </div>
                <div className="skills__menuItem__id">{skill.id}</div>
                <div className="skills__menuItem__name">{skill.name}</div>
              </div>
            ))}
          </ul>
        </div>
      </div>
      <div className="skills__right">
        {/* Dynamic content depending on which skill/service is selected on the left */}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
        magnam illo commodi ut nulla sit delectus temporibus, libero, nesciunt
        tenetur odit voluptatem quos itaque, eaque sed laborum? Error eos
        repudiandae nesciunt eaque minus, corrupti, illum est quasi ab veniam
        placeat impedit ducimus numquam expedita sunt nam aliquam quidem, in
        ullam!
      </div>
    </div>
  );
};

export default ServicesSkills;
