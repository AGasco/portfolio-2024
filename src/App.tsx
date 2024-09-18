import './App.css';
import './fonts.css';
import { Hero, Navbar } from '@/components';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="hero">
        <Navbar />
        <Hero />
      </div>
      <main>
        <section id="about">
          <h2>About Me</h2>
          {/* TODO Content for about me */}
        </section>
        <section id="projects">
          <h2>Projects</h2>
          {/* TODO Content for projects */}
        </section>
        <section id="clients">
          <h2>Clients</h2>
          {/* TODO Content for clients */}
        </section>
        <section id="services_skills">
          <h2>Services & Skills</h2>
          {/* TODO Content for services & skills */}
        </section>
        <section id="contact">
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
