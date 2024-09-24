import './Footer.scss';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__logo">antoniofgasco</div>
      <div className="footer__links">
        <p>About</p>
        <p>Projects</p>
        <p>Clients</p>
        <p>Skills</p>
        <p>Contact</p>
      </div>
      <div className="footer__socials">
        <p>Icon 1</p>
        <p>Icon 2</p>
        <p>Icon 3</p>
        <p>Icon 4</p>
      </div>
      {/* <div className="footer__createdWithLove">
        {'Created with <3 in the Canary Islands'}
      </div> */}
    </div>
  );
};

export default Footer;
