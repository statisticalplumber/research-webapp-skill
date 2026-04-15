import { motion } from 'framer-motion';
import { Code, GitBranch, Layers, Hexagon, Sparkles } from 'lucide-react';
import { PRE_LIE_STRUCTURES } from '../types';

interface StructureCardProps {
  structure: {
    name: string;
    description: string;
    condition: string;
    properties: string[];
    examples: string[];
  };
  index: number;
}

const icons = [Code, GitBranch, Layers, Hexagon, Sparkles];

function StructureCard({ structure, index }: StructureCardProps) {
  const Icon = icons[index % icons.length];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card group hover:border-academic-gold/50 transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-stone-800/80 rounded-lg group-hover:bg-academic-gold/20 transition-colors">
          <Icon className="w-6 h-6 academic-gold" />
        </div>
        <h3 className="text-xl font-semibold text-stone-100">{structure.name}</h3>
      </div>
      
      <p className="text-stone-400 mb-4 leading-relaxed">
        {structure.description}
      </p>
      
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-stone-300 mb-2">Defining Condition:</h4>
        <code className="block p-3 bg-black/30 rounded-lg text-academic-gold text-sm font-mono overflow-x-auto">
          {structure.condition}
        </code>
      </div>
      
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-stone-300 mb-2">Key Properties:</h4>
        <ul className="space-y-1">
          {structure.properties.map((prop, i) => (
            <li key={i} className="flex items-start gap-2 text-stone-400 text-sm">
              <span className="text-academic-gold mt-1">•</span>
              <span>{prop}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h4 className="text-sm font-semibold text-stone-300 mb-2">Examples:</h4>
        <ul className="space-y-1">
          {structure.examples.map((ex, i) => (
            <li key={i} className="flex items-start gap-2 text-stone-400 text-sm">
              <span className="text-stone-500 mt-1">→</span>
              <span>{ex}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export function StructuresSection() {
  return (
    <section id="structures" className="scroll-section min-h-screen py-20 px-4 md:px-8 lg:px-16 bg-stone-900/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Layers className="w-8 h-8 academic-gold" />
            <h2 className="text-4xl md:text-5xl font-bold text-stone-100">
              Five Classes of Pre-Lie Structures
            </h2>
          </div>
          
          <p className="text-xl text-stone-300 leading-relaxed max-w-4xl">
            Lie-admissible algebras are in one-to-one correspondence with the subgroups of the 
            symmetric group <span className="text-stone-100 font-semibold">S₃</span>. 
            Each subgroup yields distinct classes of nonassociative algebras, each of which 
            turns out to be Lie-admissible.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {PRE_LIE_STRUCTURES.map((structure, index) => (
            <StructureCard key={structure.name} structure={structure} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card"
        >
          <h3 className="text-2xl font-semibold text-stone-100 mb-4">
            The Associator
          </h3>
          <p className="text-stone-300 leading-relaxed mb-4">
            These algebras share an interesting nonassociative structure. The 
            <span className="text-stone-100"> triple product</span>, also known as the 
            "associator", is defined by:
          </p>
          
          <code className="block p-6 bg-black/30 rounded-lg text-academic-gold text-lg font-mono text-center mb-4 overflow-x-auto">
            (x, y, z) = (x · y) · z − x · (y · z)
          </code>
          
          <p className="text-stone-300 leading-relaxed">
            This associator is generally non-vanishing for given x, y, z ∈ 𝒜. Each class of 
            Lie-admissible algebra is defined by specific relations among their associators, 
            corresponding to the action of elements of S₃ on the associator.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
