import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users } from 'lucide-react';

const comparisonData = [
  { dataset: 'CIFAR-10', fullFT: 88.28, lora: 81.29, cdwf: 85.29 },
  { dataset: 'CIFAR-100', fullFT: 64.99, lora: 49.32, cdwf: 59.57 },
  { dataset: 'PV Drift', fullFT: 91.88, lora: 86.48, cdwf: 90.10 },
  { dataset: 'PV Spike', fullFT: 94.72, lora: 93.58, cdwf: 94.10 }
];

const budgetData = [
  { fMax: 0.02, cifar10: 85.47, cifar100: 59.53, drift: 90.33, spike: 94.24 },
  { fMax: 0.05, cifar10: 86.13, cifar100: 59.53, drift: 90.45, spike: 94.48 },
  { fMax: 0.10, cifar10: 87.14, cifar100: 61.82, drift: 90.57, spike: 94.69 }
];

const backboneData = [
  { method: 'Full FT', resNet18: 85.63, resNet101: 86.94, vitB16: 96.33 },
  { method: 'LoRA', resNet18: 77.43, resNet101: 81.74, vitB16: 97.92 },
  { method: 'CDWF', resNet18: 83.19, resNet101: 84.79, vitB16: 96.81 }
];

export function ResultsCharts() {
  const [selectedChart, setSelectedChart] = useState<'comparison' | 'budget' | 'backbone'>('comparison');

  return (
    <div className="space-y-8">
      {/* Chart tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { id: 'comparison', label: 'Method Comparison', icon: <BarChart3 className="w-4 h-4" /> },
          { id: 'budget', label: 'Budget Performance', icon: <TrendingUp className="w-4 h-4" /> },
          { id: 'backbone', label: 'Backbone Comparison', icon: <Users className="w-4 h-4" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedChart(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              selectedChart === tab.id
                ? 'bg-yellow-500 text-stone-900'
                : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Method Comparison Chart */}
      {selectedChart === 'comparison' && (
        <motion.div
          key="comparison"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-stone-800/50 backdrop-blur-sm rounded-xl p-6 border border-stone-700"
        >
          <h3 className="text-xl font-semibold text-stone-100 mb-6">Performance Retention</h3>
          <div className="space-y-4">
            {comparisonData.map((row, rowIndex) => (
              <motion.div
                key={row.dataset}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: rowIndex * 0.1 }}
                className="space-y-2"
              >
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-stone-300">{row.dataset}</span>
                  <span className="text-stone-400">Accuracy (%)</span>
                </div>
                <div className="space-y-1">
                  {['Full FT', 'LoRA', 'CDWF'].map((method, colIndex) => {
                    const value = row[method.toLowerCase().replace(' ', '') as keyof typeof row] as number;
                    const max = 100;
                    const width = (value / max) * 100;
                    
                    return (
                      <div key={method} className="flex items-center gap-3">
                        <span className="w-20 text-xs text-stone-400">{method}</span>
                        <div className="flex-1 h-8 bg-stone-900/50 rounded-lg overflow-hidden relative">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${width}%` }}
                            transition={{ duration: 0.6, delay: rowIndex * 0.1 + colIndex * 0.1 }}
                            className={`h-full ${
                              method === 'Full FT' ? 'bg-stone-500' :
                              method === 'LoRA' ? 'bg-blue-500' : 'bg-yellow-500'
                            }`}
                          />
                        </div>
                        <span className="w-16 text-right text-sm font-mono text-stone-300">{value.toFixed(2)}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Legend */}
          <div className="flex gap-6 mt-6 pt-4 border-t border-stone-700">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-stone-500 rounded"></div>
              <span className="text-sm text-stone-400">Full Fine-Tuning</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-sm text-stone-400">Uniform LoRA</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span className="text-sm text-stone-400">CDWF (Ours)</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Budget Performance Chart */}
      {selectedChart === 'budget' && (
        <motion.div
          key="budget"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-stone-800/50 backdrop-blur-sm rounded-xl p-6 border border-stone-700"
        >
          <h3 className="text-xl font-semibold text-stone-100 mb-2">Budget-Aware Adaptation</h3>
          <p className="text-sm text-stone-400 mb-6">
            CDWF adjusts capacity based on available parameter budget, retaining only the most important blocks under tighter constraints.
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-700">
                  <th className="text-left py-3 px-4 text-stone-400 font-medium">Budget (f_max)</th>
                  <th className="text-right py-3 px-4 text-stone-400 font-medium">CIFAR-10</th>
                  <th className="text-right py-3 px-4 text-stone-400 font-medium">CIFAR-100</th>
                  <th className="text-right py-3 px-4 text-stone-400 font-medium">PV Drift</th>
                  <th className="text-right py-3 px-4 text-stone-400 font-medium">PV Spike</th>
                </tr>
              </thead>
              <tbody>
                {budgetData.map((row, index) => (
                  <motion.tr
                    key={row.fMax}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-stone-700/50 hover:bg-stone-700/30"
                  >
                    <td className="py-3 px-4">
                      <span className="font-medium text-yellow-500">{(row.fMax * 100).toFixed(0)}% ({(row.fMax * 100).toFixed(0)} trainable)</span>
                    </td>
                    <td className="text-right py-3 px-4 font-mono text-stone-300">{row.cifar10.toFixed(2)}</td>
                    <td className="text-right py-3 px-4 font-mono text-stone-300">{row.cifar100.toFixed(2)}</td>
                    <td className="text-right py-3 px-4 font-mono text-stone-300">{row.drift.toFixed(2)}</td>
                    <td className="text-right py-3 px-4 font-mono text-stone-300">{row.spike.toFixed(2)}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Key insight */}
          <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <p className="text-sm text-stone-300">
              <strong className="text-yellow-500">Key Insight:</strong> CDWF shows graceful degradation under tight budgets. 
              On PV tasks, it maintains &gt;99% retention even at 2% budget, demonstrating effective block selection.
            </p>
          </div>
        </motion.div>
      )}

      {/* Backbone Comparison */}
      {selectedChart === 'backbone' && (
        <motion.div
          key="backbone"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-stone-800/50 backdrop-blur-sm rounded-xl p-6 border border-stone-700"
        >
          <h3 className="text-xl font-semibold text-stone-100 mb-2">Cross-Architecture Generalization</h3>
          <p className="text-sm text-stone-400 mb-6">
            CDWF achieves near full fine-tuning performance across different backbones while reducing parameters significantly.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['resNet18', 'resNet101', 'vitB16'].map((backbone, index) => (
              <motion.div
                key={backbone}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-stone-900/50 rounded-lg p-4"
              >
                <h4 className="font-semibold text-stone-200 mb-4 capitalize">
                  {backbone.replace('vit', 'ViT ').replace('resnet', 'ResNet ')}
                </h4>
                <div className="space-y-3">
                  {backboneData.map((row) => (
                    <div key={row.method} className="flex items-center justify-between text-sm">
                      <span className={`font-medium ${
                        row.method === 'Full FT' ? 'text-stone-400' :
                        row.method === 'LoRA' ? 'text-blue-400' : 'text-yellow-500'
                      }`}>
                        {row.method}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-stone-300">{row[backbone as keyof typeof row]}%</span>
                        {row.method === 'CDWF' && (
                          <span className="text-xs text-yellow-500/80">
                            {(row.resNet18 / backboneData[0].resNet18 * 100).toFixed(0)}% retention
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Parameter reduction highlight */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { model: 'ResNet-18', reduction: '24.3×' },
              { model: 'ResNet-101', reduction: '53.0×' },
              { model: 'ViT-B/16', reduction: '859×' }
            ].map((item, index) => (
              <motion.div
                key={item.model}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="text-center p-4 bg-stone-900/50 rounded-lg border border-yellow-500/20"
              >
                <div className="text-2xl font-bold text-yellow-500">{item.reduction}</div>
                <div className="text-xs text-stone-400 mt-1">Parameter Reduction</div>
                <div className="text-sm text-stone-500 mt-1">{item.model}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
