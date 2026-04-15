import { motion } from 'framer-motion';
import { Database, Search, ArrowRight, FileCode, Layers, MessageSquare } from 'lucide-react';

const stages = [
  {
    id: 'data-prep',
    title: 'Data Preparation',
    icon: <Database className="w-6 h-6" />,
    color: 'bg-elisa-blue',
    borderColor: 'border-elisa-blue',
    items: [
      'Normalization, log-transform, highly variable gene selection',
      'PCA, neighbor graph construction, Leiden clustering',
      'Per-cluster differential expression statistics',
      'Gene Ontology (GO) and Reactome enrichment',
    ],
    description: 'Single-cell dataset undergoes preprocessing and encoding',
  },
  {
    id: 'embedding',
    title: 'Dual Embedding Generation',
    icon: <Layers className="w-6 h-6" />,
    color: 'bg-elisa-teal',
    borderColor: 'border-elisa-teal',
    items: [
      'scGPT expression embeddings (cell-level)',
      'BioBERT semantic embeddings (768-d)',
      'Cluster identifiers and metadata',
      'Differential expression statistics',
    ],
    description: 'Fusion of expression and semantic representations',
  },
  {
    id: 'retrieval',
    title: 'Hybrid Retrieval',
    icon: <Search className="w-6 h-6" />,
    color: 'bg-elisa-purple',
    borderColor: 'border-elisa-purple',
    items: [
      'Automatic query classifier',
      'Gene marker scoring (≥60% gene symbols)',
      'Semantic cosine similarity',
      'Reciprocal Rank Fusion (RRF)',
    ],
    description: 'Intelligent routing to appropriate retrieval pipeline',
  },
  {
    id: 'analysis',
    title: 'Analytical Modules',
    icon: <FileCode className="w-6 h-6" />,
    color: 'bg-elisa-green',
    borderColor: 'border-elisa-green',
    items: [
      'Pathway activity scoring (60+ gene sets)',
      'Ligand-receptor interaction prediction (280+ pairs)',
      'Condition-aware comparative analysis',
      'Cell-type proportion estimation',
    ],
    description: 'Deep biological analysis on embedded data',
  },
  {
    id: 'interpretation',
    title: 'LLM Interpretation',
    icon: <MessageSquare className="w-6 h-6" />,
    color: 'bg-elisa-gold',
    borderColor: 'border-elisa-gold',
    items: [
      'LLaMA-3.1-8B via Groq API',
      'Strict grounding in dataset evidence',
      'Discovery mode with candidate hypotheses',
      'Publication-ready report generation',
    ],
    description: 'Structured biological interpretation',
  },
];

function Architecture() {
  return (
    <section id="architecture" className="py-20 bg-gradient-to-b from-stone-50 to-white">
      <div className="max-w-6xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">ELISA Architecture</h2>
          <p className="section-subheading max-w-3xl mx-auto">
            An interpretable framework that unifies scGPT expression embeddings with BioBERT-based semantic retrieval and LLM-mediated interpretation
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-elisa-blue via-elisa-teal to-elisa-green hidden md:block" />

          <div className="space-y-12">
            {stages.map((stage, index) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} md:pr-12 md:pl-0 md:pl-12`} />

                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-4 shadow-lg hidden md:block"
                  style={{
                    borderColor: index % 2 === 0 ? '#1e40af' : index % 4 === 1 ? '#14b8a6' : index % 4 === 2 ? '#8b5cf6' : index % 4 === 3 ? '#10b981' : '#f59e0b',
                  }}
                />

                <div className="flex-1 md:pl-12 md:pr-0 md:pl-12">
                  <div className={`card ${stage.borderColor} border-l-4`}>
                    <div className={`w-12 h-12 ${stage.color} rounded-lg flex items-center justify-center text-white mb-4`}>
                      {stage.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-stone-900 mb-2">{stage.title}</h3>
                    <p className="text-stone-600 mb-4">{stage.description}</p>
                    <ul className="space-y-2">
                      {stage.items.map((item, i) => (
                        <li key={i} className="text-stone-700 flex items-start">
                          <ArrowRight className="w-4 h-4 mr-2 mt-0.5 text-elisa-blue flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex-1 md:pl-12 md:pr-12" />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card mt-16 bg-gradient-to-br from-elisa-light/30 to-white"
        >
          <h3 className="text-xl font-semibold text-stone-900 mb-4">Key Design Principles</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-elisa-blue/10 rounded-full flex items-center justify-center text-elisa-blue font-semibold mr-3 flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="font-semibold text-stone-900 mb-1">Explicit Routing</h4>
                <p className="text-sm text-stone-600">
                  Query classifier routes inputs to gene marker scoring, semantic matching, or reciprocal rank fusion pipelines
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-elisa-teal/10 rounded-full flex items-center justify-center text-elisa-teal font-semibold mr-3 flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="font-semibold text-stone-900 mb-1">Strict Grounding</h4>
                <p className="text-sm text-stone-600">
                  Enforces separation between dataset-derived evidence and LLM-generated knowledge
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-elisa-purple/10 rounded-full flex items-center justify-center text-elisa-purple font-semibold mr-3 flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="font-semibold text-stone-900 mb-1">Integrated Analysis</h4>
                <p className="text-sm text-stone-600">
                  All analytical modules operate directly on embedded data without original count matrix access
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Architecture;
