import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Sigma, Network, Lightbulb, ChevronRight, Menu, X } from 'lucide-react';
import { useState } from 'react';
import './App.css';

// Import pages
import HomePage from './pages/HomePage';
import AFAExplorer from './pages/AFAExplorer';
import LieAlgebraExplorer from './pages/LieAlgebraExplorer';
import S3AssociativeDemo from './pages/S3AssociativeDemo';
import PaperSummary from './pages/PaperSummary';

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: BookOpen },
    { path: '/afa', label: 'AFA Explorer', icon: Sigma },
    { path: '/lie-algebra', label: 'Lie Algebra', icon: Network },
    { path: '/s3-associative', label: 'S₃-Associative', icon: Lightbulb },
    { path: '/summary', label: 'Paper Summary', icon: BookOpen },
  ];

  return (
    <>
      <nav className="desktop-nav">
        <div className="nav-brand">
          <Sigma className="nav-logo" />
          <span>Pre-Lie Structures</span>
        </div>
        <div className="nav-links">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-nav"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="mobile-nav-link"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                  <ChevronRight size={16} className="mobile-nav-arrow" />
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/afa" element={<AFAExplorer />} />
            <Route path="/lie-algebra" element={<LieAlgebraExplorer />} />
            <Route path="/s3-associative" element={<S3AssociativeDemo />} />
            <Route path="/summary" element={<PaperSummary />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
