import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface EquationProps {
  title: string;
  latex: string;
  description?: string;
  isActive?: boolean;
  onToggle?: () => void;
}

function EquationCard({ title, latex, description, isActive, onToggle }: EquationProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-stone-100">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-green-50 to-blue-50 hover:from-green-100 hover:to-blue-100 transition-colors"
      >
        <h4 className="font-semibold text-stone-800">{title}</h4>
        {isActive ? <ChevronUp className="w-5 h-5 text-green-600" /> : <ChevronDown className="w-5 h-5 text-green-600" />}
      </button>
      
      {isActive && (
        <div className="p-6 border-t border-stone-100">
          <div className="bg-stone-900 text-white p-6 rounded-lg overflow-x-auto">
            <pre className="text-lg font-mono whitespace-pre-wrap">{latex}</pre>
          </div>
          {description && (
            <p className="mt-4 text-stone-600 leading-relaxed">{description}</p>
          )}
        </div>
      )}
    </div>
  );
}

const parameters = [
  { symbol: 'A', name: 'Self-antigen presenting cells', color: 'red' },
  { symbol: 'S', name: 'Immunosuppressive cells', color: 'yellow' },
  { symbol: 'R', name: 'Self-reactive immune cells', color: 'orange' },
  { symbol: 'C', name: 'Cytokines', color: 'blue' },
  { symbol: 'E', name: 'Destroyed myelin fraction', color: 'green' },
];

const parameterTable = [
  { symbol: 'α', description: 'Input source of self-antigen presenting cells' },
  { symbol: 'pᵣₐ', description: 'Proliferative rate of R due to interactions with A' },
  { symbol: 'dᵣ', description: 'Natural decay rate of self-reactive immune cells' },
  { symbol: 'Dᵣ', description: 'Diffusion coefficient for self-reactive immune cells' },
  { symbol: 'D꜀', description: 'Diffusion coefficient for cytokines' },
  { symbol: 'χ', description: 'Maximal chemotactic rate for self-reactive immune cells' },
  { symbol: 'γ', description: 'Squeezing exponent' },
  { symbol: 'ξ', description: 'Chemotactic sensitivity (dimensionless)' },
  { symbol: 'δ', description: 'Ratio of diffusion coefficients (D꜀/Dᵣ)' },
  { symbol: 'β', description: 'Cytokine production parameter' },
  { symbol: 'τ', description: 'Cytokine decay rate parameter' },
  { symbol: 'θ', description: 'Demyelination rate parameter' },
  { symbol: 'ζ', description: 'Remyelination rate parameter' },
];

export function Model() {
  const [expandedEq, setExpandedEq] = useState<number>(0);

  const equations = [
    {
      title: 'Full Model (5 Equations)',
      latex: `∂A/∂t = α + pAR·A·R - dAS·S·A - dA·A
∂S/∂t = pSA·A·S - dS·S
∂R/∂t = ∇·[DR·ϕ₀(R)·∇R - χ·ϕ₁(R)·R·∇C] + pRA·A·R - dRS·S·R - dR·R
∂C/∂t = DC·ΔC + pC·A·R - dC·C
∂E/∂t = (Ē - E)·dE·R²/(r̃ + R²) - rE·E`,
      description: 'The complete reaction-diffusion model describing the dynamics of five interacting populations in Multiple Sclerosis.',
    },
    {
      title: 'Reduced Model (3 Equations)',
      latex: `∂R/∂t = ∇·(Φ₀(R)·∇R - ξ·Φ₁(R)·R·∇C) + R(1 - R)
∂C/∂t = δ·ΔC + β·R - τ·C
∂E/∂t = θ·R²/(Ω + R) - ζ·E`,
      description: 'The dimensionless reduced system obtained by assuming equilibrium for antigen-presenting and immunosuppressive cells. This is the model analyzed in this work.',
    },
    {
      title: 'Squeezing Probability Functions',
      latex: `ϕ₁(y) = (1 - (y/R̄)ᵞ) · 𝟙[0, R̄]
ϕ₀(y) = ϕ₁(y) - y·ϕ₁'(y)`,
      description: 'The function ϕ₁ represents the squeezing probability—the probability of a cell finding space at its neighboring site. The exponent γ controls how sharply this probability decreases with cell density.',
    },
  ];

  return (
    <section id="model" className="py-24 bg-stone-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-stone-800">
            The Reaction-Diffusion Model
          </h2>
          <p className="text-lg text-stone-600 max-w-4xl mx-auto leading-relaxed">
            A mathematical framework for studying the formation and progression of demyelinating lesions
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-semibold mb-8 text-stone-800">
            Biological Components
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {parameters.map((param, index) => (
              <motion.div
                key={param.symbol}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-3 px-6 py-4 bg-white rounded-xl shadow-sm"
              >
                <div className={`w-12 h-12 rounded-full bg-${param.color}-100 flex items-center justify-center`}>
                  <span className={`text-xl font-bold text-${param.color}-700`}>{param.symbol}</span>
                </div>
                <div className="text-left">
                  <span className="font-semibold text-stone-800 block">{param.symbol}</span>
                  <span className="text-sm text-stone-600">{param.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-semibold mb-8 text-stone-800">
            Mathematical Equations
          </h3>
          <div className="space-y-4">
            {equations.map((eq, index) => (
              <EquationCard
                key={index}
                title={eq.title}
                latex={eq.latex}
                description={eq.description}
                isActive={expandedEq === index}
                onToggle={() => setExpandedEq(expandedEq === index ? -1 : index)}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-semibold mb-8 text-stone-800">
            Model Parameters
          </h3>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-green-50 to-blue-50">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-stone-800">Symbol</th>
                    <th className="px-6 py-4 text-left font-semibold text-stone-800">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {parameterTable.map((param, index) => (
                    <motion.tr
                      key={param.symbol}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="hover:bg-stone-50 transition-colors"
                    >
                      <td className="px-6 py-4 font-mono text-stone-800">{param.symbol}</td>
                      <td className="px-6 py-4 text-stone-600">{param.description}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
