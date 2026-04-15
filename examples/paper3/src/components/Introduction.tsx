import { motion } from 'framer-motion';
import { Brain, Database, Search, ArrowRight } from 'lucide-react';

const problemPoints = [
  {
    icon: <Database className="w-6 h-6" />,
    title: 'scRNA-seq Data',
    description: 'Transformed understanding of cellular heterogeneity at single-cell resolution',
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: 'Analysis Bottleneck',
    description: 'Translating statistical outputs into mechanistic biological hypotheses remains labor-intensive',
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: 'AI Gap',
    description: 'Agentic AI lacks direct access to transcriptomic representations',
  },
];

const existingSystems = [
  {
    name: 'AI Co-Scientist',
    scope: 'Hypothesis generation',
    limitations: ['No expression embeddings', 'Text-only knowledge'],
  },
  {
    name: 'CellWhisperer',
    scope: 'Multimodal embedding',
    limitations: ['No pathway scoring', 'Limited to natural language'],
  },
  {
    name: 'scGPT',
    scope: 'Cell embeddings',
    limitations: ['Opaque to natural language', 'No semantic querying'],
  },
];

function Introduction() {
  return (
    <section id="introduction" className="py-20 bg-gradient-to-b from-white to-stone-50">
      <div className="max-w-6xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading">The Challenge</h2>
          <p className="section-subheading">
            Bridging single-cell genomics and AI-driven biological discovery
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {problemPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="stat-card"
            >
              <div className="w-12 h-12 bg-elisa-blue/10 rounded-lg flex items-center justify-center text-elisa-blue mb-4">
                {point.icon}
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-2">
                {point.title}
              </h3>
              <p className="text-stone-600">{point.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card mb-12"
        >
          <h3 className="text-2xl font-serif font-semibold text-stone-900 mb-6">
            The Fundamental Disconnect
          </h3>
          <div className="drop-cap">
            <p className="text-lg leading-relaxed text-stone-700 mb-6">
              Single-cell RNA sequencing (scRNA-seq) has transformed our understanding of cellular heterogeneity by enabling genome-wide transcriptional profiling at single-cell resolution. However, a critical bottleneck persists: translating statistical outputs of differentially expressed gene lists, enriched pathways, and predicted ligand-receptor interactions into mechanistic biological hypotheses remains labor-intensive, context-dependent, and difficult to scale or reproduce.
            </p>
            <p className="text-lg leading-relaxed text-stone-700 mb-6">
              Large-language models (LLMs) offer a potential solution. LLMs encode substantial biomedical knowledge and perform competitively on clinical reasoning benchmarks, whereas retrieval-augmented generation (RAG) improves factual accuracy by grounding outputs in external knowledge at inference time. These capabilities have motivated agentic AI architectures that are capable of autonomous planning, tool usage, and iterative reasoning within closed-loop workflows.
            </p>
            <p className="text-lg leading-relaxed text-stone-700 mb-6">
              Yet existing systems reveal a fundamental disconnect: agentic systems excel at reasoning over text but lack direct access to transcriptional data structure, while expression foundation models learn rich cellular representations that remain opaque to natural language interfaces. No existing system has unified expression-derived embeddings with semantic language representations within a single interactive framework for single-cell discovery.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-serif font-semibold text-stone-900 mb-6">
            Existing Systems and Their Limitations
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {existingSystems.map((system, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card border-l-4 border-l-elisa-blue"
              >
                <h4 className="text-lg font-semibold text-stone-900 mb-2">
                  {system.name}
                </h4>
                <p className="text-sm text-elisa-blue mb-3">{system.scope}</p>
                <ul className="space-y-1">
                  {system.limitations.map((limit, i) => (
                    <li key={i} className="text-sm text-stone-600 flex items-start">
                      <ArrowRight className="w-4 h-4 mr-2 mt-0.5 text-stone-400" />
                      {limit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Introduction;
