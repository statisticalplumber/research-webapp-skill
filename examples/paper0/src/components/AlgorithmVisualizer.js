import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Settings2 } from 'lucide-react';
export function AlgorithmVisualizer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    // Simulated model with 8 blocks
    const [blocks, setBlocks] = useState(Array.from({ length: 8 }, (_, i) => ({
        id: i,
        importance: Math.random(),
        status: 'pending'
    })));
    const resetVisualization = () => {
        setBlocks(Array.from({ length: 8 }, (_, i) => ({
            id: i,
            importance: Math.random(),
            status: 'pending'
        })));
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
    return (_jsxs("div", { className: "bg-stone-800/50 backdrop-blur-sm rounded-xl p-6 border border-stone-700", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h3", { className: "text-xl font-semibold text-stone-100", children: "CDWF Algorithm Visualization" }), _jsxs("div", { className: "flex gap-2", children: [_jsxs("button", { onClick: runAlgorithm, className: "flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-stone-900 rounded-lg font-medium transition-colors", children: [isPlaying ? _jsx(Pause, { className: "w-4 h-4" }) : _jsx(Play, { className: "w-4 h-4" }), isPlaying ? 'Pause' : 'Run Algorithm'] }), _jsx("button", { onClick: resetVisualization, className: "p-2 bg-stone-700 hover:bg-stone-600 text-stone-100 rounded-lg transition-colors", children: _jsx(RotateCcw, { className: "w-4 h-4" }) })] })] }), _jsxs("div", { className: "mb-6", children: [_jsxs("div", { className: "flex items-center justify-between text-sm text-stone-400 mb-2", children: [_jsx("span", { children: "Progress" }), _jsx("span", { children: currentStep === 0 ? 'Ready' : `Step ${currentStep}/4` })] }), _jsx("div", { className: "h-2 bg-stone-700 rounded-full overflow-hidden", children: _jsx(motion.div, { className: "h-full bg-gradient-to-r from-yellow-500 to-blue-500", initial: { width: 0 }, animate: { width: `${(currentStep / 4) * 100}%` }, transition: { duration: 0.3 } }) })] }), _jsx("div", { className: "space-y-3 mb-6", children: blocks.map((block, index) => (_jsxs(motion.div, { layout: true, className: `flex items-center gap-4 p-3 rounded-lg border transition-all ${block.status === 'trainable'
                        ? 'bg-yellow-500/20 border-yellow-500/50'
                        : block.status === 'lora'
                            ? 'bg-blue-500/20 border-blue-500/50'
                            : 'bg-stone-700/30 border-stone-600'}`, children: [_jsx("div", { className: "w-8 text-sm text-stone-400 font-mono", children: block.status === 'pending' ? '?' : index + 1 }), _jsx("div", { className: "flex-1 h-8 bg-stone-900/50 rounded-lg overflow-hidden relative", children: _jsx(motion.div, { initial: { width: 0 }, animate: { width: `${block.importance * 100}%` }, transition: { duration: 0.5, delay: index * 0.05 }, className: `h-full ${importanceColors[block.id]} opacity-80` }) }), _jsx(AnimatePresence, { mode: "wait", children: block.status !== 'pending' && (_jsx(motion.div, { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.8 }, className: `px-3 py-1 rounded-full text-xs font-medium ${block.status === 'trainable'
                                    ? 'bg-yellow-500 text-stone-900'
                                    : 'bg-blue-500 text-white'}`, children: block.status === 'trainable' ? 'Trainable' : `LoRA (r*)` }, block.status)) }), _jsx("div", { className: "w-20 text-right text-sm text-stone-400 font-mono", children: block.importance.toFixed(3) })] }, block.id))) }), _jsxs("div", { className: "flex gap-6 text-sm", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-4 h-4 bg-yellow-500 rounded" }), _jsx("span", { className: "text-stone-300", children: "Fully Trainable" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-4 h-4 bg-blue-500 rounded" }), _jsx("span", { className: "text-stone-300", children: "LoRA Adapted" })] })] }), _jsx(AnimatePresence, { mode: "wait", children: currentStep > 0 && (_jsx(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, className: "mt-6 p-4 bg-stone-900/50 rounded-lg border border-stone-700", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx(Settings2, { className: "w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" }), _jsxs("div", { children: [_jsxs("h4", { className: "font-semibold text-stone-100 mb-1", children: [currentStep === 1 && "Phase 1: Warm Start Training", currentStep === 2 && "Phase 2: Gradient Importance Computation", currentStep === 3 && "Phase 3: Configuration Selection", currentStep === 4 && "Phase 4: Apply & Fine-tune"] }), _jsxs("p", { className: "text-sm text-stone-400", children: [currentStep === 1 && "Brief training to collect gradient signals and establish baseline accuracy.", currentStep === 2 && "Sort blocks by importance score I_i = G_i / ΣG_k (normalized gradient magnitudes).", currentStep === 3 && `Select top-k=2 blocks for full trainability, apply LoRA adapters to remaining B-k blocks.`, currentStep === 4 && "Fine-tune the selected configuration for E_ft epochs under parameter budget f_max."] })] })] }) }, currentStep)) })] }));
}
