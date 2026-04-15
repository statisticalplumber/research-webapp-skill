import { useState, useEffect } from 'react';
import { HeroScene } from './components/HeroScene';
import { ProblemSection } from './components/ProblemSection';
import { StructuresSection } from './components/StructuresSection';
import { AFAScene } from './components/AFAScene';
import { ResultsSection } from './components/ResultsSection';
import { AuthorsSection } from './components/AuthorsSection';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { SECTION_ORDER } from './types';

function App() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = SECTION_ORDER.filter(s => s.id !== 'hero');
      
      for (const section of sections.reverse()) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(id);
  };

  return (
    <div className="min-h-screen bg-stone-950">
      <Navigation activeSection={activeSection} onNavigate={handleNavigate} />
      
      <main>
        <HeroScene />
        <ProblemSection />
        <StructuresSection />
        <AFAScene />
        <ResultsSection />
        <AuthorsSection />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
