import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import './Footer.scss';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__content">
        <NavHashLink smooth to="#" className="footer__logo">
          antoniofgasco
        </NavHashLink>
        <div className="footer__linksContainer">
          <div className="footer__links">
            <h3>This site</h3>
            <NavHashLink smooth to="#projects">
              Projects
            </NavHashLink>
            <NavHashLink smooth to="#clients">
              Clients
            </NavHashLink>
            <NavHashLink smooth to="#skills">
              Skills
            </NavHashLink>
            <NavHashLink smooth to="#contact">
              Contact
            </NavHashLink>
          </div>
          <div className="footer__socials">
            <h3>Socials</h3>
            <Link
              to="https://www.linkedin.com/in/antoniofgasco/"
              target="_blank"
            >
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </Link>
            <Link to="https://github.com/AGasco" target="_blank">
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </Link>
          </div>
        </div>
      </div>
      <div className="footer__createdAt">
        Created with
        <span>
          <FontAwesomeIcon icon={faHeart} />
        </span>
        in the Canary Islands
      </div>
    </div>
  );
};

export default Footer;
