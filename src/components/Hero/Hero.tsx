import { CurvedArrow } from '@/components';
import { BREAKPOINT_LARGEDESKTOP, LARGER } from '@/constants';
import { useBreakpointComparison } from '@/hooks';
import { useEffect, useState } from 'react';
import './Hero.scss';
import QuoteGenerator from './QuoteGenerator';

const Hero = () => {
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    const heroContent = document.querySelector('.hero-content');
    setLoaded(Boolean(heroContent));
  }, []);

  const isLargeDesktop = useBreakpointComparison(
    BREAKPOINT_LARGEDESKTOP,
    LARGER
  );

  return (
    <div className="hero-banner">
      <div className="hero-content">
        <div className="headings">
          <h1>
            Hey, <br />I am Antonio
          </h1>
          <h2>a frontend developer</h2>

          {isLargeDesktop && (
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
        {isLargeDesktop && <QuoteGenerator isLoaded={isLoaded} />}
      </div>
    </div>
  );
};

export default Hero;
