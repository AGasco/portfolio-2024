import './ContactVideo.scss';

const ContactVideo = () => {
  return (
    <video className="contact-video" autoPlay muted loop>
      <source src="/rotating-shape-white.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default ContactVideo;
