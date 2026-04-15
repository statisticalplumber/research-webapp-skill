import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RefreshCw } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  type: 'lepton' | 'higgs' | 'rhsn';
  vx: number;
  vy: number;
  phase: number;
}

export function WashInDiagram() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeProcess, setActiveProcess] = useState<'freeze-in' | 'wash-out' | 'wash-in'>('wash-in');
  const [temperature, setTemperature] = useState(0.5);

  // Generate particles
  const particles = useMemo(() => {
    const particleList: Particle[] = [];
    for (let i = 0; i < 60; i++) {
      particleList.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        type: i % 3 === 0 ? 'lepton' : i % 3 === 1 ? 'higgs' : 'rhsn',
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return particleList;
  }, []);

  const getParticleColor = (type: 'lepton' | 'higgs' | 'rhsn') => {
    switch (type) {
      case 'lepton': return '#4ade80'; // plasma-teal
      case 'higgs': return '#22d3ee'; // plasma-cyan
      case 'rhsn': return '#f5d388'; // starlight-gold
      default: return '#ffffff';
    }
  };

  const getParticleLabel = (type: 'lepton' | 'higgs' | 'rhsn') => {
    switch (type) {
      case 'lepton': return 'ℓ (Lepton)';
      case 'higgs': return 'ϕ (Higgs)';
      case 'rhsn': return 'N (RHN)';
      default: return '';
    }
  };

  return (
    <section id="mechanism" className="min-h-screen py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold gradient-text glow-text mb-4">
              The WIFI-LG Mechanism
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Wash-in Freeze-In Leptogenesis: A novel mechanism that generates baryon asymmetry 
              without requiring right-handed neutrino oscillations or CP violation.
            </p>
          </div>

          <div className="glass-card p-6 md:p-8">
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              {(['freeze-in', 'wash-in', 'wash-out'] as const).map((process) => (
                <button
                  key={process}
                  onClick={() => setActiveProcess(process)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    activeProcess === process
                      ? 'bg-starlight-gold text-cosmic-900 scale-105'
                      : 'bg-cosmic-700 text-gray-300 hover:bg-cosmic-600'
                  }`}
                >
                  {process.replace('-', ' ').toUpperCase()}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold text-white mb-4">
                  {activeProcess === 'freeze-in' && 'Freeze-In Production'}
                  {activeProcess === 'wash-in' && 'Wash-In Generation'}
                  {activeProcess === 'wash-out' && 'Wash-Out Suppression'}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {activeProcess === 'freeze-in' && 
                    'Right-handed neutrinos are produced gradually through interactions in the thermal plasma. Unlike freeze-out, they never reach equilibrium, accumulating a small but significant abundance.'}
                  {activeProcess === 'wash-in' &&
                    'An initial asymmetry in right-handed electrons (μ_eR ≠ 0) drives the production of lepton flavor asymmetries through RHN interactions. This "wash-in" effect generates asymmetry even without CP violation.'}
                  {activeProcess === 'wash-out' &&
                    'At lower temperatures, the initial electron asymmetry is depleted. Conventional wash-out would destroy asymmetries, but the hierarchy between μ_eR and μ_Δ prevents significant loss.'}
                </p>
              </div>

              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Key Equation</h3>
                <div className="equation text-sm md:text-base">
                  <span className="text-plasma-cyan">dμ</span><sub className="text-gray-400">Δ</sub><sub className="text-gray-400">α</sub>
                  <span className="text-gray-400">/dz ≈</span>
                  <span className="text-starlight-gold ml-2">⟨γ</span><sub className="text-gray-400">N</sub><sup className="text-gray-400">(1)</sup>
                  <span className="text-starlight-gold">⟩/T</span>
                  <span className="text-gray-400">·</span>
                  <span className="text-plasma-teal">(F·F†)</span><sub className="text-gray-400">αα</sub>
                  <span className="text-gray-400">·μ</span><sub className="text-gray-400">α</sub><sup className="text-gray-400">0</sup>
                </div>
                <p className="text-gray-400 text-sm mt-4">
                  The wash-in term is proportional to the initial asymmetry μ<sup>0</sup>, enabling asymmetry generation without CP violation.
                </p>
              </div>
            </div>

            {/* Visualization Canvas */}
            <div className="relative bg-cosmic-800/50 rounded-lg overflow-hidden h-96 border border-cosmic-600">
              <div className="absolute top-4 left-4 z-10 flex items-center gap-4">
                {(['lepton', 'higgs', 'rhsn'] as const).map((type) => (
                  <div key={type} className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: getParticleColor(type) }}
                    />
                    <span className="text-sm text-gray-300">{getParticleLabel(type)}</span>
                  </div>
                ))}
              </div>

              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Temperature gradient background */}
                <defs>
                  <linearGradient id="tempGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(245, 211, 136, 0.1)" />
                    <stop offset="100%" stopColor="rgba(34, 211, 238, 0.1)" />
                  </linearGradient>
                </defs>
                <rect width="100" height="100" fill="url(#tempGradient)" />

                {/* Temperature slider indicator */}
                <line x1="0" y1={100 - temperature * 100} x2="100" y2={100 - temperature * 100} 
                      stroke="white" strokeWidth="0.5" strokeDasharray="2,2" />
                <text x="5" y={105 - temperature * 100} className="text-xs fill-gray-400">
                  T ~ {temperature.toFixed(1)} × T<sub className="text-[8px]">EW</sub>
                </text>

                {/* Animated particles */}
                {particles.map((particle) => {
                  const phase = isPlaying ? particle.phase + Date.now() * 0.001 : particle.phase;
                  const x = activeProcess === 'wash-out' 
                    ? particle.x + Math.sin(phase) * 5
                    : particle.x;
                  const y = activeProcess === 'freeze-in'
                    ? particle.y + Math.cos(phase * 2) * 3
                    : particle.y;

                  return (
                    <circle
                      key={particle.id}
                      cx={x}
                      cy={y}
                      r={activeProcess === 'wash-in' && particle.type === 'rhsn' ? 2 : 1}
                      fill={getParticleColor(particle.type)}
                      opacity={0.7}
                      className="transition-all duration-100"
                    />
                  );
                })}

                {/* Process indicators */}
                {activeProcess === 'wash-in' && (
                  <g>
                    <line x1="20" y1="30" x2="80" y2="70" stroke="#f5d388" strokeWidth="1" opacity="0.5" />
                    <line x1="80" y1="30" x2="20" y2="70" stroke="#f5d388" strokeWidth="1" opacity="0.5" />
                    <text x="45" y="55" className="text-xs fill-starlight-gold">Wash-In</text>
                  </g>
                )}
              </svg>

              {/* Temperature slider */}
              <div className="absolute bottom-4 left-4 right-4">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full h-2 bg-cosmic-700 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #f5d388 0%, #f5d388 ${temperature * 100}%, #22d3ee ${temperature * 100}%, #22d3ee 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>T &gt; T<sub className="text-[8px]">e</sub></span>
                  <span>T<sub className="text-[8px]">EW</sub></span>
                </div>
              </div>

              {/* Control buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 bg-cosmic-700/80 rounded-lg hover:bg-cosmic-600 transition-colors"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="p-2 bg-cosmic-700/80 rounded-lg hover:bg-cosmic-600 transition-colors"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="glass-card p-8">
            <h3 className="text-2xl font-serif font-bold text-white mb-6">
              How WIFI-LG Evades Standard Constraints
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'No RHN Oscillations Required',
                  content: 'Unlike standard FILG, WIFI-LG works with a single RHN or large mass splittings (δM ≫ 10⁻²)',
                },
                {
                  title: 'No CP Violation in RHN Sector',
                  content: 'The initial asymmetry μ_eR⁰ provides the necessary "fuel" for asymmetry generation',
                },
                {
                  title: 'GeV-Scale RHNs Viable',
                  content: 'Successful leptogenesis possible for M_N ≳ 0.1 GeV, well below the Davidson-Ibarra bound',
                },
                {
                  title: 'Testable at Future Experiments',
                  content: 'Large regions of parameter space accessible to SHiP, HL-LHC, and FCC-ee',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-6 interactive-element"
                >
                  <h4 className="text-lg font-semibold text-starlight-gold mb-2">{item.title}</h4>
                  <p className="text-gray-300 text-sm">{item.content}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
