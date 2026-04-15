import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowUp, TrendingUp } from 'lucide-react';

const performanceData = [
  {
    dataset: 'CF Airways',
    cellWhisperer_Ont_MRR: 0.82,
    elisaUnion_Ont_MRR: 0.95,
    cellWhisperer_Exp_MRR: 0.35,
    elisaUnion_Exp_MRR: 0.88,
  },
  {
    dataset: 'Neuroblastoma',
    cellWhisperer_Ont_MRR: 0.78,
    elisaUnion_Ont_MRR: 0.92,
    cellWhisperer_Exp_MRR: 0.42,
    elisaUnion_Exp_MRR: 0.91,
  },
  {
    dataset: 'ICB Multi-Cancer',
    cellWhisperer_Ont_MRR: 0.68,
    elisaUnion_Ont_MRR: 0.85,
    cellWhisperer_Exp_MRR: 0.28,
    elisaUnion_Exp_MRR: 0.82,
  },
  {
    dataset: 'Breast Atlas',
    cellWhisperer_Ont_MRR: 0.85,
    elisaUnion_Ont_MRR: 0.97,
    cellWhisperer_Exp_MRR: 0.38,
    elisaUnion_Exp_MRR: 0.75,
  },
  {
    dataset: 'Fetal Lung AT2',
    cellWhisperer_Ont_MRR: 0.72,
    elisaUnion_Ont_MRR: 0.88,
    cellWhisperer_Exp_MRR: 0.32,
    elisaUnion_Exp_MRR: 0.86,
  },
  {
    dataset: 'Brain Atlas',
    cellWhisperer_Ont_MRR: 0.75,
    elisaUnion_Ont_MRR: 0.90,
    cellWhisperer_Exp_MRR: 0.30,
    elisaUnion_Exp_MRR: 0.84,
  },
];

const comparisonStats = [
  { metric: 'Expression MRR Δ', value: '+0.41', pValue: '<0.001', cohenD: '5.98', positive: true },
  { metric: 'Expression Recall@5 Δ', value: '+0.29', pValue: '0.006', cohenD: '1.57', positive: true },
  { metric: 'Ontology MRR Δ', value: '+0.15', pValue: '0.028', cohenD: '1.02', positive: true },
  { metric: 'Ontology Recall@5 Δ', value: '+0.08', pValue: '0.047', cohenD: '0.84', positive: true },
  { metric: 'Combined Test', value: 'p<0.001', pValue: '', cohenD: '', positive: true },
];

function RetrievalPerformance() {
  const [queryType, setQueryType] = useState<'Ontology' | 'Expression'>('Expression');
  const [showStats, setShowStats] = useState(false);

  const chartData = performanceData.map((d) => ({
    name: d.dataset,
    'CellWhisperer': queryType === 'Ontology' ? d.cellWhisperer_Ont_MRR : d.cellWhisperer_Exp_MRR,
    'ELISA Union': queryType === 'Ontology' ? d.elisaUnion_Ont_MRR : d.elisaUnion_Exp_MRR,
  }));

  const colors = {
    CellWhisperer: '#ec4899',
    'ELISA Union': '#10b981',
  };

  return (
    <section id="performance" className="py-20 bg-gradient-to-b from-white to-stone-50">
      <div className="max-w-6xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">Retrieval Performance</h2>
          <p className="section-subheading max-w-3xl mx-auto">
            ELISA significantly outperforms CellWhisperer across six diverse datasets and both query types
          </p>
        </motion.div>

        <div className="card mb-12">
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQueryType('Ontology')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  queryType === 'Ontology'
                    ? 'bg-elisa-blue text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                Ontology Queries
              </button>
              <button
                onClick={() => setQueryType('Expression')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  queryType === 'Expression'
                    ? 'bg-elisa-blue text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                Expression Queries
              </button>
            </div>
            <button
              onClick={() => setShowStats(!showStats)}
              className="px-4 py-2 bg-elisa-teal/10 text-elisa-teal rounded-lg font-medium hover:bg-elisa-teal/20 transition-colors flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              {showStats ? 'Hide' : 'Show'} Statistics
            </button>
          </div>

          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis
                  domain={[0, 1]}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => value.toFixed(2)}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                  formatter={(value: number) => [value.toFixed(3), queryType === 'Ontology' ? `${queryType} MRR` : `${queryType} MRR`]}
                  labelStyle={{ color: '#1f2937', fontWeight: 'bold' }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Bar
                  dataKey="CellWhisperer"
                  fill={colors.CellWhisperer}
                  radius={[4, 4, 0, 0]}
                  name="CellWhisperer"
                />
                <Bar
                  dataKey="ELISA Union"
                  fill={colors['ELISA Union']}
                  radius={[4, 4, 0, 0]}
                  name="ELISA Union"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {showStats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {comparisonStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="stat-card"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-stone-600">{stat.metric}</h4>
                  {stat.positive && (
                    <ArrowUp className="w-4 h-4 text-elisa-green" />
                  )}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-elisa-green">{stat.value}</span>
                  {stat.pValue && (
                    <span className="text-sm text-stone-500">p={stat.pValue}</span>
                  )}
                  {stat.cohenD && (
                    <span className="text-sm text-stone-500">d={stat.cohenD}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card bg-gradient-to-br from-elisa-light/30 to-white"
        >
          <h3 className="text-xl font-semibold text-stone-900 mb-4">Key Findings</h3>
          <div className="space-y-4">
            <p className="text-stone-700">
              <strong className="text-elisa-blue">Combined Permutation Test:</strong> ELISA Union significantly outperformed CellWhisperer (p &lt; 0.001; 50,000 permutations), winning 46 of 54 individual metric comparisons across all datasets.
            </p>
            <p className="text-stone-700">
              <strong className="text-elisa-teal">Expression Query Advantage:</strong> Large improvements on expression queries (mean Δ MRR = +0.41, Cohen's d = 5.98), demonstrating the critical value of dedicated gene marker scoring.
            </p>
            <p className="text-stone-700">
              <strong className="text-elisa-purple">Ontology Query Performance:</strong> Consistent gains on ontology queries (mean Δ MRR = +0.15, p = 0.028), with Semantic ELISA pipeline alone significantly outperforming CellWhisperer (p = 0.003).
            </p>
            <p className="text-stone-700">
              <strong className="text-elisa-green">Modality Complementarity:</strong> No single retrieval modality dominated across both query types. The Semantic pipeline excelled on ontology queries, while the gene marker scoring pipeline won on expression queries in every dataset.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default RetrievalPerformance;
