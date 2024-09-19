import { useEffect, useState } from 'react';
import { NavHashLink } from 'react-router-hash-link';
import './Navbar.scss';
import { SCROLL_EVENT } from '@/constants';

const Navbar = () => {
  const [isScrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setScrolled(scrollPosition > 0);
  };

  useEffect(() => {
    window.addEventListener(SCROLL_EVENT, handleScroll);
    return () => {
      window.removeEventListener(SCROLL_EVENT, handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__container">
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
    </nav>
  );
};

export default Navbar;
