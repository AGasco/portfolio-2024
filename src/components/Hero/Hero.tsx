import './Hero.scss';
import QuoteGenerator from './QuoteGenerator';
import HeroVideo from './HeroVideo';

const Hero = () => {
  return (
    <div className="hero-banner">
      <HeroVideo />
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
