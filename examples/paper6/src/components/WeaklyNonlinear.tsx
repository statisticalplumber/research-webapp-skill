import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Grid3x3, Hexagon, Square, ChevronDown, ChevronUp } from 'lucide-react';

interface PatternTypeProps {
  type: 'striped' | 'squared' | 'hexagonal' | 'rectangular';
  isActive: boolean;
  onClick: () => void;
}

function PatternType({ type, isActive, onClick }: PatternTypeProps) {
  const icons = {
    striped: <Grid3x3 className="w-8 h-8" />,
    squared: <Square className="w-8 h-8" />,
    hexagonal: <Hexagon className="w-8 h-8" />,
    rectangular: <Layers className="w-8 h-8" />,
  };

  const labels = {
    striped: 'Striped',
    squared: 'Squared',
    hexagonal: 'Hexagonal',
    rectangular: 'Rectangular',
  };

  const colors = {
    striped: 'from-green-400 to-green-600',
    squared: 'from-blue-400 to-blue-600',
    hexagonal: 'from-purple-400 to-purple-600',
    rectangular: 'from-orange-400 to-orange-600',
  };

  return (
    <motion.button
      onClick={onClick}
      className={`relative p-6 rounded-xl border-2 transition-all duration-300 ${
        isActive
          ? `bg-gradient-to-br ${colors[type]} text-white border-transparent`
          : 'bg-white hover:border-stone-300'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className={`mb-3 ${isActive ? 'text-white' : 'text-stone-700'}`}>
        {icons[type]}
      </div>
      <span className={`font-semibold ${isActive ? 'text-white' : 'text-stone-800'}`}>
        {labels[type]}
      </span>
    </motion.button>
  );
}

function PatternVisualization({ type }: { type: PatternTypeProps['type'] }) {
  const [hoveredCell, setHoveredCell] = useState<number | null>(null);

  const patterns = {
    striped: (
      <div className="grid grid-cols-8 gap-1">
        {[...Array(64)].map((_, i) => {
          const col = i % 8;
          const isDark = col < 4;
          return (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                delay: i * 0.02,
                duration: 0.3,
                ease: "easeOut"
              }}
              className={`aspect-square rounded-sm transition-all duration-300 ${
                isDark
                  ? hoveredCell === i
                    ? 'bg-green-700'
                    : 'bg-green-300'
                  : hoveredCell === i
                  ? 'bg-green-500'
                  : 'bg-green-100'
              }`}
              onMouseEnter={() => setHoveredCell(i)}
              onMouseLeave={() => setHoveredCell(null)}
            />
          );
        })}
      </div>
    ),
    squared: (
      <div className="grid grid-cols-8 gap-1">
        {[...Array(64)].map((_, i) => {
          const row = Math.floor(i / 8);
          const col = i % 8;
          const isDark = (row < 4 && col < 4) || (row >= 4 && col >= 4);
          return (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                delay: i * 0.02,
                duration: 0.3,
                ease: "easeOut"
              }}
              className={`aspect-square rounded-sm transition-all duration-300 ${
                isDark
                  ? hoveredCell === i
                    ? 'bg-blue-700'
                    : 'bg-blue-300'
                  : hoveredCell === i
                  ? 'bg-blue-500'
                  : 'bg-blue-100'
              }`}
              onMouseEnter={() => setHoveredCell(i)}
              onMouseLeave={() => setHoveredCell(null)}
            />
          );
        })}
      </div>
    ),
    hexagonal: (
      <div className="flex items-center justify-center">
        <div className="relative w-48 h-48">
          {[...Array(19)].map((_, i) => {
            const angle = (i * 2 * Math.PI) / 19;
            const radius = i === 0 ? 0 : i <= 6 ? 15 : 30;
            const x = 96 + radius * Math.cos(angle);
            const y = 96 + radius * Math.sin(angle);
            return (
              <motion.div
                key={i}
                className="absolute w-10 h-10 bg-purple-300 rounded-full border-2 border-purple-500"
                style={{ left: x - 20, top: y - 20 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.2, backgroundColor: 'rgb(168, 85, 247)' }}
              />
            );
          })}
        </div>
      </div>
    ),
    rectangular: (
      <div className="grid grid-cols-8 gap-1">
        {[...Array(64)].map((_, i) => {
          const row = Math.floor(i / 8);
          const col = i % 8;
          const isDark = (col < 3 && row % 2 === 0) || (col >= 5 && row % 2 === 1);
          return (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                delay: i * 0.02,
                duration: 0.3,
                ease: "easeOut"
              }}
              className={`aspect-square rounded-sm transition-all duration-300 ${
                isDark
                  ? hoveredCell === i
                    ? 'bg-orange-700'
                    : 'bg-orange-300'
                  : hoveredCell === i
                  ? 'bg-orange-500'
                  : 'bg-orange-100'
              }`}
              onMouseEnter={() => setHoveredCell(i)}
              onMouseLeave={() => setHoveredCell(null)}
            />
          );
        })}
      </div>
    ),
  };

  return (
    <div className="flex justify-center items-center p-8 bg-stone-50 rounded-xl">
      {patterns[type]}
    </div>
  );
}

function AmplitudeEquations() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-stone-50 rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-stone-100 transition-colors"
      >
        <h4 className="font-semibold text-stone-800">Amplitude Equations</h4>
        {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>

      {expanded && (
        <div className="p-6 bg-white border-t border-stone-100">
          <div className="bg-stone-900 text-white p-6 rounded-lg overflow-x-auto mb-4">
            <pre className="font-mono text-sm">
              {`s₀·dρ₁/dt = ξₘ·ρ₁ + s₁·ρ₁³ + s₂·ρ₂²·ρ₁
s₀·dρ₂/dt = ξₘ·ρ₂ + s₁·ρ₂³ + s₂·ρ₁²·ρ₂

where:
ξₘ = (ξ - ξc) / ξc  (reduced control parameter)
s₀ = (ρᵣ + σ꜀) / (kc²·ξc·Φ̃₁)
sᵢ = rᵢ / (kc²·ξc·Φ̃₁)  for i = 1, 2`}
            </pre>
          </div>
          <p className="text-stone-600 text-sm">
            These equations describe the slow evolution of pattern amplitudes near the bifurcation point. The coefficients s₁ and s₂ determine which pattern (striped or squared) is stable.
          </p>
        </div>
      )}
    </div>
  );
}

export function WeaklyNonlinearAnalysis() {
  const [selectedPattern, setSelectedPattern] = useState<'striped' | 'squared' | 'hexagonal' | 'rectangular'>('striped');

  const patternInfo = {
    striped: {
      title: 'Striped Pattern',
      description: 'Band-like configurations that may represent elongated plaques along white-matter tracts, such as "Dawson\'s fingers" in MS.',
      conditions: ['s₁ &lt; 0', 's₂ &lt; s₁ &lt; 0'],
      biological: 'Elongated demyelinated areas following the orientation of deep medullary veins or fiber bundles',
    },
    squared: {
      title: 'Squared Pattern',
      description: 'Spot-like or concentric arrangements that reflect focal or concentric demyelinating areas.',
      conditions: ['s₁ &lt; -|s₂|'],
      biological: 'Focal lesions or the concentric rings characteristic of Balo\'s sclerosis',
    },
    hexagonal: {
      title: 'Hexagonal Pattern',
      description: 'Hexagonal symmetry arising from the interaction of three dominant eigenmodes.',
      conditions: ['ρ₁ = ρ₂ = ρ₃ ≠ 0'],
      biological: 'Hexagonally arranged demyelinated regions',
    },
    rectangular: {
      title: 'Rectangular Pattern',
      description: 'Rectangular symmetry from unequal interaction of three eigenmodes.',
      conditions: ['0 ≠ ρ₁ = ρ₂ ≠ ρ₃ ≠ 0'],
      biological: 'Rectangular arrangements of demyelinated areas',
    },
  };

  return (
    <section id="weakly-nonlinear" className="py-24 bg-stone-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-stone-800">
            Weakly Nonlinear Analysis
          </h2>
          <p className="text-lg text-stone-600 max-w-4xl mx-auto leading-relaxed">
            Beyond Turing analysis: exploring pattern formation through amplitude equations near the bifurcation threshold
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-semibold mb-8 text-stone-800">
            Select a Pattern Type
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(Object.keys(patternInfo) as Array<keyof typeof patternInfo>).map((type) => (
              <PatternType
                key={type}
                type={type}
                isActive={selectedPattern === type}
                onClick={() => setSelectedPattern(type)}
              />
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPattern}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="mb-16"
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 border-b border-stone-200">
                <h3 className="text-2xl font-semibold mb-2 text-stone-800">
                  {patternInfo[selectedPattern].title}
                </h3>
                <p className="text-stone-600">{patternInfo[selectedPattern].description}</p>
              </div>
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-stone-800 mb-4">Mathematical Conditions</h4>
                    <ul className="space-y-3">
                      {patternInfo[selectedPattern].conditions.map((cond, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span className="font-mono text-stone-700">{cond}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 p-4 bg-stone-50 rounded-lg">
                      <h5 className="font-semibold text-stone-800 mb-2">Biological Interpretation</h5>
                      <p className="text-sm text-stone-600">{patternInfo[selectedPattern].biological}</p>
                    </div>
                  </div>
                  <div>
                    <PatternVisualization type={selectedPattern} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-semibold mb-6 text-stone-800">
            Amplitude Equations
          </h3>
          <p className="text-stone-600 mb-6 leading-relaxed">
            Near the bifurcation threshold, the system's dynamics evolve slowly, allowing us to study pattern formation through amplitude equations. These equations describe how the pattern amplitudes ρ₁ and ρ₂ evolve in time.
          </p>
          <AmplitudeEquations />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200">
            <h3 className="text-xl font-semibold mb-4 text-stone-800">
              Key Insights from Weakly Nonlinear Analysis
            </h3>
            <ul className="space-y-3 text-stone-700">
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-semibold mt-1">•</span>
                <span>The squeezing exponent γ controls the diffusive term and chemotactic response</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-semibold mt-1">•</span>
                <span>Higher γ leads to higher diffusion and lower chemotaxis, favoring spotted patterns</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-semibold mt-1">•</span>
                <span>Chemotactic sensitivity ξ determines the concentration of myelin damage</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-semibold mt-1">·</span>
                <span>The analysis provides a mechanistic explanation for diverse lesion morphologies in MS</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
