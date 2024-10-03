import { CONTACT_SECTION, SCROLL_EVENT } from '@/constants';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { NavHashLink } from 'react-router-hash-link';
import './Navbar.scss';

const Navbar = () => {
  const [isScrolled, setScrolled] = useState(false);
  const [hasReachedContact, setReachedContact] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = () => {
    if (isMobileMenuOpen) setMobileMenuOpen(false);
  };

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
        <NavHashLink smooth to="#" className="navbar__logo navbar__link">
          antoniofgasco
        </NavHashLink>

        {/* Hamburger Icon */}
        <div
          className="navbar__hamburger"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <FontAwesomeIcon icon={faTimes} />
          ) : (
            <FontAwesomeIcon icon={faBars} />
          )}
        </div>

        {/* Navigation Links */}
        <div className={`navbar__content ${isMobileMenuOpen ? 'active' : ''}`}>
          <NavHashLink
            smooth
            to="#about"
            className="navbar__link"
            onClick={handleLinkClick}
          >
            About
          </NavHashLink>
          <NavHashLink
            smooth
            to="#projects"
            className="navbar__link"
            onClick={handleLinkClick}
          >
            Projects
          </NavHashLink>
          <NavHashLink
            smooth
            to="#contact"
            className="navbar__link"
            onClick={handleLinkClick}
          >
            Contact
          </NavHashLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
