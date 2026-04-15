import { useState, useEffect } from 'react';
import HeroScene from './components/HeroScene';
import Introduction from './components/Introduction';
import Architecture from './components/Architecture';
import RetrievalPerformance from './components/RetrievalPerformance';
import AnalysisResults from './components/AnalysisResults';
import CandidateDiscoveries from './components/CandidateDiscoveries';
import Discussion from './components/Discussion';
import AuthorsAndCitation from './components/AuthorsAndCitation';
import { Menu, X, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

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
    { label: 'Introduction', href: '#introduction' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Performance', href: '#performance' },
    { label: 'Analysis', href: '#analysis' },
    { label: 'Discoveries', href: '#discoveries' },
    { label: 'Discussion', href: '#discussion' },
    { label: 'Authors', href: '#authors' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-elisa-blue to-elisa-teal rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-stone-900">ELISA</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="px-4 py-2 text-sm font-medium text-stone-600 hover:text-elisa-blue rounded-lg hover:bg-elisa-blue/5 transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <a
                href="https://github.com/omaruno/ELISA-An-AI-Agent-for-Expression-Grounded-Discovery-in-Single-Cell-Genomics"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 px-4 py-2 bg-elisa-blue text-white rounded-lg text-sm font-medium hover:bg-elisa-dark transition-colors"
              >
                View Code
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-stone-600 hover:text-elisa-blue"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-t border-stone-200"
          >
            <div className="px-8 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-4 py-3 text-stone-600 hover:text-elisa-blue hover:bg-elisa-blue/5 rounded-lg transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <a
                href="https://github.com/omaruno/ELISA-An-AI-Agent-for-Expression-Grounded-Discovery-in-Single-Cell-Genomics"
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-4 px-4 py-3 bg-elisa-blue text-white rounded-lg text-center font-medium"
              >
                View Code
              </a>
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Main Content */}
      <main>
        <HeroScene />
        <Introduction />
        <Architecture />
        <RetrievalPerformance />
        <AnalysisResults />
        <CandidateDiscoveries />
        <Discussion />
        <AuthorsAndCitation />
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-elisa-blue to-elisa-teal rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">ELISA</span>
              </div>
              <p className="text-sm">
                Interpretable Hybrid Generative AI Agent for Expression-Grounded Discovery in Single-Cell Genomics
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={() => scrollToSection('#architecture')} className="hover:text-elisa-blue transition-colors">
                    Architecture
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('#performance')} className="hover:text-elisa-blue transition-colors">
                    Performance
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('#discoveries')} className="hover:text-elisa-blue transition-colors">
                    Discoveries
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://github.com/omaruno/ELISA-An-AI-Agent-for-Expression-Grounded-Discovery-in-Single-Cell-Genomics"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-elisa-blue transition-colors flex items-center gap-2"
                  >
                    <span>GitHub Repository</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://cellxgene.cziscience.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-elisa-blue transition-colors flex items-center gap-2"
                  >
                    <span>CZ CELLxGENE Discover</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-stone-800 text-center text-sm">
            <p>
              © 2026 Omar Coser. This manuscript has been submitted for peer review.
            </p>
            <p className="mt-2">
              If you use ELISA in your research, please cite this work.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
