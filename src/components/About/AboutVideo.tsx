import { useEffect, useState } from 'react';
import './AboutVideo.scss';

interface Props {
  isLoaded?: boolean;
  position: 'left' | 'right';
}

const AboutVideo = ({ isLoaded = true, position }: Props) => {
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    if (isLoaded && !isActive) setActive(true);
  }, [isLoaded]);

  return (
    <div className={`about-video-wrapper ${position}`}>
      <video
        className={`about-video ${isActive || isLoaded ? 'animate' : ''}`}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
      >
        <source src="/videos/rotating-shape-black-720.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default AboutVideo;
