import {
  About,
  Clients,
  Contact,
  Footer,
  Hero,
  Navbar,
  Projects,
  Skills
} from '@/components';
import {
  ABOUT_SECTION,
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

function App() {
  return (
    <BrowserRouter>
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
          <Skills />
        </section>
        <section id={CONTACT_SECTION}>
          <Contact />
        </section>
        <section id={FOOTER_SECTION}>
          <Footer />
        </section>
      </main>
      {/* <div>
        Icons made from{' '}
        <a href="https://www.onlinewebfonts.com/icon">svg icons</a>is licensed{' '}
        by CC BY 4.0
      </div> */}
    </BrowserRouter>
  );
}

export default App;
