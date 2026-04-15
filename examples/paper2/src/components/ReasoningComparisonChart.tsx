/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Brain, Zap, Target } from 'lucide-react';

const reasoningData = [
  { step: 200, reasoning: 6.8, nonReasoning: 7.2 },
  { step: 400, reasoning: 7.1, nonReasoning: 8.1 },
  { step: 600, reasoning: 7.4, nonReasoning: 8.6 },
  { step: 800, reasoning: 7.8, nonReasoning: 8.9 },
  { step: 1000, reasoning: 8.3, nonReasoning: 9.0 },
  { step: 1200, reasoning: 8.8, nonReasoning: 8.4 },
];

const highRewardData = [
  { step: 200, reasoning: 6.5, nonReasoning: 7.8 },
  { step: 400, reasoning: 6.8, nonReasoning: 8.5 },
  { step: 600, reasoning: 7.1, nonReasoning: 8.9 },
  { step: 800, reasoning: 7.4, nonReasoning: 9.0 },
  { step: 1000, reasoning: 7.8, nonReasoning: 9.0 },
  { step: 1200, reasoning: 8.2, nonReasoning: 9.0 },
];

const ReasoningComparisonChart: React.FC = () => {
  const [showGold, setShowGold] = useState(true);

  const data = showGold ? reasoningData : highRewardData;

  return (
    <div className="space-y-4">
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => setShowGold(true)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
            showGold
              ? 'bg-blue-600 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Target className="w-4 h-4" />
          Gold-Standard
        </button>
        <button
          onClick={() => setShowGold(false)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
            !showGold
              ? 'bg-amber-600 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Brain className="w-4 h-4" />
          Training Judge
        </button>
      </div>

      <div className="h-64 md:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3,3" stroke="#e2e8f0" />
            <XAxis
              dataKey="step"
              label={{ value: 'Training Steps', position: 'insideBottom', offset: -5 }}
              stroke="#64748b"
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis
              label={{ value: 'Avg Reward (0-9)', angle: -90, position: 'insideLeft' }}
              stroke="#64748b"
              domain={[0, 9]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
              formatter={(value: number) => [value.toFixed(2), '']}
            />
            <Legend />
            <Bar
              dataKey="reasoning"
              name="Reasoning Judge"
              radius={[8, 8, 0, 0]}
            >
              {data.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill="#10b981" />
              ))}
            </Bar>
            <Bar
              dataKey="nonReasoning"
              name="Non-Reasoning Judge"
              radius={[8, 8, 0, 0]}
            >
              {data.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill="#ef4444" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
        <div className="flex items-start gap-3">
          <Zap className="w-5 h-5 text-emerald-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-emerald-900 text-sm">Key Finding: Reasoning Judges Work</h4>
            <p className="text-xs text-emerald-800 mt-1">
              Under gold-standard evaluation (left chart), reasoning judges show consistent improvement (green bars rising). Non-reasoning judges initially score high but then diverge (red bars peak then plateau) due to reward hacking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReasoningComparisonChart;
