import { CurvedArrow } from '@/components';
import { BREAKPOINT_MOBILE, BREAKPOINT_TABLET } from '@/constants';
import { useDeviceType } from '@/hooks';
import { useEffect, useState } from 'react';
import './Hero.scss';
import HeroVideo from './HeroVideo';
import QuoteGenerator from './QuoteGenerator';

const Hero = () => {
  const [isLoaded, setLoaded] = useState(false);
  const device = useDeviceType();

  console.log('device', device);

  useEffect(() => {
    const heroContent = document.querySelector('.hero-content');
    setLoaded(Boolean(heroContent));
  }, []);

  return (
    <div className="hero-banner">
      <HeroVideo isLoaded={isLoaded} />
      <div className="hero-content">
        <div className="headings">
          <h1>Hey, I am Antonio</h1>
          <h2>a frontend developer</h2>

          {device !== BREAKPOINT_MOBILE && device !== BREAKPOINT_TABLET && (
            <>
              <CurvedArrow
                className={`hero-arrow ${isLoaded ? 'animate' : ''}`}
              />
              <span
                className={`hero-arrow-message ${isLoaded ? 'animate' : ''}`}
              >
                * some inspiring quotes for you
              </span>
            </>
          )}
        </div>

        {/* Maybe put it below the heading on mobile */}
        {device !== BREAKPOINT_MOBILE && device !== BREAKPOINT_TABLET && (
          <QuoteGenerator isLoaded={isLoaded} />
        )}
      </div>
    </div>
  );
};

export default Hero;
