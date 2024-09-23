import { AnimatedLine } from '@/components';
import { clients } from '@/data';
import { useInView } from '@/hooks';
import { useRef } from 'react';
import './Clients.scss';

const triggerPointEnter = window.innerHeight * 0.8;
const triggerPointExit = window.innerHeight * 0.2;

const Clients = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, triggerPointEnter, triggerPointExit);

  return (
    <div className="clients">
      <div
        className={`clients__title ${isInView ? 'animate' : ''}`}
        ref={titleRef}
      >
        <AnimatedLine animate={isInView} />
        <h2>Clients</h2>
      </div>
      <div className="clients__content">
        <div className={`clients__description ${isInView ? 'animate' : ''}`}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod itaque
          at porro? Rem explicabo, ipsam iusto quasi eveniet ratione quia magni
          reprehenderit adipisci, aspernatur, minus eius enim delectus unde
          quod.
        </div>
        <div className="clients__logos">
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
