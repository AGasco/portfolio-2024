const HeroBackgroundVideo = () => {
  return (
    <div className="video-container">
      <video className="background-video" autoPlay muted loop>
        <source src="/public/animated-background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default HeroBackgroundVideo;
