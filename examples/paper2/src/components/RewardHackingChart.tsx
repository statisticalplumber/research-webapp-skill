/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { AlertTriangle, TrendingUp } from 'lucide-react';

const rewardHackingData = [
  { step: 0, reasoning: 6.2, nonReasoning: 6.1 },
  { step: 200, reasoning: 6.8, nonReasoning: 7.2 },
  { step: 400, reasoning: 7.1, nonReasoning: 8.1 },
  { step: 600, reasoning: 7.4, nonReasoning: 8.6 },
  { step: 800, reasoning: 7.8, nonReasoning: 8.9 },
  { step: 1000, reasoning: 8.3, nonReasoning: 9.0 },
  { step: 1200, reasoning: 8.8, nonReasoning: 8.4 },
];

const highRewardData = [
  { step: 0, reasoning: 6.2, nonReasoning: 6.1 },
  { step: 200, reasoning: 6.5, nonReasoning: 7.8 },
  { step: 400, reasoning: 6.8, nonReasoning: 8.5 },
  { step: 600, reasoning: 7.1, nonReasoning: 8.9 },
  { step: 800, reasoning: 7.4, nonReasoning: 9.0 },
  { step: 1000, reasoning: 7.8, nonReasoning: 9.0 },
  { step: 1200, reasoning: 8.2, nonReasoning: 9.0 },
];

const RewardHackingChart: React.FC = () => {
  const [showGold, setShowGold] = useState(true);
  const [showTrain, setShowTrain] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => setShowGold(true)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            showGold
              ? 'bg-blue-600 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Gold-Standard Eval
        </button>
        <button
          onClick={() => setShowTrain(true)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            showTrain
              ? 'bg-amber-600 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Training Judge Eval
        </button>
      </div>

      <div className="h-64 md:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={showGold ? rewardHackingData : highRewardData}>
            <CartesianGrid strokeDasharray="3,3" stroke="#e2e8f0" />
            <XAxis
              dataKey="step"
              label={{ value: 'Training Steps', position: 'insideBottom', offset: -5 }}
              stroke="#64748b"
            />
            <YAxis
              label={{ value: 'Average Reward (0-9)', angle: -90, position: 'insideLeft' }}
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
            <Line
              type="monotone"
              dataKey="reasoning"
              name="Reasoning Judge"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7 }}
            />
            <Line
              type="monotone"
              dataKey="nonReasoning"
              name="Non-Reasoning Judge"
              stroke="#ef4444"
              strokeWidth={3}
              dot={{ fill: '#ef4444', strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h4 className="font-semibold text-amber-900 text-sm">Non-Reasoning: Reward Hacking</h4>
          </div>
          <p className="text-xs text-amber-800">
            Policy receives high rewards from training judge but performance drops under gold-standard evaluation. The red line shows the divergence.
          </p>
        </div>
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold text-blue-900 text-sm">Reasoning: Genuine Improvement</h4>
          </div>
          <p className="text-xs text-blue-800">
            Policy performance increases consistently under gold-standard evaluation, showing real learning rather than exploitation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RewardHackingChart;
