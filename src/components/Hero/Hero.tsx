import { CurvedArrow } from '@/components';
import './Hero.scss';
import HeroVideo from './HeroVideo';
import QuoteGenerator from './QuoteGenerator';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    const heroArrow = document.querySelector('.hero-arrow');
    setLoaded(Boolean(heroArrow));
  }, []);

  return (
    <div className="hero-banner">
      <HeroVideo isLoaded={isLoaded} />
      <div className="hero-content">
        <div className="headings">
          <h1>Hey, I am Antonio</h1>
          <h2>a frontend developer</h2>
          <CurvedArrow className={`hero-arrow ${isLoaded ? 'animate' : ''}`} />
          <span className={`hero-arrow-message ${isLoaded ? 'animate' : ''}`}>
            * some inspiring quotes for you
          </span>
        </div>
        <QuoteGenerator isLoaded={isLoaded} />
      </div>
    </div>
  );
};

export default Hero;
