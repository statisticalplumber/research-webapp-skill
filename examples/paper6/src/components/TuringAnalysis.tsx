import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, AlertTriangle, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface PatternRegionProps {
  name: string;
  condition: string;
  stable: boolean;
  color: string;
}

function PatternRegion({ name, condition, stable, color }: PatternRegionProps) {
  return (
    <div className={`p-6 rounded-xl border-2 ${stable ? `border-${color}-400 bg-${color}-50` : 'border-red-300 bg-red-50'}`}>
      <div className="flex items-center gap-3 mb-3">
        {stable ? (
          <CheckCircle className={`w-6 h-6 text-${color}-600`} />
        ) : (
          <AlertTriangle className="w-6 h-6 text-red-600" />
        )}
        <h4 className={`font-semibold text-lg ${stable ? `text-${color}-800` : 'text-red-800'}`}>
          {name}
        </h4>
      </div>
      <p className="font-mono text-sm text-stone-700 mb-2">{condition}</p>
      <p className="text-sm text-stone-600">
        {stable
          ? `Pattern is stable under these conditions`
          : 'Pattern is unstable or does not exist'}
      </p>
    </div>
  );
}

export function TuringAnalysis() {
  const [showCriticalWavenumber, setShowCriticalWavenumber] = useState(false);

  const equilibrium = {
    R: 1,
    C: 'β/τ',
    E: 'θ / (θ + ζ(1 + Ω))',
  };

  const turingCondition = {
    ξ: `> ξc = (δ + τ·Φ̃₀ + 2√(δ·τ·Φ̃₀)) / (β·Φ̃₁)`,
    Λ: `< 0 and Λ² - 4·δ·Φ̃₀·τ > 0`,
  };

  const criticalWavenumber = `kc² = Λ / (2·δ·Φ̃₀) = (τ / (δ·Φ̃₀)) / 2`;

  return (
    <section id="turing" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-stone-800">
            Turing Instability Analysis
          </h2>
          <p className="text-lg text-stone-600 max-w-4xl mx-auto leading-relaxed">
            Investigating the conditions under which spatial patterns can emerge from a homogeneous state
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200"
          >
            <h3 className="text-xl font-semibold mb-6 text-green-800 flex items-center gap-2">
              <TrendingUp className="w-6 h-6" />
              Homogeneous Equilibrium
            </h3>
            <div className="space-y-4">
              <p className="text-stone-700 leading-relaxed">
                The system has a unique non-zero equilibrium point:
              </p>
              <div className="bg-white rounded-lg p-4 font-mono text-sm shadow-inner">
                <div className="text-center mb-2">
                  <span className="font-bold text-green-700">W₁ = (R, C, E)</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between border-b border-stone-100 pb-2">
                    <span className="text-stone-600">R:</span>
                    <span className="font-semibold text-stone-800">{equilibrium.R}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-100 pb-2">
                    <span className="text-stone-600">C:</span>
                    <span className="font-semibold text-stone-800">{equilibrium.C}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">E:</span>
                    <span className="font-semibold text-stone-800">{equilibrium.E}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-stone-600">
                *This equilibrium is admissible provided that ℛ &gt; 1
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200"
          >
            <h3 className="text-xl font-semibold mb-6 text-blue-800 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" />
              Turing Instability Conditions
            </h3>
            <div className="space-y-4">
              <p className="text-stone-700 leading-relaxed">
                For pattern formation, the following conditions must be satisfied:
              </p>
              <div className="bg-white rounded-lg p-4 shadow-inner">
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="font-mono text-sm text-blue-800">{turingCondition.ξ}</div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="font-mono text-sm text-blue-800">{turingCondition.Λ}</div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-stone-600">
                where ξ is the chemotactic sensitivity parameter
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-semibold mb-8 text-stone-800">
            Pattern Stability Regions
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <PatternRegion
              name="Striped Pattern"
              condition="s₁ &lt; 0 and s₂ &lt; s₁ &lt; 0"
              stable={true}
              color="green"
            />
            <PatternRegion
              name="Squared Pattern"
              condition="s₁ &lt; -|s₂|"
              stable={true}
              color="blue"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-stone-50 rounded-2xl p-8 border border-stone-200">
            <button
              onClick={() => setShowCriticalWavenumber(!showCriticalWavenumber)}
              className="w-full flex items-center justify-between text-left"
            >
              <h3 className="text-xl font-semibold text-stone-800">
                Critical Wavenumber
              </h3>
              {showCriticalWavenumber ? (
                <ChevronUp className="w-6 h-6 text-stone-600" />
              ) : (
                <ChevronDown className="w-6 h-6 text-stone-600" />
              )}
            </button>

            {showCriticalWavenumber && (
              <div className="mt-6 p-6 bg-white rounded-xl shadow-inner">
                <p className="text-stone-700 mb-4">
                  The critical wavenumber determines the characteristic length scale of emerging patterns:
                </p>
                <div className="bg-stone-900 text-white p-6 rounded-lg overflow-x-auto">
                  <pre className="font-mono text-sm">{criticalWavenumber}</pre>
                </div>
                <p className="text-stone-600 mt-4">
                  The corresponding pattern wavelength is λ = 2π/kc. Patterns with wavenumbers in the range [k₁, k₂] will grow and lead to spatial structure formation.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
