import {
  About,
  Clients,
  Contact,
  DesktopSkills,
  Footer,
  Hero,
  LoadingScreen,
  MobileSkills,
  Navbar,
  Projects,
  ScrollToTop
} from '@/components';
import {
  ABOUT_SECTION,
  BREAKPOINT_DESKTOP,
  CLIENTS_SECTION,
  CONTACT_SECTION,
  FOOTER_SECTION,
  HERO_SECTION,
  PROJECTS_SECTION,
  SKILLS_SECTION,
  SMALLER
} from '@/constants';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import './fonts.css';
import { useBreakpointComparison } from './hooks';

function App() {
  const isMobileOrTablet = useBreakpointComparison(BREAKPOINT_DESKTOP, SMALLER);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <LoadingScreen />
      <div className={HERO_SECTION}>
        <Navbar />
        <Hero />
      </div>
      <main>
        <section id={ABOUT_SECTION}>
          <About />
        </section>
        <section id={PROJECTS_SECTION}>
          <Projects />
        </section>
        <section id={CLIENTS_SECTION}>
          <Clients />
        </section>
        <section id={SKILLS_SECTION}>
          {isMobileOrTablet ? <MobileSkills /> : <DesktopSkills />}
        </section>
        <section id={CONTACT_SECTION}>
          <Contact />
        </section>
        <section id={FOOTER_SECTION}>
          <Footer />
        </section>
      </main>
    </BrowserRouter>
  );
}

export default App;
