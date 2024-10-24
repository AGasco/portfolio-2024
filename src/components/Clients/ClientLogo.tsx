import { Client } from '@/types';
import './ClientLogo.scss';
import { CSSProperties } from 'react';

interface Props {
  client: Client;
  transitionDelay: string;
  isInView: boolean;
}

const ClientLogo = ({ client, transitionDelay, isInView }: Props) => {
  const style: CSSProperties & { [key: string]: string } = {
    transitionDelay,
    '--logo-translateY': client.translateY || '0px'
  };

  return (
    <span className={`logo ${isInView ? 'animate' : ''}`} style={style}>
      <img src={client.logo} alt={`${client.name}'s logo`} />
    </span>
  );
};

export default ClientLogo;
