import { SCROLL_EVENT } from '@/constants';
import { clients } from '@/data';
import { useEffect, useRef, useState } from 'react';
import './Clients.scss';

const Clients = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);
  const [isInView, setInView] = useState(false);

  const handleScroll = () => {
    const section = titleRef.current;
    if (section) {
      const sectionRect = section.getBoundingClientRect();
      const sectionTop = sectionRect.top;
      const sectionBottom = sectionRect.bottom;
      const triggerPointEnter = window.innerHeight * 0.8;
      const triggerPointExit = window.innerHeight * 0.2;

      if (
        sectionTop <= triggerPointEnter &&
        sectionBottom >= triggerPointExit
      ) {
        setInView(true);
      } else {
        setInView(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener(SCROLL_EVENT, handleScroll);
    return () => {
      window.removeEventListener(SCROLL_EVENT, handleScroll);
    };
  }, []);

  return (
    <div className="clients">
      <div
        className={`clients__title ${isInView ? 'animate' : ''}`}
        ref={titleRef}
      >
        <div className="clients__lineContainer">
          <span className={`line ${isInView ? 'animate' : ''}`}></span>
        </div>
        <h2>Clients</h2>
      </div>
      <div className="clients__content">
        <div className={`clients__description ${isInView ? 'animate' : ''}`}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod itaque
          at porro? Rem explicabo, ipsam iusto quasi eveniet ratione quia magni
          reprehenderit adipisci, aspernatur, minus eius enim delectus unde
          quod.
        </div>
        <div className="clients__logos" ref={logosRef}>
          {clients.map((client, idx) => (
            <span
              key={client.id}
              className={`logo ${isInView ? 'animate' : ''}`}
              style={{ transitionDelay: `${idx * 0.15}s` }}
            >
              <img src={client.logo} alt={`${client.name}'s logo`} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clients;
