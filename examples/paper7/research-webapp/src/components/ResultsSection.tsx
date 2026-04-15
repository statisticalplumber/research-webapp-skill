import { motion } from 'framer-motion';
import { CheckCircle, XCircle, BookOpen, ArrowRight } from 'lucide-react';

const resultsData = [
  {
    title: "AFAs and Semisimple Lie Algebras",
    success: true,
    description: "Contrary to expectations, semisimple Lie algebras DO admit AFAs",
    example: "𝔰𝔩(2, ℂ) admits an explicit AFA structure",
    proof: "Counterexample constructed using graded decomposition"
  },
  {
    title: "A₃-Associative Algebras",
    success: true,
    description: "Semisimple Lie algebras admit A₃-associative structures",
    example: "Cross-product algebra in 3D gives 𝔰𝔲(2)",
    proof: "Satisfies first Bianchi identity"
  },
  {
    title: "S₃-Associative Algebras",
    success: true,
    description: "UNIVERSAL: Every Lie algebra admits S₃-associative structure",
    example: "All Lie algebras over ℂ",
    proof: "Theorem 5.1: S₃-associative algebras are universal pre-Lie structures"
  },
  {
    title: "LSAs and RSAs",
    success: false,
    description: "Semisimple Lie algebras do NOT admit LSAs or RSAs",
    example: "For n ≥ 3, no admissible structures exist",
    proof: "Known result from [18, 9, 10, 11, 12]"
  }
];

function ResultCard({ result, index }: { result: typeof resultsData[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`card ${result.success ? 'border-academic-gold/30' : 'border-red-500/30'}`}
    >
      <div className="flex items-start gap-3 mb-4">
        <div className={`p-2 rounded-lg ${result.success ? 'bg-academic-gold/20' : 'bg-red-500/20'}`}>
          {result.success ? (
            <CheckCircle className="w-6 h-6 academic-gold" />
          ) : (
            <XCircle className="w-6 h-6 text-red-500" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-stone-100 mb-2">{result.title}</h3>
          <p className="text-stone-300 mb-3">{result.description}</p>
          
          <div className="space-y-2">
            <div className="flex items-start gap-2 text-stone-400 text-sm">
              <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span><span className="text-stone-500">Example:</span> {result.example}</span>
            </div>
            <div className="flex items-start gap-2 text-stone-400 text-sm">
              <BookOpen className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span><span className="text-stone-500">Proof:</span> {result.proof}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ResultsSection() {
  return (
    <section id="results" className="scroll-section min-h-screen py-20 px-4 md:px-8 lg:px-16">
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
              Key Results
            </h2>
          </div>
          
          <p className="text-xl text-stone-300 leading-relaxed max-w-4xl">
            This paper resolves long-standing questions about pre-Lie structures for semisimple 
            Lie algebras. The findings reveal surprising admissibility patterns across the five 
            classes of Lie-admissible algebras.
          </p>
        </motion.div>

        <div className="grid gap-6 mb-12">
          {resultsData.map((result, index) => (
            <ResultCard key={result.title} result={result} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card mb-12"
        >
          <h3 className="text-2xl font-semibold text-stone-100 mb-4">
            The Main Theorem
          </h3>
          
          <div className="mb-6 p-6 bg-black/30 rounded-lg border-l-4 border-academic-gold">
            <h4 className="text-xl font-semibold text-academic-gold mb-2">
              Theorem 5.1
            </h4>
            <p className="text-stone-300 leading-relaxed">
              <span className="text-stone-100 font-semibold">S₃-associative algebras realize universal pre-Lie structures for all Lie algebras over ℂ.</span>
            </p>
          </div>
          
          <p className="text-stone-300 leading-relaxed mb-4">
            Given an n-dimensional Lie algebra (𝒜, [ , ]), any pre-algebraic structure on 𝒜 given by 
            (𝒜, ·) satisfies the Akivis identity, with the associator defined by (x, y, z) := (x · y) · z − x · (y · z).
          </p>
          <p className="text-stone-300 leading-relaxed">
            Since for a Lie algebra the Jacobinator J(x₁, x₂, x₃) = 0, this implies that the signed sum 
            of associators over S₃ vanishes, which satisfies the definition of an S₃-associative algebra.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card"
        >
          <h3 className="text-2xl font-semibold text-stone-100 mb-4">
            Summary of Admissibility
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stone-700">
                  <th className="text-left p-3 text-stone-300">Structure</th>
                  <th className="text-left p-3 text-stone-300">Admissible by Semisimple?</th>
                  <th className="text-left p-3 text-stone-300">Dimension Constraint</th>
                </tr>
              </thead>
              <tbody className="text-stone-400">
                <tr className="border-b border-stone-800">
                  <td className="p-3 font-mono text-academic-gold">LSA</td>
                  <td className="p-3 text-red-400">❌ No</td>
                  <td className="p-3">n ≥ 3</td>
                </tr>
                <tr className="border-b border-stone-800">
                  <td className="p-3 font-mono text-academic-gold">RSA</td>
                  <td className="p-3 text-red-400">❌ No</td>
                  <td className="p-3">n ≥ 3</td>
                </tr>
                <tr className="border-b border-stone-800">
                  <td className="p-3 font-mono text-academic-gold">AFA</td>
                  <td className="p-3 text-green-400">✅ Yes</td>
                  <td className="p-3">None</td>
                </tr>
                <tr className="border-b border-stone-800">
                  <td className="p-3 font-mono text-academic-gold">A₃-associative</td>
                  <td className="p-3 text-green-400">✅ Yes</td>
                  <td className="p-3">None</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-academic-gold">S₃-associative</td>
                  <td className="p-3 text-green-400">✅ Yes</td>
                  <td className="p-3">Universal</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
