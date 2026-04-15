import { motion } from 'framer-motion';
import { Lightbulb, Microscope, Beaker, FlaskConical } from 'lucide-react';

const discoveries = [
  {
    dataset: 'CF airway',
    primaryFinding: 'Altered immune–structural cell crosstalk and inflammatory signaling in cystic fibrosis airway tissue',
    candidateDiscovery: 'Detection of the macrophage CALR–LRP1 signaling axis',
    hypothesis: 'Altered apoptotic cell recognition or phagocytic clearance pathways contributing to the CF lung inflammatory microenvironment',
    icon: <Microscope className="w-6 h-6" />,
    color: 'border-elisa-blue',
    bg: 'bg-elisa-blue/5',
  },
  {
    dataset: 'Breast Atlas',
    primaryFinding: 'Ancestry-associated epithelial lineage variation and luminal progenitor states in healthy breast tissue',
    candidateDiscovery: 'Enrichment of the Kelch-family gene KLHL29 in basal–myoepithelial cells',
    hypothesis: 'A potential additional marker or regulator of basal epithelial structural identity',
    icon: <Beaker className="w-6 h-6" />,
    color: 'border-elisa-teal',
    bg: 'bg-elisa-teal/5',
  },
  {
    dataset: 'Fetal Lung AT2',
    primaryFinding: 'ITCH-mediated ubiquitin-dependent regulation of surfactant protein C (SFTPC) maturation in alveolar type II cells',
    candidateDiscovery: 'Upregulation of TRIM21 and TRIM65 in mature AT2 cells',
    hypothesis: 'Additional TRIM-family ubiquitin ligases may participate in surfactant protein processing and proteostasis',
    icon: <FlaskConical className="w-6 h-6" />,
    color: 'border-elisa-purple',
    bg: 'bg-elisa-purple/5',
  },
  {
    dataset: 'ICB Multi-Cancer',
    primaryFinding: 'Tumor and immune transcriptional responses associated with immune checkpoint blockade therapy',
    candidateDiscovery: 'Elevated CD163 and MRC1 expression in tumor-associated macrophages',
    hypothesis: 'An M2-like polarization state potentially associated with therapy-induced immune remodeling',
    icon: <Lightbulb className="w-6 h-6" />,
    color: 'border-elisa-gold',
    bg: 'bg-elisa-gold/5',
  },
  {
    dataset: 'Neuroblastoma',
    primaryFinding: 'Therapy-induced transcriptional rewiring of tumor cell states and microenvironment interactions',
    candidateDiscovery: 'Differential AP-1 transcription factor usage: JUND enriched at diagnosis, JUNB/FOS enriched post-treatment',
    hypothesis: 'Dynamic remodeling of AP-1–mediated stress-response programs during therapy-induced state transitions',
    icon: <Microscope className="w-6 h-6" />,
    color: 'border-elisa-green',
    bg: 'bg-elisa-green/5',
  },
  {
    dataset: 'Brain Development Atlas',
    primaryFinding: 'Chromatin accessibility programs defining early neuronal lineage specification',
    candidateDiscovery: 'Shared transcription factor module (TFAP2B, LHX5, LHX1) across Purkinje neurons and midbrain GABAergic populations',
    hypothesis: 'A conserved regulatory program for inhibitory neuron specification in anatomically distinct brain regions',
    icon: <FlaskConical className="w-6 h-6" />,
    color: 'border-stone-400',
    bg: 'bg-stone-100',
  },
];

function CandidateDiscoveries() {
  return (
    <section id="discoveries" className="py-20 bg-gradient-to-b from-white to-stone-50">
      <div className="max-w-6xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">Candidate Regulatory Signals</h2>
          <p className="section-subheading max-w-3xl mx-auto">
            ELISA's discovery mode highlights candidate regulatory signals not explicitly emphasized in the reference publications
          </p>
          <p className="text-stone-600 mb-8">
            These transcriptome-derived hypotheses serve as starting points for targeted experimental validation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {discoveries.map((discovery, index) => (
            <motion.div
              key={discovery.dataset}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`card ${discovery.color} border-l-4`}
            >
              <div className={`${discovery.bg} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <div className="text-elisa-blue">{discovery.icon}</div>
              </div>
              <h3 className="text-lg font-semibold text-stone-900 mb-2">
                {discovery.dataset}
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-medium text-stone-500 uppercase tracking-wide mb-1">
                    Primary Finding
                  </h4>
                  <p className="text-sm text-stone-700">{discovery.primaryFinding}</p>
                </div>
                <div>
                  <h4 className="text-xs font-medium text-elisa-blue uppercase tracking-wide mb-1">
                    ELISA Discovery
                  </h4>
                  <p className="text-sm text-stone-700">{discovery.candidateDiscovery}</p>
                </div>
                <div className="bg-elisa-light/50 rounded-lg p-3">
                  <h4 className="text-xs font-medium text-elisa-teal uppercase tracking-wide mb-1">
                    Hypothesis
                  </h4>
                  <p className="text-sm text-stone-700 italic">{discovery.hypothesis}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card mt-12 bg-gradient-to-br from-elisa-light/30 to-white border-l-4 border-l-elisa-blue"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-elisa-blue/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-6 h-6 text-elisa-blue" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-stone-900 mb-3">
                From Discovery to Validation
              </h3>
              <p className="text-stone-700 mb-4">
                These findings illustrate how ELISA can surface candidate regulatory programs across diverse single-cell atlases. While these signals should be interpreted as transcriptome-derived hypotheses, they provide potential starting points for targeted functional validation.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-elisa-blue mb-1">6</div>
                  <div className="text-sm text-stone-600">Datasets Analyzed</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-elisa-teal mb-1">6</div>
                  <div className="text-sm text-stone-600">Novel Hypotheses Generated</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-elisa-purple mb-1">∞</div>
                  <div className="text-sm text-stone-600">Validation Opportunities</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CandidateDiscoveries;
