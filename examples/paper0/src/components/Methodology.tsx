import { motion } from 'framer-motion';
import { Zap, TrendingUp, BarChart3, Layers, Cpu } from 'lucide-react';

const steps = [
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Warm Start",
    description: "Brief training phase (E_warm epochs) to collect gradient signals and establish baseline performance.",
    color: "#F59E0B"
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Gradient Analysis",
    description: "Compute importance scores I_i for each block based on gradient magnitudes during warm-start.",
    color: "#3B82F6"
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: "Predictive Model",
    description: "Estimate accuracy for each configuration using A_hat(C) = A_warm + G_max * weighted_importance.",
    color: "#10B981"
  },
  {
    icon: <Layers className="w-8 h-8" />,
    title: "Constrained Search",
    description: "Select optimal configuration C* that maximizes predicted accuracy under parameter budget f_max.",
    color: "#EF4444"
  },
  {
    icon: <Cpu className="w-8 h-8" />,
    title: "Apply & Fine-tune",
    description: "Keep top-k blocks trainable, freeze rest with LoRA adapters at rank r*. Final fine-tuning for E_ft epochs.",
    color: "#8B5CF6"
  }
];

export function MethodologyDiagram() {
  return (
    <div className="relative">
      {/* Connecting lines */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
        {[...Array(4)].map((_, i) => (
          <line
            key={i}
            x1={`${(i + 1) * 25}%`}
            y1="50%"
            x2={`${(i + 2) * 25}%`}
            y2="50%"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            strokeDasharray="8,4"
          />
        ))}
      </svg>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            className="relative bg-stone-800/50 backdrop-blur-sm rounded-xl p-6 border border-stone-700 hover:border-yellow-500/50 transition-colors"
          >
            <div
              className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: step.color }}
            >
              {index + 1}
            </div>
            <div className="flex justify-center mb-4">{step.icon}</div>
            <h3 className="text-lg font-semibold text-stone-100 text-center mb-2">{step.title}</h3>
            <p className="text-sm text-stone-400 text-center leading-relaxed">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function ProblemStatement() {
  const attackTypes = [
    {
      name: "Bias Attacks",
      description: "Persistent offsets in sensor readings through small multiplicative perturbations (±0.3%-0.8%)",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "bg-yellow-500/20 border-yellow-500/40"
    },
    {
      name: "Drift Attacks",
      description: "Gradual sensor degradation with linear ramps (0.5%-1.5%) over interior time windows",
      icon: <TrendingUp className="w-6 h-6 transform rotate-45" />,
      color: "bg-blue-500/20 border-blue-500/40"
    },
    {
      name: "Spike Attacks",
      description: "Brief high-frequency disturbances (1%-20% of nominal) with sparse impulse perturbations",
      icon: <Zap className="w-6 h-6" />,
      color: "bg-red-500/20 border-red-500/40"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {attackTypes.map((attack, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className={`p-6 rounded-xl border ${attack.color} backdrop-blur-sm`}
        >
          <div className="flex items-center mb-4">
            <div className="p-2 bg-stone-800/50 rounded-lg mr-3">{attack.icon}</div>
            <h3 className="text-lg font-semibold text-stone-100">{attack.name}</h3>
          </div>
          <p className="text-sm text-stone-300 leading-relaxed">{attack.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
