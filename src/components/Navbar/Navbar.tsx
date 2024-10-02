import { CONTACT_SECTION, SCROLL_EVENT } from '@/constants';
import { useEffect, useState } from 'react';
import { NavHashLink } from 'react-router-hash-link';
import './Navbar.scss';

const Navbar = () => {
  const [isScrolled, setScrolled] = useState(false);
  const [hasReachedContact, setReachedContact] = useState(false);

  console.log(hasReachedContact);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setScrolled(scrollPosition > 0);

    const contactSection = document.querySelector(`#${CONTACT_SECTION}`);
    if (contactSection) {
      const { top, bottom } = contactSection.getBoundingClientRect();
      const triggerOffset = 75; // px

      const isVisible = top <= triggerOffset && bottom >= 0;

      setReachedContact(isVisible);
    }
  };

  useEffect(() => {
    window.addEventListener(SCROLL_EVENT, handleScroll);
    return () => {
      window.removeEventListener(SCROLL_EVENT, handleScroll);
    };
  }, []);

  return (
    <nav
      className={`navbar ${
        hasReachedContact
          ? 'navbar--reachedContact'
          : isScrolled
          ? 'navbar--scrolled'
          : ''
      }`}
    >
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
