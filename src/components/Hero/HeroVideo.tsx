import './HeroVideo.scss';

const HeroVideo = () => {
  return (
    <div>
      <video className="hero-video" autoPlay muted loop>
        <source src="/rotating-shape-black-720.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default HeroVideo;
