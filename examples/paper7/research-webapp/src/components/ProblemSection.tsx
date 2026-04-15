import { motion } from 'framer-motion';
import { BookOpen, AlertTriangle, Lightbulb } from 'lucide-react';

export function ProblemSection() {
  return (
    <section id="problem" className="scroll-section min-h-screen py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-8 h-8 academic-gold" />
            <h2 className="text-4xl md:text-5xl font-bold text-stone-100">
              The Problem
            </h2>
          </div>
          
          <p className="text-xl text-stone-300 leading-relaxed max-w-4xl">
            Among the five classes of nonassociative Lie-admissible algebras, 
            <span className="text-stone-100 font-semibold"> left-symmetric algebras (LSAs)</span> and 
            <span className="text-stone-100 font-semibold"> right-symmetric algebras (RSAs)</span> 
            were already known to be non-admissible by semisimple Lie algebras of finite dimension 
            <span className="academic-gold font-semibold"> n ≥ 3</span>.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card border-l-4 border-red-500"
          >
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              <h3 className="text-xl font-semibold text-stone-100">Known Limitations</h3>
            </div>
            <ul className="space-y-3 text-stone-300">
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>LSAs and RSAs cannot be admissible for semisimple Lie algebras with n ≥ 3</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Only solvable Lie algebras are known to admit these structures</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>This creates a fundamental gap in understanding pre-Lie structures</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="card border-l-4 border-academic-gold"
          >
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-6 h-6 academic-gold" />
              <h3 className="text-xl font-semibold text-stone-100">Key Questions</h3>
            </div>
            <ul className="space-y-3 text-stone-300">
              <li className="flex items-start gap-2">
                <span className="academic-gold mt-1">•</span>
                <span>Do anti-flexible algebras (AFAs) admit semisimple Lie algebras?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="academic-gold mt-1">•</span>
                <span>What about A₃-associative and S₃-associative algebras?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="academic-gold mt-1">•</span>
                <span>Is there a universal pre-Lie structure for all Lie algebras?</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card"
        >
          <h3 className="text-2xl font-semibold text-stone-100 mb-4">
            Historical Context
          </h3>
          <p className="text-stone-300 leading-relaxed mb-4">
            The earliest examples of Lie-admissible algebras originated in the work of 
            <span className="text-stone-100"> Cayley on rooted tree algebras</span>, 
            and later in Koszul's and Vinberg's investigations on affine structures on manifolds. 
            Almost fourteen years later, it was Milnor's question concerning the admissibility 
            of affine structures on manifolds associated to solvable Lie groups that regenerated 
            excitement in the study of pre-Lie structures.
          </p>
          <p className="text-stone-300 leading-relaxed">
            This research addresses a fundamental gap by examining the remaining classes of 
            Lie-admissible algebras and proving the existence of pre-Lie structures for 
            semisimple Lie algebras.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
