import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { SECTION_ORDER } from '../types';

function NavigationItem({ section, activeSection, onNavigate }: {
  section: typeof SECTION_ORDER[0];
  activeSection: string;
  onNavigate: (id: string) => void;
}) {
  const isActive = activeSection === section.id;
  
  return (
    <button
      onClick={() => onNavigate(section.id)}
      className={`
        px-4 py-2 rounded-lg transition-all duration-300
        ${isActive 
          ? 'bg-academic-gold text-stone-900 font-semibold' 
          : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800/50'}
      `}
    >
      {section.title}
    </button>
  );
}

export function Navigation({ activeSection, onNavigate }: {
  activeSection: string;
  onNavigate: (id: string) => void;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-stone-900/80 backdrop-blur-md border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-academic-gold rounded-lg flex items-center justify-center">
              <span className="text-stone-900 font-bold text-lg">P</span>
            </div>
            <span className="text-stone-100 font-semibold hidden sm:block">
              Pre-Lie Structures
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {SECTION_ORDER.map((section) => (
              <NavigationItem
                key={section.id}
                section={section}
                activeSection={activeSection}
                onNavigate={onNavigate}
              />
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-stone-400 hover:text-stone-100"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-stone-900 border-b border-stone-800 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {SECTION_ORDER.map((section) => (
                <NavigationItem
                  key={section.id}
                  section={section}
                  activeSection={activeSection}
                  onNavigate={(id) => {
                    onNavigate(id);
                    setIsMobileMenuOpen(false);
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
