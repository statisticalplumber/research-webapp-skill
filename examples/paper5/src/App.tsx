import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ExternalLink, ChevronDown, TrendingUp, Shield, Zap, BookOpen } from 'lucide-react';
import HeroScene from './components/HeroScene';
import PortfolioDiagram from './components/PortfolioDiagram';
import PerformanceChart from './components/PerformanceChart';
import TheorySection from './components/TheorySection';
import AuthorsSection from './components/AuthorsSection';

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
    { id: 'algorithm', label: 'Algorithm' },
    { id: 'theory', label: 'Theory' },
    { id: 'results', label: 'Results' },
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
    <div className="min-h-screen bg-stone-900">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-stone-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <TrendingUp className="w-6 h-6 text-blue-400" />
              <span className="text-xl font-bold gradient-text">Onflow</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(item.id)}
                  className="text-stone-300 hover:text-white transition-colors text-sm font-medium"
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-stone-300 hover:text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden pb-4"
              >
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left px-4 py-2 text-stone-300 hover:bg-stone-800 rounded-lg transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroScene />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            >
              <span className="gradient-text">Onflow</span>
              <br />
              <span className="text-stone-100 text-2xl md:text-3xl font-light">
                A Model-Free Online Portfolio Allocation Algorithm
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-stone-300 mb-8 max-w-3xl mx-auto"
            >
              Reinforcement learning method for optimizing portfolio allocation via gradient flows.
              Robust to transaction costs, dynamically adjusting allocations to maximize expected log returns.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <button
                onClick={() => scrollToSection('introduction')}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg hover:from-blue-500 hover:to-emerald-500 transition-all font-medium"
              >
                Explore the Paper
              </button>
              <a
                href="#"
                className="px-6 py-3 bg-stone-800 border border-stone-700 rounded-lg hover:bg-stone-700 transition-all flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                View Original
              </a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-stone-400 animate-bounce" />
        </motion.div>
      </section>

      {/* Introduction Section */}
      <section id="introduction" className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 gradient-text">Introduction</h2>
            <p className="text-stone-400 max-w-3xl mx-auto">
              Traditional portfolio theory assumes known statistical properties of asset returns,
              but in practice this information is highly uncertain.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-stone-100 mb-2">Model-Free</h3>
              <p className="text-stone-400 text-sm">
                Requires no assumptions about asset return distributions, relying solely on observed prices.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card"
            >
              <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-stone-100 mb-2">Transaction Cost Robust</h3>
              <p className="text-stone-400 text-sm">
                Maintains efficiency even with high transaction fees where other methods fail.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="card"
            >
              <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-stone-100 mb-2">Gradient Flows</h3>
              <p className="text-stone-400 text-sm">
                Uses continuous-time optimization via ODE-based updates for smoother convergence.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card"
          >
            <h3 className="text-xl font-semibold text-stone-100 mb-4">Key Contributions</h3>
            <ul className="space-y-3">
              {[
                'Softmax parameterization for portfolio weights ensuring valid allocations',
                'ODE-based gradient flow updates derived from continuous optimization theory',
                'Pseudo-Huber loss regularization for smooth transaction cost modeling',
                'Theoretical convergence to Markowitz optimal portfolio under log-normal dynamics',
                'Empirical validation on NYSE dataset showing superiority with high transaction costs',
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 text-stone-300"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Algorithm Section */}
      <section id="algorithm" className="py-20 bg-stone-800/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 gradient-text">The Onflow Algorithm</h2>
            <p className="text-stone-400 max-w-3xl mx-auto">
              A reinforcement learning approach using gradient flows for dynamic portfolio allocation
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="card"
              >
                <h3 className="text-lg font-semibold text-stone-100 mb-3">Reinforcement Learning Framework</h3>
                <p className="text-stone-300 text-sm mb-4">
                  The problem is formalized as choosing iteratively π_t+1 to maximize expected rewards:
                </p>
                <div className="bg-stone-900/50 p-4 rounded-lg font-mono text-sm text-stone-300">
                  E[ln(inner(pi_t, f_t))]
                </div>
                <p className="text-stone-300 text-sm mt-4">
                  Where f_t represents price relatives and inner denotes the inner product.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="card"
              >
                <h3 className="text-lg font-semibold text-stone-100 mb-3">Softmax Parameterization</h3>
                <p className="text-stone-300 text-sm mb-4">
                  Portfolio weights are parameterized through the softmax function:
                </p>
                <div className="bg-stone-900/50 p-4 rounded-lg font-mono text-sm text-stone-300">
                  π(k) = exp(H(k)) / Sum_l exp(H(l))
                </div>
                <p className="text-stone-300 text-sm mt-4">
                  This ensures valid probability distributions over assets while allowing gradient-based optimization.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="card"
              >
                <h3 className="text-lg font-semibold text-stone-100 mb-3">Transaction Costs</h3>
                <p className="text-stone-300 text-sm mb-4">
                  Modeled using pseudo-Huber loss for numerical stability:
                </p>
                <div className="bg-stone-900/50 p-4 rounded-lg font-mono text-sm text-stone-300">
                  ξ · Sum_k [sqrt((π(k) - π+(k))^2 + a^2) - a]
                </div>
                <p className="text-stone-300 text-sm mt-4">
                  With a = 10^-6, this provides a smooth approximation that avoids numerical instabilities.
                </p>
              </motion.div>
            </div>

            <div>
              <PortfolioDiagram />
            </div>
          </div>
        </div>
      </section>

      {/* Theory Section */}
      <TheorySection />

      {/* Results Section */}
      <section id="results" className="py-20 bg-stone-800/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 gradient-text">Numerical Results</h2>
            <p className="text-stone-400 max-w-3xl mx-auto">
              Performance evaluation on the "Old NYSE" dataset (1965-1987, 5651 daily prices)
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-stone-100">Dataset</h3>
                <p className="text-stone-400 text-sm">36 stocks from NYSE, 22 years of daily data</p>
              </div>
            </div>
          </motion.div>

          <PerformanceChart />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-8 grid md:grid-cols-2 gap-6"
          >
            <div className="card">
              <h3 className="text-lg font-semibold text-stone-100 mb-4">Turnover Analysis</h3>
              <p className="text-stone-300 text-sm mb-4">
                With 2% transaction fees, Onflow reduces daily turnover to 0.5% compared to 2% for other strategies.
                This represents ~125% annual turnover vs ~500% for competitors.
              </p>
              <div className="bg-stone-900/50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-stone-400 text-sm">Onflow Total Turnover</span>
                  <span className="text-emerald-400 font-bold">~25x</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-400 text-sm">EG/UP Total Turnover</span>
                  <span className="text-red-400 font-bold">~100x</span>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-stone-100 mb-4">Heavy-Tailed Returns</h3>
              <p className="text-stone-300 text-sm mb-4">
                All tested asset pairs displayed significant excess kurtosis (p-value ≤ 0.001), indicating
                heavy tails. Onflow maintains performance even in these challenging regimes.
              </p>
              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <p className="text-amber-400 text-sm">
                  <strong>Remark:</strong> While theoretical results assume Gaussian returns, empirical
                  tests show Onflow remains effective for distributions with non-negligible kurtosis.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Authors Section */}
      <AuthorsSection />

      {/* Footer */}
      <footer className="py-8 bg-stone-950 border-t border-stone-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-stone-500 text-sm">
            Interactive visualization of research paper on Onflow portfolio allocation algorithm.
          </p>
          <p className="text-stone-600 text-xs mt-2">
            Based on work by Gabriel Turinici and Pierre Brugiere, CEREMADE, Université Paris Dauphine - PSL
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
