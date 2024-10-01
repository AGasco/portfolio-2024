import { CurvedArrow } from '@/components';
import './Hero.scss';
import HeroVideo from './HeroVideo';
import QuoteGenerator from './QuoteGenerator';

const Hero = () => {
  return (
    <div className="hero-banner">
      <HeroVideo />
      <div className="hero-content">
        <div className="headings">
          <h1>Hey, I am Antonio</h1>
          <h2>a frontend developer</h2>
          <CurvedArrow className="hero-arrow" />
          <span className="hero-arrow-message">
            * some inspiring quotes for you
          </span>
        </div>
        <QuoteGenerator />
      </div>
    </div>
  );
};

export default Hero;
