import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Settings2 } from 'lucide-react';

interface Block {
  id: number;
  importance: number;
  status: 'trainable' | 'lora' | 'pending';
}

export function AlgorithmVisualizer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  
  // Simulated model with 8 blocks
  const [blocks, setBlocks] = useState<Block[]>(
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      importance: Math.random(),
      status: 'pending' as const
    }))
  );

  const resetVisualization = () => {
    setBlocks(
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        importance: Math.random(),
        status: 'pending' as const
      }))
    );
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const runAlgorithm = () => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }

    resetVisualization();
    
    // Step 1: Warm start - all pending
    setTimeout(() => setCurrentStep(1), 100);
    
    // Step 2: Compute importance and sort
    setTimeout(() => {
      setBlocks(prev => [...prev].sort((a, b) => b.importance - a.importance));
      setCurrentStep(2);
    }, 500);
    
    // Step 3-4: Select top-k blocks as trainable (k=2 for this demo)
    setTimeout(() => {
      setBlocks(prev => prev.map((b, i) => ({
        ...b,
        status: i < 2 ? 'trainable' : 'lora'
      })));
      setCurrentStep(3);
    }, 1000);
    
    // Step 5: Complete
    setTimeout(() => {
      setCurrentStep(4);
      setIsPlaying(false);
    }, 1500);
  };

  const importanceColors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-green-500',
    'bg-blue-500',
    'bg-indigo-500',
    'bg-purple-500',
    'bg-pink-500'
  ];

  return (
    <div className="bg-stone-800/50 backdrop-blur-sm rounded-xl p-6 border border-stone-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-stone-100">CDWF Algorithm Visualization</h3>
        <div className="flex gap-2">
          <button
            onClick={runAlgorithm}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-stone-900 rounded-lg font-medium transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? 'Pause' : 'Run Algorithm'}
          </button>
          <button
            onClick={resetVisualization}
            className="p-2 bg-stone-700 hover:bg-stone-600 text-stone-100 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-stone-400 mb-2">
          <span>Progress</span>
          <span>{currentStep === 0 ? 'Ready' : `Step ${currentStep}/4`}</span>
        </div>
        <div className="h-2 bg-stone-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-500 to-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / 4) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Block visualization */}
      <div className="space-y-3 mb-6">
        {blocks.map((block, index) => (
          <motion.div
            key={block.id}
            layout
            className={`flex items-center gap-4 p-3 rounded-lg border transition-all ${
              block.status === 'trainable' 
                ? 'bg-yellow-500/20 border-yellow-500/50' 
                : block.status === 'lora'
                ? 'bg-blue-500/20 border-blue-500/50'
                : 'bg-stone-700/30 border-stone-600'
            }`}
          >
            <div className="w-8 text-sm text-stone-400 font-mono">
              {block.status === 'pending' ? '?' : index + 1}
            </div>
            
            {/* Importance bar */}
            <div className="flex-1 h-8 bg-stone-900/50 rounded-lg overflow-hidden relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${block.importance * 100}%` }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`h-full ${importanceColors[block.id]} opacity-80`}
              />
            </div>

            {/* Status badge */}
            <AnimatePresence mode="wait">
              {block.status !== 'pending' && (
                <motion.div
                  key={block.status}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    block.status === 'trainable'
                      ? 'bg-yellow-500 text-stone-900'
                      : 'bg-blue-500 text-white'
                  }`}
                >
                  {block.status === 'trainable' ? 'Trainable' : `LoRA (r*)`}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Importance score */}
            <div className="w-20 text-right text-sm text-stone-400 font-mono">
              {block.importance.toFixed(3)}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span className="text-stone-300">Fully Trainable</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span className="text-stone-300">LoRA Adapted</span>
        </div>
      </div>

      {/* Step descriptions */}
      <AnimatePresence mode="wait">
        {currentStep > 0 && (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 p-4 bg-stone-900/50 rounded-lg border border-stone-700"
          >
            <div className="flex items-start gap-3">
              <Settings2 className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-stone-100 mb-1">
                  {currentStep === 1 && "Phase 1: Warm Start Training"}
                  {currentStep === 2 && "Phase 2: Gradient Importance Computation"}
                  {currentStep === 3 && "Phase 3: Configuration Selection"}
                  {currentStep === 4 && "Phase 4: Apply & Fine-tune"}
                </h4>
                <p className="text-sm text-stone-400">
                  {currentStep === 1 && "Brief training to collect gradient signals and establish baseline accuracy."}
                  {currentStep === 2 && "Sort blocks by importance score I_i = G_i / ΣG_k (normalized gradient magnitudes)."}
                  {currentStep === 3 && `Select top-k=2 blocks for full trainability, apply LoRA adapters to remaining B-k blocks.`}
                  {currentStep === 4 && "Fine-tune the selected configuration for E_ft epochs under parameter budget f_max."}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
