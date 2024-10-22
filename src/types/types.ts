export interface Quote {
  id: number;
  quote: string;
  author: string;
  image: string;
  date: string;
  wikipedia: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  screenshots: string[];
  backgroundColor: string;
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
