import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import Features from './Components/Features';
import './index.css';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <Hero />
        <Features />
      </main>
    </div>  );
}

export default App;