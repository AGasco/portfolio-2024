import { AnimatedLine } from '@/components';
import { clients } from '@/data';
import { useInView } from '@/hooks';
import { Client } from '@/types';
import { useRef } from 'react';
import ClientLogo from './ClientLogo';
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
          I've had the privilege of collaborating with a diverse range of
          companies, from innovative startups to established industry leaders.
          Here are some of them.
        </div>
        <div className="clients__logos">
          {clients.map((client, idx) => (
            <ClientLogo
              client={client as Client}
              transitionDelay={`${idx * 0.15}s`}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clients;
