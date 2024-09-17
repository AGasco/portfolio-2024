import './App.css';
import Hero from './components/Hero/Hero';

function App() {
  return (
    <>
      <div className="hero">
        {/* Navbar */}
        <Hero />
      </div>
      <main>{/* Rest of content */}</main>
    </>
  );
}

export default App;
