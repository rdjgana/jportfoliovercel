import { useEffect, useState } from 'react';
import useLenis from './hooks/useLenis';

import Loader from './components/Loader';
import ScrollProgress from './components/ScrollProgress';
import CursorGlow from './components/CursorGlow';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Marquee from './components/Marquee';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  useLenis();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-canvas text-ink">
      <Loader done={loaded} />
      <ScrollProgress />
      <CursorGlow />
      <div className="grain" aria-hidden="true" />

      <Navbar />

      <main className="relative">
        <Hero />
        <About />
        <Marquee />
        <Services />
        <Portfolio />
        <Process />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
