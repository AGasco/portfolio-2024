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
