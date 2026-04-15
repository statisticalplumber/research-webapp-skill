import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RefreshCw, Info } from 'lucide-react';

interface SimulationCase {
  id: string;
  title: string;
  description: string;
  parameters: {
    gamma: number;
    delta: number;
    R: number;
    xi: number;
    xiM: number;
  };
  patternType: 'striped' | 'squared' | 'hexagonal' | 'rectangular';
  figure: number;
}

const simulationCases: SimulationCase[] = [
  {
    id: 'reference',
    title: 'Reference Case (γ = 1)',
    description: 'Squeezing exponent γ = 1 produces striped patterns, resembling elongated plaques along white-matter tracts.',
    parameters: {
      gamma: 1,
      delta: 0.6,
      R: 3.2,
      xi: 13.31,
      xiM: 0.01,
    },
    patternType: 'striped',
    figure: 2,
  },
  {
    id: 'gamma2',
    title: 'Higher Squeezing Exponent (γ = 2)',
    description: 'Increasing γ to 2 leads to squared/spotted patterns, as higher squeezing exponent increases diffusion and reduces chemotaxis.',
    parameters: {
      gamma: 2,
      delta: 0.6,
      R: 3.2,
      xi: 10.88,
      xiM: 0.01,
    },
    patternType: 'squared',
    figure: 3,
  },
  {
    id: 'higherXim',
    title: 'Increased Chemotactic Sensitivity',
    description: 'Increasing ξₘ to 0.1 results in more concentrated myelin damage, with higher contrast between maximum and minimum destroyed fractions.',
    parameters: {
      gamma: 1,
      delta: 0.6,
      R: 3.2,
      xi: 14.5,
      xiM: 0.1,
    },
    patternType: 'striped',
    figure: 4,
  },
  {
    id: 'random1',
    title: 'Random Perturbation (ξ = 13.31)',
    description: 'Starting from random initial conditions with ξ = 13.31, the system converges to a rectangular pattern.',
    parameters: {
      gamma: 1,
      delta: 0.6,
      R: 3.2,
      xi: 13.31,
      xiM: 0.01,
    },
    patternType: 'rectangular',
    figure: 5,
  },
  {
    id: 'random2',
    title: 'Random Perturbation (ξ = 14.5)',
    description: 'Starting from random initial conditions with higher ξ = 14.5, the system exhibits hexagonal symmetry.',
    parameters: {
      gamma: 1,
      delta: 0.6,
      R: 3.2,
      xi: 14.5,
      xiM: 0.01,
    },
    patternType: 'hexagonal',
    figure: 5,
  },
];

function PatternPreview({ patternType }: { patternType: SimulationCase['patternType'] }) {
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && progress < 100) {
      interval = setInterval(() => {
        setProgress((p) => Math.min(p + 1, 100));
      }, 30);
    } else if (progress >= 100) {
      setIsPlaying(false);
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [isPlaying, progress]);

  const handlePlayPause = () => {
    if (progress >= 100) {
      setProgress(0);
    }
    setIsPlaying(!isPlaying);
  };

  const patterns = {
    striped: (
      <div className="grid grid-cols-8 gap-px bg-stone-200 p-1 rounded-lg">
        {[...Array(64)].map((_, i) => {
          const col = i % 8;
          const baseDark = col < 4;
          const variation = Math.sin((i / 64) * Math.PI * 2 * (1 + progress / 50)) * 0.2;
          const intensity = baseDark ? 0.4 + variation : 0.1 + variation;
          return (
            <div
              key={i}
              className="aspect-square rounded-sm"
              style={{
                backgroundColor: `rgb(${100 + intensity * 100}, ${200 + intensity * 50}, ${100 + intensity * 50})`,
              }}
            />
          );
        })}
      </div>
    ),
    squared: (
      <div className="grid grid-cols-8 gap-px bg-stone-200 p-1 rounded-lg">
        {[...Array(64)].map((_, i) => {
          const row = Math.floor(i / 8);
          const col = i % 8;
          const baseDark = (row < 4 && col < 4) || (row >= 4 && col >= 4);
          const variation = Math.sin((i / 64) * Math.PI * 2 * (1 + progress / 50)) * 0.15;
          const intensity = baseDark ? 0.35 + variation : 0.15 + variation;
          return (
            <div
              key={i}
              className="aspect-square rounded-sm"
              style={{
                backgroundColor: `rgb(${150 + intensity * 80}, ${150 + intensity * 80}, ${255 + intensity * 50})`,
              }}
            />
          );
        })}
      </div>
    ),
    hexagonal: (
      <div className="flex items-center justify-center p-4">
        <div className="relative w-40 h-40">
          {[...Array(19)].map((_, i) => {
            const angle = (i * 2 * Math.PI) / 19;
            const radius = i === 0 ? 0 : i <= 6 ? 12 : 24;
            const x = 80 + radius * Math.cos(angle + (progress / 100) * 0.5);
            const y = 80 + radius * Math.sin(angle + (progress / 100) * 0.5);
            const intensity = 0.3 + Math.sin(progress * 0.05 + i * 0.3) * 0.2;
            return (
              <div
                key={i}
                className="absolute w-8 h-8 rounded-full"
                style={{
                  left: x - 16,
                  top: y - 16,
                  backgroundColor: `rgba(168, 85, 247, ${0.4 + intensity * 0.3})`,
                  border: '2px solid rgba(147, 51, 234, 0.6)',
                }}
              />
            );
          })}
        </div>
      </div>
    ),
    rectangular: (
      <div className="grid grid-cols-8 gap-px bg-stone-200 p-1 rounded-lg">
        {[...Array(64)].map((_, i) => {
          const row = Math.floor(i / 8);
          const col = i % 8;
          const baseDark = (col < 3 && row % 2 === 0) || (col >= 5 && row % 2 === 1);
          const variation = Math.sin((i / 64) * Math.PI * 2 * (1 + progress / 50)) * 0.25;
          const intensity = baseDark ? 0.45 + variation : 0.1 + variation;
          return (
            <div
              key={i}
              className="aspect-square rounded-sm"
              style={{
                backgroundColor: `rgb(${255 + intensity * 50}, ${150 + intensity * 70}, ${100 + intensity * 80})`,
              }}
            />
          );
        })}
      </div>
    ),
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-full max-w-xs">
        {patterns[patternType]}
        {progress > 0 && (
          <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
            <span className="text-white font-mono text-sm bg-black/50 px-3 py-1 rounded">
              {progress}%
            </span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={handlePlayPause}
          className="p-2 rounded-lg bg-green-100 hover:bg-green-200 text-green-700 transition-colors"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
        <button
          onClick={() => {
            setProgress(0);
            setIsPlaying(false);
          }}
          className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>
      <div className="w-full max-w-xs h-2 bg-stone-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-green-400 to-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function ParameterCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="bg-stone-50 rounded-lg p-3 text-center">
      <div className="text-xs text-stone-500 uppercase tracking-wide mb-1">{label}</div>
      <div className="font-mono font-semibold text-stone-800">{value}</div>
    </div>
  );
}

export function Simulations() {
  const [selectedCase, setSelectedCase] = useState<string>('reference');

  const currentCase = simulationCases.find((c) => c.id === selectedCase)!;

  return (
    <section id="simulations" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-stone-800">
            Numerical Simulations
          </h2>
          <p className="text-lg text-stone-600 max-w-4xl mx-auto leading-relaxed">
            Validation of analytical results through numerical simulations using VisualPDE
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h3 className="text-xl font-semibold mb-6 text-stone-800">
            Simulation Cases
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {simulationCases.map((testCase) => (
              <motion.button
                key={testCase.id}
                onClick={() => setSelectedCase(testCase.id)}
                className={`p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                  selectedCase === testCase.id
                    ? 'border-green-500 bg-green-50'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-semibold ${selectedCase === testCase.id ? 'text-green-800' : 'text-stone-800'}`}>
                    {testCase.title}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    selectedCase === testCase.id
                      ? 'bg-green-200 text-green-800'
                      : 'bg-stone-100 text-stone-600'
                  }`}>
                    Figure {testCase.figure}
                  </span>
                </div>
                <p className="text-sm text-stone-600 line-clamp-2">{testCase.description}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="bg-stone-50 rounded-2xl p-8 border border-stone-200">
              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-stone-800">
                    {currentCase.title}
                  </h3>
                  <p className="text-stone-600 mb-6 leading-relaxed">{currentCase.description}</p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-stone-800 mb-4 flex items-center gap-2">
                      <Info className="w-5 h-5" />
                      Fixed Parameters
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      <ParameterCard label="β" value={1} />
                      <ParameterCard label="τ" value={5} />
                      <ParameterCard label="θ" value={1} />
                      <ParameterCard label="Ω" value={1} />
                      <ParameterCard label="ζ" value={0.2} />
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-stone-800 mb-4">Variable Parameters</h4>
                    <div className="grid grid-cols-3 gap-3">
                      <ParameterCard label="γ" value={currentCase.parameters.gamma} />
                      <ParameterCard label="δ" value={currentCase.parameters.delta} />
                      <ParameterCard label="ℛ" value={currentCase.parameters.R} />
                      <ParameterCard label="ξ" value={currentCase.parameters.xi} />
                      <ParameterCard label="ξₘ" value={currentCase.parameters.xiM} />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <h4 className="font-semibold text-stone-800 mb-4">
                    Destroyed Myelin Fraction (E)
                  </h4>
                  <PatternPreview patternType={currentCase.patternType} />
                  <p className="text-sm text-stone-600 mt-4 text-center max-w-xs">
                    Evolution of the destroyed myelin fraction over time, starting from a perturbation of the equilibrium state.
                  </p>
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
          className="mt-16 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200"
        >
          <h3 className="text-xl font-semibold mb-6 text-stone-800">
            Key Observations
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h4 className="font-semibold text-stone-800 mb-3">Effect of Squeezing Exponent γ</h4>
              <p className="text-stone-600 text-sm leading-relaxed">
                A higher squeezing exponent (γ = 2) leads to higher diffusive terms and lower chemotactic terms for self-reactive immune cells. This means random movement becomes prevalent over chemotactic attraction, resulting in spotted/squared patterns instead of striped ones.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h4 className="font-semibold text-stone-800 mb-3">Effect of Chemotactic Sensitivity ξ</h4>
              <p className="text-stone-600 text-sm leading-relaxed">
                Increasing the chemotactic parameter results in myelin damage more concentrated in specific regions of the domain. This is because the motion of immune cells is more strongly driven by chemotactic attraction of cytokines, causing inflammation and myelin injury in localized areas.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16"
        >
          <div className="bg-stone-900 text-white rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-4">
              Remark on Three-Mode Analysis
            </h3>
            <p className="text-stone-300 leading-relaxed mb-4">
              The patterns depicted above have been obtained starting from a perturbation of the equilibrium. However, a weakly nonlinear analysis with three active dominant eigenmodes (m = 3) can lead to the emergence of:
            </p>
            <ul className="space-y-2 text-stone-300">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-green-400 rounded-full" />
                <span><strong>Striped patterns</strong> when ρ₁ ≠ 0, ρ₂ = ρ₃ = 0</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-blue-400 rounded-full" />
                <span><strong>Hexagonal patterns</strong> when ρ₁ = ρ₂ = ρ₃ ≠ 0</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-orange-400 rounded-full" />
                <span><strong>Rectangular patterns</strong> when 0 ≠ ρ₁ = ρ₂ ≠ ρ₃ ≠ 0</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
