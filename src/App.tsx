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
  BREAKPOINT_LARGEDESKTOP,
  BREAKPOINT_XLDESKTOP,
  CLIENTS_SECTION,
  CONTACT_SECTION,
  FOOTER_SECTION,
  HERO_SECTION,
  PROJECTS_SECTION,
  SKILLS_SECTION
} from '@/constants';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import './fonts.css';
import { useDeviceType } from './hooks';

function App() {
  const device = useDeviceType();

  const isDesktopOrLarger = [
    BREAKPOINT_DESKTOP,
    BREAKPOINT_LARGEDESKTOP,
    BREAKPOINT_XLDESKTOP
  ].includes(device);

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
          {isDesktopOrLarger ? <DesktopSkills /> : <MobileSkills />}
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
