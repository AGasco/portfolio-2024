import { IDLE, INCOMING, NEXT, OUTGOING, PREVIOUS, WAITING } from '@/constants';

export interface Quote {
  id: number;
  quote: string;
  author: string;
  image: string;
  date: string;
  wikipedia: string;
}

export interface Client {
  id: number;
  name: string;
  logo: string;
  link: string;
  translateY: string | undefined;
}

export interface Skill {
  id: string;
  name: string;
  logo: string;
  link: string;
  title: string;
  description: string;
}

export type ProjectAnimDirections = typeof NEXT | typeof PREVIOUS;
export type ProjectAnimPhase =
  | typeof IDLE
  | typeof OUTGOING
  | typeof WAITING
  | typeof INCOMING;
