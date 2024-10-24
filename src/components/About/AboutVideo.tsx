import './AboutVideo.scss';

const AboutVideo = ({ isLoaded = true }: { isLoaded?: boolean }) => {
  return (
    <div>
      <video
        className={`about-video ${isLoaded ? 'animate' : ''}`}
        autoPlay
        muted
        loop
      >
        <source src="/videos/rotating-shape-black-720.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default AboutVideo;
