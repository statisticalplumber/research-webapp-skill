/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
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
import { Trophy, Crown } from 'lucide-react';

const creativeWritingData = [
  { model: 'o3', score: 92.4, isTop: true },
  { model: 'R1 + Llama-3.1', score: 89.6, isAdversarial: true },
  { model: 'DeepSeek-R1', score: 89.2, isTop: false },
  { model: 'Gemini-2.5', score: 85.2, isTop: false },
  { model: 'GPT-4.1', score: 78.6, isTop: false },
  { model: 'Claude-3.7', score: 72.5, isTop: false },
  { model: 'Qwen3-32B', score: 65.2, isTop: false },
  { model: 'Gemini-2.0', score: 50.0, isTop: false },
];

const hardPromptData = [
  { model: 'o3', score: 86.8, isTop: true },
  { model: 'o4-mini-High', score: 81.2, isTop: false },
  { model: 'Gemini-2.5', score: 55.9, isTop: false },
  { model: 'DeepSeek-R1', score: 48.5, isTop: false },
  { model: 'Claude-3.7', score: 47.9, isTop: false },
  { model: 'R1 + Llama-3.1', score: 39.1, isAdversarial: true },
  { model: 'Qwen3-32B', score: 38.2, isTop: false },
  { model: 'Claude-3.5', score: 27.4, isTop: false },
];

const ArenaHardChart: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Creative Writing */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-5 h-5 text-amber-500" />
          <h4 className="font-semibold text-slate-900">Creative Writing Subset</h4>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={creativeWritingData}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3,3" stroke="#e2e8f0" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} stroke="#64748b" />
              <YAxis
                type="category"
                dataKey="model"
                width={120}
                stroke="#64748b"
                fontSize={10}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [`${value}%`, '']}
                labelFormatter={(label) => `Model: ${label}`}
              />
              <Legend />
              <Bar dataKey="score" name="Win Rate (%)" radius={[0, 4, 4, 0]} barSize={20}>
                {creativeWritingData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.isTop ? '#fbbf24' : entry.isAdversarial ? '#3b82f6' : '#64748b'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Hard Prompt */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Crown className="w-5 h-5 text-slate-700" />
          <h4 className="font-semibold text-slate-900">Hard Prompt Subset</h4>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={hardPromptData}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3,3" stroke="#e2e8f0" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} stroke="#64748b" />
              <YAxis
                type="category"
                dataKey="model"
                width={120}
                stroke="#64748b"
                fontSize={10}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [`${value}%`, '']}
                labelFormatter={(label) => `Model: ${label}`}
              />
              <Legend />
              <Bar dataKey="score" name="Win Rate (%)" radius={[0, 4, 4, 0]} barSize={20}>
                {hardPromptData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.isTop ? '#fbbf24' : entry.isAdversarial ? '#3b82f6' : '#64748b'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 justify-center text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-amber-400"></div>
          <span>Top Performer</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-blue-500"></div>
          <span>Adversarial Policy</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-slate-400"></div>
          <span>Other Models</span>
        </div>
      </div>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong className="text-blue-900">Surprising Result:</strong> The Llama-3.1-8B policy trained with Qwen3-4B reasoning judge achieves ~90% win rate on creative writing, outperforming frontier models like Gemini-2.5 and o4-mini. This is achieved through adversarial outputs that deceive the judge.
        </p>
      </div>
    </div>
  );
};

export default ArenaHardChart;
