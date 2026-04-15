import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ExternalLink, BookOpen } from 'lucide-react';
import { HeroScene } from './components/HeroScene';
import { MethodologyDiagram, ProblemStatement } from './components/Methodology';
import { AlgorithmVisualizer } from './components/AlgorithmVisualizer';
import { ResultsCharts } from './components/ResultsCharts';
import { AuthorsSection } from './components/Authors';

const sections = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'methodology', label: 'Methodology' },
  { id: 'results', label: 'Results' },
  { id: 'authors', label: 'Authors' }
];

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        isScrolled ? 'bg-stone-900/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-yellow-500" />
            <span className="font-semibold text-stone-100">CDWF Research</span>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-8">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="text-sm font-medium text-stone-300 hover:text-yellow-500 transition-colors"
              >
                {section.label}
              </button>
            ))}
            <a
              href="https://github.com/yasmeenfozi/Constraint-Driven-Warm-Freeze"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-stone-900 rounded-lg font-medium transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View Paper
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-300 hover:text-yellow-500"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pb-4"
            >
              <div className="flex flex-col gap-2 pt-4 border-t border-stone-700">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      scrollToSection(section.id);
                      setMobileMenuOpen(false);
                    }}
                    className="text-left px-4 py-2 text-sm font-medium text-stone-300 hover:bg-stone-800 rounded-lg transition-colors"
                  >
                    {section.label}
                  </button>
                ))}
                <a
                  href="https://github.com/yasmeenfozi/Constraint-Driven-Warm-Freeze"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-stone-900 rounded-lg font-medium transition-colors mt-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Paper
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

function HeroSection() {
  return (
    <section id="introduction" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HeroScene />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 gradient-bg opacity-80" />
      
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 border border-yellow-500/40 rounded-full mb-6">
            <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-yellow-300">Constraint-Driven Warm-Freeze</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-stone-100 mb-6 leading-tight">
            Efficient Transfer Learning
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              for Photovoltaic Systems
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-stone-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Detecting cyberattacks in PV monitoring and MPPT control signals with 
            lightweight models robust to bias, drift, and transient spikes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('methodology')}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-stone-900 rounded-xl font-semibold transition-all transform hover:scale-105"
            >
              Explore Methodology
              <ChevronDown className="w-5 h-5" />
            </button>
            <a
              href="https://github.com/yasmeenfozi/Constraint-Driven-Warm-Freeze"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-stone-800 hover:bg-stone-700 text-stone-100 rounded-xl font-semibold transition-all border border-stone-600"
            >
              <ExternalLink className="w-5 h-5" />
              View on GitHub
            </a>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
        >
          {[
            { value: '90–99%', label: 'Full FT Retention' },
            { value: '120×', label: 'Parameter Reduction' },
            { value: '3', label: 'Attack Types' },
            { value: '4', label: 'Datasets Evaluated' }
          ].map((stat, index) => (
            <div key={index} className="bg-stone-900/50 backdrop-blur-sm rounded-xl p-4 border border-stone-700">
              <div className="text-2xl sm:text-3xl font-bold text-yellow-500">{stat.value}</div>
              <div className="text-xs sm:text-sm text-stone-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-stone-500 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-yellow-500 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function IntroductionSection() {
  return (
    <section id="methodology" className="py-24 bg-stone-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-100 mb-4">The Challenge</h2>
          <p className="text-lg text-stone-400 max-w-3xl">
            Photovoltaic systems are increasingly vulnerable to cyberattacks through smart inverters 
            and IoT-enabled monitoring. We address three primary attack modalities:
          </p>
        </motion.div>

        <ProblemStatement />

        {/* Problem context */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-stone-900/50 rounded-xl p-6 border border-stone-700"
          >
            <h3 className="text-xl font-semibold text-stone-100 mb-4">Why This Matters</h3>
            <ul className="space-y-3 text-stone-300">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-yellow-500/20 text-yellow-500 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                <span>PV capacity exceeds <strong className="text-stone-100">1.2 TW globally</strong> with 240 GW added in 2022 alone</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-yellow-500/20 text-yellow-500 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                <span>In the US, PV accounted for <strong className="text-stone-100">over 50%</strong> of new power generation in 2023</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-yellow-500/20 text-yellow-500 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                <span>A 2019 cyberattack disrupted <strong className="text-stone-100">over 500 MW</strong> of renewable generation</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-stone-900/50 rounded-xl p-6 border border-stone-700"
          >
            <h3 className="text-xl font-semibold text-stone-100 mb-4">Edge Constraints</h3>
            <p className="text-stone-300 mb-4">
              Existing deep learning approaches are computationally prohibitive for resource-constrained 
              edge controllers. Parameter-Efficient Fine-Tuning (PEFT) methods help, but lack flexibility 
              to adhere to strict hardware budgets.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-stone-800/50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-blue-500">&lt;1%</div>
                <div className="text-xs text-stone-400">Trainable Params</div>
              </div>
              <div className="bg-stone-800/50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-green-500">&gt;99%</div>
                <div className="text-xs text-stone-400">Retention</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MethodologySection() {
  return (
    <section id="methodology" className="py-24 bg-stone-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-100 mb-4">CDWF Methodology</h2>
          <p className="text-lg text-stone-400 max-w-3xl mx-auto">
            A block-level, budget-aware fine-tuning framework that automatically selects which layers 
            remain fully trainable and which use lightweight LoRA adaptation.
          </p>
        </motion.div>

        {/* Algorithm steps */}
        <div className="mb-12">
          <MethodologyDiagram />
        </div>

        {/* Interactive visualizer */}
        <AlgorithmVisualizer />

        {/* Key insights */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Warm Start',
              description: 'Brief training phase establishes baseline and generates gradient signals for importance estimation.',
              icon: '⚡'
            },
            {
              title: 'Gradient Analysis',
              description: 'Blocks requiring substantial weight changes show larger gradients, indicating higher importance.',
              icon: '📊'
            },
            {
              title: 'Constrained Optimization',
              description: 'Select optimal configuration maximizing accuracy under explicit parameter budget f_max.',
              icon: '🎯'
            }
          ].map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-stone-800/50 backdrop-blur-sm rounded-xl p-6 border border-stone-700"
            >
              <div className="text-4xl mb-4">{insight.icon}</div>
              <h3 className="text-lg font-semibold text-stone-100 mb-2">{insight.title}</h3>
              <p className="text-sm text-stone-400 leading-relaxed">{insight.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResultsSection() {
  return (
    <section id="results" className="py-24 bg-stone-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-100 mb-4">Results & Analysis</h2>
          <p className="text-lg text-stone-400 max-w-3xl mx-auto">
            CDWF achieves near full fine-tuning performance while training only a small fraction 
            of model parameters, outperforming uniform LoRA baselines at comparable budgets.
          </p>
        </motion.div>

        <ResultsCharts />

        {/* Ablation insights */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-stone-800/50 backdrop-blur-sm rounded-xl p-6 border border-stone-700"
          >
            <h3 className="text-xl font-semibold text-stone-100 mb-4">Warm Start Sensitivity</h3>
            <p className="text-stone-400 text-sm mb-4">
              Reallocating epochs from fine-tuning to warm-start leads to substantial performance improvement, 
              indicating early full adaptation plays a critical role.
            </p>
            <div className="space-y-2">
              {[
                { epochs: 1, acc: '51.97%', retention: '79.97%' },
                { epochs: 2, acc: '56.62%', retention: '87.12%' },
                { epochs: 3, acc: '59.60%', retention: '91.71%' },
                { epochs: 4, acc: '61.64%', retention: '94.84%' }
              ].map((row, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-stone-400">{row.epochs} warm-start epochs</span>
                  <span className="font-mono text-yellow-500">{row.acc}</span>
                  <span className="font-mono text-blue-400">{row.retention}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-stone-800/50 backdrop-blur-sm rounded-xl p-6 border border-stone-700"
          >
            <h3 className="text-xl font-semibold text-stone-100 mb-4">Cross-Domain Generalization</h3>
            <p className="text-stone-400 text-sm mb-4">
              CDWF demonstrates consistent performance across image classification (CIFAR) and time-series 
              PV cyberattack detection tasks.
            </p>
            <div className="space-y-3">
              {[
                { dataset: 'CIFAR-10', retention: '96.82%', params: '58.5× reduction' },
                { dataset: 'CIFAR-100', retention: '91.66%', params: '28.7× reduction' },
                { dataset: 'PV Drift', retention: '99.20%', params: '30.9× reduction' },
                { dataset: 'PV Spike', retention: '99.88%', params: '119× reduction' }
              ].map((row, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-stone-400">{row.dataset}</span>
                  <span className="font-mono text-yellow-500">{row.retention}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AuthorsSectionWrapper() {
  return (
    <section id="authors" className="py-24 bg-stone-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-100 mb-4">Authors & Affiliations</h2>
          <p className="text-lg text-stone-400 max-w-3xl mx-auto">
            This research was conducted by researchers from institutions in Yemen and Qatar, 
            advancing the field of secure photovoltaic systems.
          </p>
        </motion.div>

        <AuthorsSection />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-stone-950 py-8 border-t border-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-stone-500">
            Based on research by Saeed, Sharshar & Guizani (2024)
          </div>
          <a
            href="https://github.com/yasmeenfozi/Constraint-Driven-Warm-Freeze"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-stone-400 hover:text-yellow-500 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View Code Repository
          </a>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-stone-950">
      <Navbar />
      <HeroSection />
      <IntroductionSection />
      <MethodologySection />
      <ResultsSection />
      <AuthorsSectionWrapper />
      <Footer />
    </div>
  );
}

export default App;
