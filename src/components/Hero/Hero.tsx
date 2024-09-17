import './Hero.scss';
import HeroBackgroundVideo from './HeroBackgroundVideo';
import QuoteGenerator from './QuoteGenerator';

const Hero = () => {
  return (
    <div className="hero-banner">
      <HeroBackgroundVideo />
      <div className="hero-content">
        <div className="headings">
          <h1>Hey, I am Antonio</h1>
          <h2>a frontend developer</h2>
        </div>
        <QuoteGenerator />
      </div>
    </div>
  );
};

export default Hero;
