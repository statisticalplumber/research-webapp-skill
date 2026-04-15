import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Lightbulb } from 'lucide-react';

const keyFindings = [
  {
    title: 'Turing Instability Conditions',
    description: 'Identified parameter conditions that allow for the formation of spatial patterns in the reaction-diffusion system.',
  },
  {
    title: 'Weakly Nonlinear Analysis',
    description: 'Decomposed the solution in terms of two pairs of dominant eigenmodes to explore different patterning outcomes near the bifurcation value.',
  },
  {
    title: 'Pattern Stability',
    description: 'Determined conditions for the emergence and stability of striped or squared-like patterns.',
  },
  {
    title: 'Squeezing Probability Impact',
    description: 'Demonstrated that different choices of the squeezing probability can lead to different pattern shapes.',
  },
  {
    title: 'Chemotactic Sensitivity',
    description: 'Observed that higher values of the chemotactic parameter result in myelin damage more concentrated in specific regions.',
  },
  {
    title: 'Random Initial Conditions',
    description: 'Numerical simulations from random perturbations revealed hexagonal or rectangular symmetries in addition to striped patterns.',
  },
];

const futureDirections = [
  'Analysis with more than two dominant eigenmodes',
  'Wavefront invasion analysis for spatio-temporal evolution',
  'More specific parameter estimations from biological data',
  'Extension to include treatment terms',
];

export function Conclusions() {
  return (
    <section id="conclusions" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-stone-800">
            Conclusions
          </h2>
          <p className="text-lg text-stone-600 max-w-4xl mx-auto leading-relaxed">
            Summary of findings and implications for understanding Multiple Sclerosis lesion formation
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200">
            <h3 className="text-2xl font-semibold mb-6 text-stone-800">
              Summary of Main Results
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {keyFindings.map((finding, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-stone-800 mb-2">{finding.title}</h4>
                      <p className="text-sm text-stone-600 leading-relaxed">
                        {finding.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-br from-stone-50 to-stone-100 rounded-2xl p-8 border border-stone-200">
            <h3 className="text-2xl font-semibold mb-6 text-stone-800">
              Biological Implications
            </h3>
            <div className="space-y-4">
              <p className="text-stone-700 leading-relaxed">
                The spatial patterns predicted by the analysis correspond to structured distributions of demyelinated regions that may resemble histopathological observations in Multiple Sclerosis:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-6">
                  <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                    <ArrowRight className="w-5 h-5" />
                    Striped Patterns
                  </h4>
                  <p className="text-sm text-stone-600">
                    Can be interpreted as elongated plaques along white-matter tracts, such as "Dawson's fingers". Some may represent segments of concentric rings in Baló's lesions.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6">
                  <h4 className="font-semibold text-blue-700 mb-3 flex items-center gap-2">
                    <ArrowRight className="w-5 h-5" />
                    Squared Patterns
                  </h4>
                  <p className="text-sm text-stone-600">
                    Reflect focal or concentric demyelinating areas, reminiscent of intracortical lesions or the fully developed rings characteristic of Baló's sclerosis.
                  </p>
                </div>
              </div>

              <p className="text-stone-700 leading-relaxed mt-4">
                These insights allow a better understanding of atypical lesion formation in Multiple Sclerosis, capturing features that cannot be reproduced by one-dimensional models or by approaches relying solely on oligodendrocyte loss.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200">
            <h3 className="text-2xl font-semibold mb-6 text-stone-800 flex items-center gap-3">
              <Lightbulb className="w-7 h-7 text-purple-600" />
              Future Directions
            </h3>
            <p className="text-stone-700 mb-6 leading-relaxed">
              These findings highlight the need for further analysis in future works:
            </p>
            <ul className="space-y-3">
              {futureDirections.map((direction, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-stone-700">{direction}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
