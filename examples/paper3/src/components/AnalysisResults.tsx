import { useState } from 'react';
import { motion } from 'framer-motion';
import { Table as TableIcon, CheckCircle } from 'lucide-react';

const analysisData = [
  {
    dataset: 'CF airway',
    geneCov: 0.80,
    pathwayAlign: 1.0,
    intRec: 0.20,
    propCons: true,
    themeCov: 0.85,
    compScore: 0.82,
    keyFinding: 'Epithelial and immune cell populations, IFN-γ programs',
    markers: ['IFNG', 'CD69', 'HLA-E'],
  },
  {
    dataset: 'Neuroblastoma',
    geneCov: 0.84,
    pathwayAlign: 1.0,
    intRec: 1.0,
    propCons: true,
    themeCov: 0.88,
    compScore: 0.95,
    keyFinding: 'HB-EGF/ERBB4 paracrine axis, mTOR/MAPK/ErbB programs',
    markers: ['HB-EGF', 'ERBB4'],
  },
  {
    dataset: 'ICB Multi-Cancer',
    geneCov: 0.77,
    pathwayAlign: 1.0,
    intRec: 1.0,
    propCons: true,
    themeCov: 0.91,
    compScore: 0.93,
    keyFinding: 'Checkpoint molecules (CD274, PDCD1, CTLA4), TIGIT/NECTIN2',
    markers: ['CD274', 'PDCD1', 'CTLA4'],
  },
  {
    dataset: 'Breast Atlas',
    geneCov: 0.96,
    pathwayAlign: 1.0,
    intRec: 0.80,
    propCons: true,
    themeCov: 0.89,
    compScore: 0.96,
    keyFinding: 'Epithelial hierarchy with high fidelity',
    markers: ['Epithelial markers'],
  },
  {
    dataset: 'Fetal Lung AT2',
    geneCov: 1.0,
    pathwayAlign: 1.0,
    intRec: 0.40,
    propCons: true,
    themeCov: 0.88,
    compScore: 0.91,
    keyFinding: 'Surfactant genes, Wnt, FGF programs',
    markers: ['SFTPC'],
  },
  {
    dataset: 'Brain Atlas',
    geneCov: 0.85,
    pathwayAlign: 1.0,
    intRec: 1.0,
    propCons: true,
    themeCov: 0.90,
    compScore: 0.95,
    keyFinding: 'Major neuronal populations with perfect pathway recovery',
    markers: ['Neuronal markers'],
  },
];

function AnalysisResults() {
  const [selectedDataset, setSelectedDataset] = useState<string | null>(null);

  const selectedData = selectedDataset
    ? analysisData.find((d) => d.dataset === selectedDataset)
    : null;

  const metricColors = {
    geneCov: '#8b5cf6',
    pathwayAlign: '#14b8a6',
    intRec: '#f59e0b',
    themeCov: '#1e40af',
    compScore: '#10b981',
  };

  const metricLabels = {
    geneCov: 'Gene Coverage',
    pathwayAlign: 'Pathway Alignment',
    intRec: 'Interaction Recovery',
    themeCov: 'Theme Coverage',
    compScore: 'Composite Score',
  };

  return (
    <section id="analysis" className="py-20 bg-gradient-to-b from-stone-50 to-white">
      <div className="max-w-6xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">Analysis Replication Results</h2>
          <p className="section-subheading max-w-3xl mx-auto">
            ELISA replicates published biological findings across six diverse datasets with a mean composite score of 0.90
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            {analysisData.map((data, index) => (
              <motion.button
                key={data.dataset}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => setSelectedDataset(data.dataset)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  selectedDataset === data.dataset
                    ? 'border-elisa-blue bg-elisa-light'
                    : 'border-stone-200 hover:border-elisa-blue/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-stone-900">{data.dataset}</h4>
                    <p className="text-sm text-stone-600 mt-1">{data.keyFinding}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-elisa-green">
                      {data.compScore.toFixed(2)}
                    </span>
                    {data.propCons && (
                      <CheckCircle className="w-5 h-5 text-elisa-green" />
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="card">
            {selectedData ? (
              <div>
                <h3 className="text-xl font-semibold text-stone-900 mb-6">
                  {selectedData.dataset}
                </h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-stone-600 mb-3">
                      Key Markers
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedData.markers.map((marker, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-elisa-blue/10 text-elisa-blue rounded-full text-sm font-mono"
                        >
                          {marker}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-stone-600 mb-3">
                      Performance Metrics
                    </h4>
                    <div className="space-y-3">
                      {(Object.keys(metricColors) as Array<keyof typeof metricColors>).map(
                        (metric) => (
                          <div key={metric}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm text-stone-600">
                                {metricLabels[metric]}
                              </span>
                              <span className="text-sm font-medium text-stone-900">
                                {typeof selectedData[metric] === 'boolean'
                                  ? selectedData[metric]
                                    ? 'Yes'
                                    : 'No'
                                  : (selectedData[metric] as number).toFixed(2)}
                              </span>
                            </div>
                            {typeof selectedData[metric] !== 'boolean' && (
                              <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full rounded-full transition-all"
                                  style={{
                                    width: `${(selectedData[metric] as number) * 100}%`,
                                    backgroundColor: metricColors[metric],
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-200">
                    <h4 className="text-sm font-medium text-stone-600 mb-2">
                      Key Finding
                    </h4>
                    <p className="text-stone-700 text-sm">
                      {selectedData.keyFinding}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <TableIcon className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                <p className="text-stone-500">Select a dataset to view details</p>
              </div>
            )}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card bg-gradient-to-br from-elisa-light/30 to-white"
        >
          <h3 className="text-xl font-semibold text-stone-900 mb-6">Summary of Replication Performance</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-elisa-purple mb-2">0.90</div>
              <div className="text-sm text-stone-600">Mean Composite Score</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-elisa-teal mb-2">0.98</div>
              <div className="text-sm text-stone-600">Pathway Alignment</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-elisa-gold mb-2">0.85</div>
              <div className="text-sm text-stone-600">Gene Coverage</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-elisa-blue mb-2">0.77</div>
              <div className="text-sm text-stone-600">Interaction Recovery</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AnalysisResults;
