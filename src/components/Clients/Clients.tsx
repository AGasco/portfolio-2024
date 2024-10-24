import { AnimatedLine } from '@/components';
import { clients } from '@/data';
import { useDeviceType, useInView } from '@/hooks';
import { Client } from '@/types';
import { useRef } from 'react';
import ClientLogo from './ClientLogo';
import './Clients.scss';
import { BREAKPOINT_XLDESKTOP } from '@/constants';

const triggerPointEnter = window.innerHeight * 0.8;

const Clients = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const device = useDeviceType();
  const finalTriggerEnter =
    device === BREAKPOINT_XLDESKTOP
      ? triggerPointEnter * 1.1
      : triggerPointEnter;
  const isInView = useInView(titleRef, finalTriggerEnter);

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
              key={client.id}
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
