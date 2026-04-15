import { motion } from 'framer-motion';
import { User, Building2, ExternalLink } from 'lucide-react';
import { PAPER_INFO } from '../types';

function AuthorCard({ author, index }: { author: typeof PAPER_INFO.authors[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="card flex items-center gap-4"
    >
      <div className="p-4 bg-stone-800/80 rounded-full">
        <User className="w-8 h-8 academic-gold" />
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-stone-100 mb-1">
          {author.name}
        </h3>
        <div className="flex items-center gap-2 text-stone-400">
          <Building2 className="w-4 h-4" />
          <span>{author.affiliation}</span>
        </div>
      </div>
      <a
        href="#"
        className="p-2 hover:bg-stone-700 rounded-lg transition-colors"
        title="View profile"
      >
        <ExternalLink className="w-5 h-5 text-stone-400" />
      </a>
    </motion.div>
  );
}

export function AuthorsSection() {
  return (
    <section id="authors" className="scroll-section min-h-screen py-20 px-4 md:px-8 lg:px-16 bg-stone-900/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <User className="w-8 h-8 academic-gold" />
            <h2 className="text-4xl md:text-5xl font-bold text-stone-100">
              Authors
            </h2>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            {PAPER_INFO.title}
          </h1>
          
          <div className="space-y-3">
            {PAPER_INFO.authors.map((author, index) => (
              <div key={index} className="flex items-center gap-2 text-stone-300">
                <span className="text-academic-gold">•</span>
                <span className="font-semibold">{author.name}</span>
                <span className="text-stone-500">—</span>
                <span>{author.affiliation}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {PAPER_INFO.authors.map((author, index) => (
            <AuthorCard key={index} author={author} index={index} />
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
            Acknowledgments
          </h3>
          <p className="text-stone-300 leading-relaxed">
            Thank you to the organizers of the amazing Wolfram Summer School 2024, where this 
            project was initiated. The authors also thank Prof. Gil Salgado for many useful 
            discussions and critical feedback on the original version of the manuscript.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card mt-8"
        >
          <h3 className="text-2xl font-semibold text-stone-100 mb-4">
            Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {PAPER_INFO.keywords.map((keyword, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-stone-800/50 backdrop-blur-sm rounded-full text-stone-300 border border-stone-700 text-sm"
              >
                {keyword}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
