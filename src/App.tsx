import './App.css';
import './fonts.css';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <>
      <div className="hero">
        <Navbar />
        <Hero />
      </div>
      <main>{/* Rest of content */}</main>
      <div>
        Icons made from{' '}
        <a href="https://www.onlinewebfonts.com/icon">svg icons</a>is licensed{' '}
        by CC BY 4.0
      </div>
    </>
  );
}

export default App;
