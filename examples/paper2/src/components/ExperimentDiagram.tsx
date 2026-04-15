/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, CheckCircle, AlertTriangle } from 'lucide-react';

const ExperimentDiagram: React.FC = () => {
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);

  const parts = [
    {
      id: 'gold',
      label: 'Gold-Standard Judge',
      desc: 'gpt-oss-120b provides preference annotations for both judge training and policy evaluation',
      icon: CheckCircle,
      color: 'emerald',
    },
    {
      id: 'judge-train',
      label: 'Judge Fine-tuning',
      desc: 'Qwen3 1.7B-14B models trained with SFT (reasoning) or direct SFT (non-reasoning)',
      icon: Brain,
      color: 'blue',
    },
    {
      id: 'policy-train',
      label: 'Policy Training',
      desc: 'Llama-3.1-8B, Qwen2.5-7B, Qwen3-4B fine-tuned using judge rewards via GRPO',
      icon: TrendingUp,
      color: 'purple',
    },
    {
      id: 'eval',
      label: 'Gold Evaluation',
      desc: 'Trained policies evaluated by gold-standard judge on held-out test set',
      icon: AlertTriangle,
      color: 'amber',
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-200">
        <h3 className="font-serif text-xl font-semibold text-slate-900">Experimental Pipeline</h3>
        <p className="text-sm text-slate-500 mt-1">Click on each component to learn more</p>
      </div>

      <div className="p-6">
        {/* Diagram */}
        <div className="relative">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            {/* Gold-Standard */}
            <motion.div
              className={`flex flex-col items-center p-6 rounded-xl border-2 transition-all cursor-pointer ${
                hoveredPart === 'gold'
                  ? 'border-emerald-500 bg-emerald-50 scale-105'
                  : 'border-emerald-200 bg-emerald-50/50 hover:border-emerald-300'
              }`}
              onMouseEnter={() => setHoveredPart('gold')}
              onMouseLeave={() => setHoveredPart(null)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>
              <h4 className="font-semibold text-slate-900 text-center">Gold-Standard</h4>
              <p className="text-xs text-slate-500 text-center mt-1">gpt-oss-120b</p>
            </motion.div>

            {/* Arrow 1 */}
            <div className="hidden md:block text-slate-400">
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                <path d="M2 12H36M36 12L28 4M36 12L28 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="md:hidden text-slate-400">
              <svg width="24" height="40" viewBox="0 0 24 40" fill="none">
                <path d="M12 2V36M12 36L4 28M12 36L20 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            {/* Judges */}
            <motion.div
              className={`flex flex-col items-center p-6 rounded-xl border-2 transition-all cursor-pointer ${
                hoveredPart === 'judge-train'
                  ? 'border-blue-500 bg-blue-50 scale-105'
                  : 'border-blue-200 bg-blue-50/50 hover:border-blue-300'
              }`}
              onMouseEnter={() => setHoveredPart('judge-train')}
              onMouseLeave={() => setHoveredPart(null)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-slate-900 text-center">Judges</h4>
              <p className="text-xs text-slate-500 text-center mt-1">Qwen3 1.7B-14B</p>
              <div className="flex gap-2 mt-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Reasoning</span>
                <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">Non-Reasoning</span>
              </div>
            </motion.div>

            {/* Arrow 2 */}
            <div className="hidden md:block text-slate-400">
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                <path d="M2 12H36M36 12L28 4M36 12L28 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="md:hidden text-slate-400">
              <svg width="24" height="40" viewBox="0 0 24 40" fill="none">
                <path d="M12 2V36M12 36L4 28M12 36L20 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            {/* Policies */}
            <motion.div
              className={`flex flex-col items-center p-6 rounded-xl border-2 transition-all cursor-pointer ${
                hoveredPart === 'policy-train'
                  ? 'border-purple-500 bg-purple-50 scale-105'
                  : 'border-purple-200 bg-purple-50/50 hover:border-purple-300'
              }`}
              onMouseEnter={() => setHoveredPart('policy-train')}
              onMouseLeave={() => setHoveredPart(null)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-slate-900 text-center">Policies</h4>
              <p className="text-xs text-slate-500 text-center mt-1">Llama-3.1, Qwen2.5/3</p>
              <div className="flex gap-2 mt-2">
                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">GRPO</span>
                <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">RL</span>
              </div>
            </motion.div>

            {/* Arrow 3 */}
            <div className="hidden md:block text-slate-400">
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                <path d="M2 12H36M36 12L28 4M36 12L28 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="md:hidden text-slate-400">
              <svg width="24" height="40" viewBox="0 0 24 40" fill="none">
                <path d="M12 2V36M12 36L4 28M12 36L20 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            {/* Evaluation */}
            <motion.div
              className={`flex flex-col items-center p-6 rounded-xl border-2 transition-all cursor-pointer ${
                hoveredPart === 'eval'
                  ? 'border-amber-500 bg-amber-50 scale-105'
                  : 'border-amber-200 bg-amber-50/50 hover:border-amber-300'
              }`}
              onMouseEnter={() => setHoveredPart('eval')}
              onMouseLeave={() => setHoveredPart(null)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-8 h-8 text-amber-600" />
              </div>
              <h4 className="font-semibold text-slate-900 text-center">Evaluation</h4>
              <p className="text-xs text-slate-500 text-center mt-1">Gold Standard Assessment</p>
            </motion.div>
          </div>

          {/* Feedback loop arrow */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 pointer-events-none hidden md:block">
            <svg width="100%" height="60" viewBox="0 0 800 60">
              <path
                d="M 70,50 Q 70,30 150,30 Q 550,30 650,30 Q 730,30 730,50"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="2"
                strokeDasharray="8,4"
              />
              <polygon points="730,50 720,45 720,55" fill="#94a3b8" />
            </svg>
          </div>
        </div>

        {/* Info Panel */}
        <motion.div
          key={hoveredPart || 'gold'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200"
        >
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg bg-${parts.find(p => p.id === (hoveredPart || 'gold'))?.color}-100`}>
              {React.createElement(parts.find(p => p.id === (hoveredPart || 'gold'))?.icon || CheckCircle, {
                className: `w-5 h-5 text-${parts.find(p => p.id === (hoveredPart || 'gold'))?.color}-600`,
              })}
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">
                {parts.find(p => p.id === (hoveredPart || 'gold'))?.label}
              </h4>
              <p className="text-sm text-slate-600 mt-1">
                {parts.find(p => p.id === (hoveredPart || 'gold'))?.desc}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ExperimentDiagram;
