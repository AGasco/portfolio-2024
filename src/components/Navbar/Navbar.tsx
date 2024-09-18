import './Navbar.scss';
import { NavHashLink } from 'react-router-hash-link';

const Navbar = () => {
  return (
    <div className="navbar">
      <NavHashLink smooth to="#" className="navbar__logo">
        antoniofgasco
      </NavHashLink>
      <div className="navbar__content">
        <NavHashLink smooth to="#about" className="navbar__link">
          About
        </NavHashLink>
        <NavHashLink smooth to="#projects" className="navbar__link">
          Projects
        </NavHashLink>
        <NavHashLink smooth to="#contact" className="navbar__link">
          Contact
        </NavHashLink>
      </div>
    </div>
  );
};

export default Navbar;
