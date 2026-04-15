import { motion } from 'framer-motion';
import { BookOpen, Github, ExternalLink, Mail } from 'lucide-react';

const authors = [
  {
    name: 'Omar Coser',
    affiliation: 'Department of Engineering, Unit of Artificial Intelligence and Computer Systems',
    subAffiliation: 'Università Campus Bio-Medico di Roma',
    email: 'omarcoser10@gmail.com',
    isCorresponding: true,
    github: 'omaruno',
  },
];

const datasets = [
  {
    name: 'Cystic Fibrosis Airways',
    citation: 'Berg et al. (2025)',
    source: 'CZ CELLxGENE Discover',
  },
  {
    name: 'High-Risk Neuroblastoma',
    citation: 'Yu et al. (2025)',
    source: 'CZ CELLxGENE Discover',
  },
  {
    name: 'ICB Multi-Cancer',
    citation: 'Gondal et al. (2025)',
    source: 'CZ CELLxGENE Discover',
  },
  {
    name: 'Healthy Breast Tissue',
    citation: 'Bhat-Nakshatri et al. (2024)',
    source: 'CZ CELLxGENE Discover',
  },
  {
    name: 'Fetal Lung AT2 Organoids',
    citation: 'Lim et al. (2025)',
    source: 'CZ CELLxGENE Discover',
  },
  {
    name: 'First-Trimester Brain',
    citation: 'Mannens et al. (2025)',
    source: 'CZ CELLxGENE Discover',
  },
];

function AuthorsAndCitation() {
  return (
    <section id="authors" className="py-20 bg-gradient-to-b from-white to-stone-50">
      <div className="max-w-6xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">Authors & Citation</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card"
          >
            <h3 className="text-xl font-semibold text-stone-900 mb-6">Authors</h3>
            {authors.map((author, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-elisa-blue to-elisa-teal rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                    {author.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-lg font-semibold text-stone-900">
                        {author.name}
                      </h4>
                      {author.isCorresponding && (
                        <span className="px-2 py-0.5 bg-elisa-blue/10 text-elisa-blue text-xs rounded-full">
                          Corresponding
                        </span>
                      )}
                    </div>
                    <p className="text-stone-600 text-sm">{author.affiliation}</p>
                    <p className="text-stone-500 text-sm">{author.subAffiliation}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <a
                        href={`mailto:${author.email}`}
                        className="flex items-center gap-1 text-stone-500 hover:text-elisa-blue transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">{author.email}</span>
                      </a>
                      {author.github && (
                        <a
                          href={`https://github.com/${author.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-stone-500 hover:text-elisa-blue transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          <span className="text-sm">@{author.github}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card"
          >
            <h3 className="text-xl font-semibold text-stone-900 mb-6">Citation</h3>
            <div className="bg-stone-50 rounded-lg p-4 mb-6">
              <p className="text-stone-700 italic">
                Coser, O. (2026). ELISA: An Interpretable Hybrid Generative AI Agent for Expression-Grounded Discovery in Single-Cell Genomics. Submitted for peer review.
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-stone-700">
                If you use ELISA in your research, please cite this work.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://github.com/omaruno/ELISA-An-AI-Agent-for-Expression-Grounded-Discovery-in-Single-Cell-Genomics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-elisa-blue text-white rounded-lg hover:bg-elisa-dark transition-colors"
                >
                  <Github className="w-4 h-4" />
                  View Code
                </a>
                <a
                  href="https://cellxgene.cziscience.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white text-stone-700 border-2 border-stone-300 rounded-lg hover:border-elisa-blue transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  CZ CELLxGENE
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card bg-gradient-to-br from-elisa-light/30 to-white"
        >
          <h3 className="text-xl font-semibold text-stone-900 mb-6">
            <BookOpen className="w-6 h-6 inline mr-2" />
            Datasets
          </h3>
          <p className="text-stone-600 mb-6">
            All six single-cell RNA sequencing datasets used in this study are publicly available through CZ CELLxGENE Discover.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {datasets.map((dataset, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 border border-stone-200"
              >
                <h4 className="font-semibold text-stone-900 mb-1">
                  {dataset.name}
                </h4>
                <p className="text-sm text-elisa-blue mb-1">
                  {dataset.citation}
                </p>
                <p className="text-xs text-stone-500">{dataset.source}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card mt-12 bg-stone-900 text-white"
        >
          <div className="text-center">
            <h3 className="text-2xl font-serif font-bold mb-4">
              Acknowledgments
            </h3>
            <p className="text-stone-300 mb-6">
              The author acknowledges Dr. Antonio Orvieto for allowing the use of computational resources of his Lab at Max Planck Institute for Intelligent Systems.
            </p>
            <div className="flex justify-center gap-6">
              <a
                href="https://github.com/omaruno/ELISA-An-AI-Agent-for-Expression-Grounded-Discovery-in-Single-Cell-Genomics"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-elisa-blue hover:text-elisa-light transition-colors"
              >
                <Github className="w-5 h-5" />
                <span>GitHub Repository</span>
              </a>
              <a
                href="https://cellxgene.cziscience.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-elisa-teal hover:text-white transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
                <span>CZ CELLxGENE</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AuthorsAndCitation;
