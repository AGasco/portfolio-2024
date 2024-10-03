import { CONTACT_SECTION, SCROLL_EVENT } from '@/constants';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FocusTrap from 'focus-trap-react';
import { useEffect, useRef, useState } from 'react';
import { NavHashLink } from 'react-router-hash-link';
import './Navbar.scss';

const Navbar = () => {
  const [isScrolled, setScrolled] = useState(false);
  const [hasReachedContact, setReachedContact] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

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

        <div
          className={`navbar__hamburger ${isMobileMenuOpen ? 'active' : ''}`}
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

        {isMobileMenuOpen ? (
          <FocusTrap focusTrapOptions={{ allowOutsideClick: true }}>
            <div
              className={'navbar__content active'}
              ref={mobileMenuRef}
              id="navbar-menu"
              role="dialog"
              aria-modal="true"
            >
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
          </FocusTrap>
        ) : (
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
        )}
      </div>
    </nav>
  );
};

export default Navbar;
