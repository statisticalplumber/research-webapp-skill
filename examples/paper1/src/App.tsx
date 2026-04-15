import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { HeroScene } from './components/HeroScene';
import { Introduction } from './components/Introduction';
import { WashInDiagram } from './components/WashInDiagram';
import { ParameterSpace } from './components/ParameterSpace';
import { EarlyUniverse } from './components/EarlyUniverse';
import { Authors } from './components/Authors';
import { Menu, X, BookOpen, ArrowDown } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'introduction', label: 'Introduction' },
    { id: 'mechanism', label: 'Mechanism' },
    { id: 'results', label: 'Results' },
    { id: 'cosmology', label: 'Cosmology' },
    { id: 'authors', label: 'Authors' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-cosmic-900 text-white overflow-x-hidden">
      {/* Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-cosmic-900/95 md:hidden"
          >
            <div className="flex flex-col h-full p-6">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="self-end p-2 text-white"
              >
                <X className="w-8 h-8" />
              </button>
              <nav className="flex-1 flex flex-col justify-center gap-6">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-2xl font-serif text-left hover:text-starlight-gold transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-cosmic-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-starlight-gold" />
              <span className="text-xl font-serif font-bold gradient-text">
                WIFI-LG
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-sm font-medium text-gray-300 hover:text-starlight-gold transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2 text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Canvas camera={{ position: [0, 0, 50], fov: 60 }}>
          <HeroScene />
        </Canvas>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight">
              <span className="gradient-text glow-text">
                Freeze-in Leptogenesis
              </span>
              <br />
              <span className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-300">
                without the need for right-handed neutrino oscillations
              </span>
            </h1>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {['Martin A. Mojahed', 'Sascha Weber'].map((name, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.2 }}
                  className="glass-card px-6 py-3"
                >
                  <p className="text-starlight-gold font-medium">{name}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-8"
            >
              <button
                onClick={() => scrollToSection('introduction')}
                className="flex items-center gap-2 mx-auto px-8 py-3 bg-starlight-gold text-cosmic-900 rounded-lg font-medium hover:bg-starlight-gold/90 transition-colors"
              >
                Explore the Paper
                <ArrowDown className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-8 h-8 text-starlight-gold/50" />
        </div>
      </section>

      {/* Content Sections */}
      <main className="relative z-10">
        <Introduction />
        <WashInDiagram />
        <ParameterSpace />
        <EarlyUniverse />
        <Authors />
      </main>

      {/* Footer */}
      <footer className="bg-cosmic-800 py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <BookOpen className="w-8 h-8 text-starlight-gold" />
            <span className="text-2xl font-serif font-bold gradient-text">
              WIFI-LG
            </span>
          </div>

          <p className="text-gray-400 mb-4">
            Freeze-in leptogenesis without the need for right-handed neutrino oscillations
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-6">
            <a href="#introduction" className="text-gray-300 hover:text-starlight-gold transition-colors">
              Introduction
            </a>
            <a href="#mechanism" className="text-gray-300 hover:text-starlight-gold transition-colors">
              Mechanism
            </a>
            <a href="#results" className="text-gray-300 hover:text-starlight-gold transition-colors">
              Results
            </a>
            <a href="#authors" className="text-gray-300 hover:text-starlight-gold transition-colors">
              Authors
            </a>
          </div>

          <p className="text-gray-500 text-sm">
            Interactive visualization of research paper • December 2025
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
