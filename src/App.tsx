import { About, Hero, Navbar, Projects, Clients } from '@/components';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import {
  ABOUT_SECTION,
  CLIENTS_SECTION,
  CONTACT_SECTION,
  HERO_SECTION,
  PROJECTS_SECTION,
  SERVICES_SKILLS_SECTION
} from './constants';
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
        <section id={SERVICES_SKILLS_SECTION}>
          <h2>Services & Skills</h2>
          {/* TODO Content for services & skills */}
        </section>
        <section id={CONTACT_SECTION}>
          <h2>Contact</h2>
          {/* TODO Content for Contact */}
        </section>
      </main>
      <div>
        Icons made from{' '}
        <a href="https://www.onlinewebfonts.com/icon">svg icons</a>is licensed{' '}
        by CC BY 4.0
      </div>
    </BrowserRouter>
  );
}

export default App;
