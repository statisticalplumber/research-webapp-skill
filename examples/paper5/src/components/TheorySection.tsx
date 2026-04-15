import { motion } from 'framer-motion';

export default function TheorySection() {
  return (
    <section id="theory" className="py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 gradient-text">Theoretical Convergence</h2>
          <p className="text-stone-400 max-w-2xl mx-auto">
            Onflow converges to the optimal Markowitz portfolio under log-normal dynamics
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card"
          >
            <h3 className="text-xl font-semibold text-stone-100 mb-4">Key Result</h3>
            <div className="bg-stone-800/50 p-6 rounded-lg mb-4">
              <pre className="text-blue-400 font-mono text-sm overflow-x-auto">
{`d/dt π_t = -H²(π_t) Σ (π_t - π†)`}
              </pre>
            </div>
            <p className="text-stone-300 mb-4">
              The allocation <span className="font-mono text-blue-400">π_t</span> satisfies an autonomous ODE that leaves the unit simplex invariant.
            </p>
            <p className="text-stone-300">
              Under appropriate technical hypotheses with non-singular covariance matrix Σ, the algorithm achieves <span className="text-emerald-400 font-bold">exponential convergence</span> to the optimal portfolio.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card"
          >
            <h3 className="text-xl font-semibold text-stone-100 mb-4">Convergence Rate</h3>
            <div className="bg-stone-800/50 p-6 rounded-lg mb-4">
              <pre className="text-blue-400 font-mono text-sm overflow-x-auto">
{`||π_t - π*|| ≤ c₀ e^(-c₁ t),  ∀ t ≥ 0`}
              </pre>
            </div>
            <p className="text-stone-300 mb-4">
              When the initial allocation is close enough to the optimum, or when the limit allocation lies in the interior of the simplex, convergence is exponentially fast.
            </p>
            <p className="text-stone-300">
              Constants <span className="font-mono text-stone-400">c₀, c₁ &gt; 0</span> depend only on the covariance matrix Σ.
            </p>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 card"
        >
          <h3 className="text-xl font-semibold text-stone-100 mb-4">Optimal Portfolio</h3>
          <p className="text-stone-300 mb-4">
            The optimal allocation π* maximizes the reward functional:
          </p>
          <div className="bg-stone-800/50 p-6 rounded-lg mb-4">
            <pre className="text-blue-400 font-mono text-sm overflow-x-auto">
{`max π∈S_K  R(π) = <μ, π> - (1/2) π^T Σ π`}
            </pre>
          </div>
          <p className="text-stone-300">
            This is the classical <span className="text-blue-400 font-bold">Markowitz mean-variance optimization</span>, where μ represents asset drifts and Σ the covariance matrix.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 card border-amber-500/30"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-amber-400 text-sm font-bold">R8</span>
            </div>
            <div>
              <h4 className="text-stone-200 font-semibold mb-2">Remark on Transaction Costs</h4>
              <p className="text-stone-300 text-sm">
                The theoretical result assumes zero transaction costs (ξ = 0). In practice, transaction costs exist but are typically an order of magnitude smaller than other terms. They can be incorporated through perturbation analysis. The algorithm remains robust even with significant fees (up to 2% daily), where other methods fail.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
