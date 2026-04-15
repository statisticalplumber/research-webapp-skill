import { motion } from 'framer-motion';
import { TrendingDown, ArrowUpRight, ShieldAlert, Zap } from 'lucide-react';

const discussionPoints = [
  {
    icon: <TrendingDown className="w-6 h-6" />,
    title: 'Contrastive Alignment Produces Text-Dominated Embeddings',
    content: 'CellWhisperer performed competitively on ontology queries but collapsed on expression queries (mean MRR 0.397 vs ELISA\'s 0.806), revealing a fundamental limitation of CLIP-style training for single-cell retrieval.',
    color: 'text-elisa-blue',
    bg: 'bg-elisa-blue/5',
  },
  {
    icon: <ArrowUpRight className="w-6 h-6" />,
    title: 'Explicit Routing Outperforms Implicit Fusion',
    content: 'ELISA maintains two separate representation spaces and routes queries through explicit classification, capturing the strengths of both pipelines without compression artifacts inherent in learned fusion.',
    color: 'text-elisa-teal',
    bg: 'bg-elisa-teal/5',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Analytical Modules Bridge Retrieval and Interpretation',
    content: 'Near-perfect pathway alignment (mean 0.98) and theme coverage (mean 0.88) scores demonstrated that integrated architecture effectively connects gene-level evidence to biological programs.',
    color: 'text-elisa-purple',
    bg: 'bg-elisa-purple/5',
  },
  {
    icon: <ShieldAlert className="w-6 h-6" />,
    title: 'LLM Grounding and the Discovery-Hallucination Boundary',
    content: 'Strict separation between data-derived evidence and LLM-generated interpretation is essential. ELISA\'s prompt architecture provides only retrieved cluster data with explicit instructions to avoid external literature and causal claims.',
    color: 'text-elisa-gold',
    bg: 'bg-elisa-gold/5',
  },
];

const futureDirections = [
  'Integration with spatial transcriptomics data for spatially resolved interaction prediction',
  'Incorporation of trajectory inference for reasoning about differentiation and therapy response',
  'Cross-dataset query support for meta-analytical reasoning across tissues and disease states',
  'Fine-tuned models trained on single-cell biological reasoning for improved interpretation depth',
];

function Discussion() {
  return (
    <section id="discussion" className="py-20 bg-gradient-to-b from-stone-50 to-white">
      <div className="max-w-6xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">Discussion</h2>
          <p className="section-subheading max-w-3xl mx-auto">
            Implications for the design of retrieval systems in single-cell genomics and the role of agentic AI in biological discovery
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {discussionPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`card ${point.bg}`}
            >
              <div className={`w-12 h-12 ${point.bg} rounded-lg flex items-center justify-center mb-4`}>
                <div className={point.color}>{point.icon}</div>
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-3">
                {point.title}
              </h3>
              <p className="text-stone-700">{point.content}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card mb-16 bg-gradient-to-br from-elisa-light/30 to-white"
        >
          <h3 className="text-xl font-semibold text-stone-900 mb-6">
            Limitations and Future Directions
          </h3>
          <div className="space-y-4">
            {futureDirections.map((direction, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-elisa-blue/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-semibold text-elisa-blue">{index + 1}</span>
                </div>
                <p className="text-stone-700">{direction}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card bg-gradient-to-r from-elisa-blue to-elisa-teal text-white"
        >
          <div className="text-center">
            <h3 className="text-2xl font-serif font-bold mb-4">
              Conclusion
            </h3>
            <p className="text-lg opacity-90 mb-6 max-w-3xl mx-auto">
              ELISA demonstrates that explicit modality routing, rather than implicit contrastive fusion, provides a more robust foundation for multimodal single-cell retrieval. By maintaining separate semantic and expression pipelines and combining them through adaptive query classification, ELISA achieves consistently superior performance across both natural language and gene-signature queries.
            </p>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              The integration of analytical modules and grounded LLM interpretation within a single interactive framework bridges the gap between data exploration and biological discovery, enabling researchers to move from raw atlas data to structured biological hypotheses within a single session.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Discussion;
