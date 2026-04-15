import { motion } from 'framer-motion';
import { Brain, ShieldAlert, Activity } from 'lucide-react';

const cellTypes = [
  {
    icon: ShieldAlert,
    name: 'Self-antigen presenting cells (A)',
    description: 'Activate self-reactive immune cells against myelin',
    color: 'bg-red-100 text-red-700',
  },
  {
    icon: ShieldAlert,
    name: 'Immunosuppressive cells (S)',
    description: 'Inhibit or eliminate activated immune cells',
    color: 'bg-yellow-100 text-yellow-700',
  },
  {
    icon: Activity,
    name: 'Self-reactive immune cells (R)',
    description: 'Attack myelin-producing cells and myelin itself',
    color: 'bg-orange-100 text-orange-700',
  },
  {
    icon: Activity,
    name: 'Cytokines (C)',
    description: 'Proinflammatory molecules that attract immune cells',
    color: 'bg-blue-100 text-blue-700',
  },
  {
    icon: Brain,
    name: 'Destroyed myelin fraction (E)',
    description: 'Fraction of myelin sheath degraded by immune attack',
    color: 'bg-green-100 text-green-700',
  },
];

export function Introduction() {
  return (
    <section id="introduction" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-stone-800">
            Introduction: Multiple Sclerosis
          </h2>
          <p className="text-lg text-stone-600 max-w-4xl mx-auto leading-relaxed">
            Multiple Sclerosis (MS) is a chronic neurological disorder in which the immune system mistakenly attacks the brain and spinal cord.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="prose prose-lg max-w-none"
          >
            <h3 className="text-2xl font-semibold mb-4 text-stone-800">
              The Pathological Process
            </h3>
            <p className="text-stone-600 leading-relaxed mb-4">
              MS is estimated that over <span className="font-semibold text-stone-800">1.8 million people are affected worldwide</span>. The main pathological feature is damage to the <span className="font-semibold text-stone-800">myelin sheath</span>, which surrounds axons in the central nervous system and facilitates the transmission of nerve impulses.
            </p>
            <p className="text-stone-600 leading-relaxed mb-4">
              These lesions can be detected using magnetic resonance imaging, appearing as <span className="font-semibold text-stone-800">focal plaques in the white matter</span>. The symptoms involve a gradual worsening of physical and neurological functions, including muscle weakness, coordination issues, numbness, vision problems, and cognitive changes.
            </p>
            <p className="text-stone-600 leading-relaxed">
              What distinguishes autoimmune conditions like MS is that the number and effectiveness of natural immunosuppressors are compromised, allowing activated immune cells to persist and cause damage.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-stone-50 rounded-2xl p-8"
          >
            <h4 className="text-xl font-semibold mb-6 text-stone-800">
              Key Cell Types in MS
            </h4>
            <div className="space-y-4">
              {cellTypes.map((cell, index) => (
                <motion.div
                  key={cell.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className={`p-3 rounded-lg ${cell.color}`}>
                    <cell.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-stone-800 mb-1">{cell.name}</h5>
                    <p className="text-sm text-stone-600">{cell.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-100"
        >
          <h3 className="text-2xl font-semibold mb-4 text-stone-800">
            Mathematical Modeling Approaches
          </h3>
          <p className="text-stone-600 leading-relaxed mb-4">
            Mathematical modeling represents a powerful framework for understanding the underlying dynamics of MS. Different models have been developed:
          </p>
          <ul className="space-y-3 text-stone-600">
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-semibold">•</span>
              <span>Ordinary differential equations (ODEs)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-semibold">•</span>
              <span>Stochastic dynamics models</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-semibold">•</span>
              <span>Systems of partial differential equations (PDEs)</span>
            </li>
          </ul>
          <p className="text-stone-600 leading-relaxed mt-4">
            The systems of PDE proposed have been extensively analyzed using <span className="font-semibold text-green-700">Turing instability</span> and <span className="font-semibold text-blue-700">weakly nonlinear analysis</span>. These studies have led to the identification of spatial patterns that mimic myelin lesions typically seen in MS, specifically for type III lesions and Balo's concentric lesions.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
