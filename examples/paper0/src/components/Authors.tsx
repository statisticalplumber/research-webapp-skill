import { Mail, Link as LinkIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const authors = [
  {
    name: "Yasmeen Saeed",
    affiliations: ["College of Computer Science & Engineering", "Thamar University, Yemen"],
    email: "yasmeen.saeed@thamar.edu.ye"
  },
  {
    name: "Ahmed Sharshar",
    affiliations: ["College of Computer Science & Engineering", "Thamar University, Yemen"]
  },
  {
    name: "Mohsen Guizani",
    affiliations: ["Qatar University", "Hamad Bin Khalifa University", "Professor"],
    email: "mguizani@qu.edu.qa"
  }
];

const affiliations = [
  {
    id: 1,
    name: "Thamar University",
    location: "Yemen",
    description: "College of Computer Science & Engineering"
  },
  {
    id: 2,
    name: "Qatar University",
    location: "Qatar",
    description: "Department of Computer Science & Engineering"
  },
  {
    id: 3,
    name: "Hamad Bin Khalifa University",
    location: "Qatar",
    description: "College of Science & Engineering"
  }
];

export function AuthorsSection() {
  return (
    <div className="space-y-8">
      {/* Authors */}
      <div className="bg-stone-800/50 backdrop-blur-sm rounded-xl p-6 border border-stone-700">
        <h3 className="text-xl font-semibold text-stone-100 mb-6">Contributors</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {authors.map((author, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className="bg-stone-900/50 rounded-lg p-4 border border-stone-700 hover:border-yellow-500/30 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {author.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-stone-100 mb-2">{author.name}</h4>
                  <div className="space-y-1">
                    {author.affiliations.map((aff, affIndex) => (
                      <div key={affIndex} className="flex items-center gap-2 text-sm text-stone-400">
                        {aff.includes('Professor') && (
                          <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-500 rounded-full text-xs">
                            Professor
                          </span>
                        )}
                        {!aff.includes('Professor') && (
                          <span className="text-stone-400">{aff}</span>
                        )}
                      </div>
                    ))}
                  </div>
                  {author.email && (
                    <a
                      href={`mailto:${author.email}`}
                      className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 mt-2"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      {author.email}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Affiliations */}
      <div className="bg-stone-800/50 backdrop-blur-sm rounded-xl p-6 border border-stone-700">
        <h3 className="text-xl font-semibold text-stone-100 mb-4">Institutional Affiliations</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {affiliations.map((aff, index) => (
            <motion.div
              key={aff.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-stone-900/30 rounded-lg border border-stone-700"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  {aff.id}
                </div>
                <h4 className="font-medium text-stone-200">{aff.name}</h4>
              </div>
              <p className="text-sm text-stone-500 mb-1">{aff.location}</p>
              <p className="text-xs text-stone-400">{aff.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Citation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-stone-800 to-stone-900 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/30"
      >
        <h3 className="text-lg font-semibold text-stone-100 mb-4 flex items-center gap-2">
          <LinkIcon className="w-5 h-5 text-yellow-500" />
          How to Cite
        </h3>
        <div className="space-y-2 text-sm">
          <p className="text-stone-300 leading-relaxed">
            Saeed, Y., Sharshar, A., & Guizani, M. (2024). Constraint-Driven Warm-Freeze for Efficient Transfer Learning in Photovoltaic Systems. 
            <em> arXiv preprint arXiv:2406.xxxxx</em>.
          </p>
          <div className="flex gap-3 pt-2">
            <a
              href="https://github.com/yasmeenfozi/Constraint-Driven-Warm-Freeze"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-stone-900 rounded-lg font-medium transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View Code (GitHub)
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
