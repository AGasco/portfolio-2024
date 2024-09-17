import './Hero.scss';
import HeroBackgroundVideo from './HeroBackgroundVideo';

const Hero = () => {
  return (
    <div className="hero-banner">
      <HeroBackgroundVideo />
      <div className="hero-content">
        <h1>Your Main Heading</h1>
        <p>Your Subheading or Call to Action</p>
      </div>
    </div>
  );
};

export default Hero;
