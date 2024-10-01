import './HeroVideo.scss';

const HeroVideo = () => {
  return (
    <div>
      <video className="hero-video" autoPlay muted loop>
        <source src="/videos/rotating-shape-black-60mb.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default HeroVideo;
