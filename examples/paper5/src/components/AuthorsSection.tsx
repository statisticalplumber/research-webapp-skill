import { motion } from 'framer-motion';
import { Mail, Building2 } from 'lucide-react';

const authors = [
  {
    name: 'Gabriel Turinici',
    email: 'Gabriel.Turinici@dauphine.fr',
    affiliation: 'CEREMADE, Université Paris Dauphine - PSL',
    address: 'Place du Marechal de Lattre de Tassigny, Paris, 75116, FRANCE',
  },
  {
    name: 'Pierre Brugiere',
    email: 'brugiere@ceremade.dauphine.fr',
    affiliation: 'CEREMADE, Université Paris Dauphine - PSL',
    address: 'Place du Marechal de Lattre de Tassigny, Paris, 75116, FRANCE',
  },
];

export default function AuthorsSection() {
  return (
    <section id="authors" className="py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 gradient-text">Authors</h2>
          <p className="text-stone-400 max-w-2xl mx-auto">
            Research conducted at CEREMADE, Université Paris Dauphine - PSL
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {authors.map((author, index) => (
            <motion.div
              key={author.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card gradient-border"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl font-bold">
                    {author.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-stone-100 mb-2">
                    {author.name}
                  </h3>
                  <p className="text-blue-400 text-sm mb-3">
                    {author.affiliation}
                  </p>
                  <div className="space-y-2 text-sm">
                    <a
                      href={`mailto:${author.email}`}
                      className="flex items-center gap-2 text-stone-400 hover:text-stone-200 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      {author.email}
                    </a>
                    <p className="flex items-start gap-2 text-stone-400">
                      <Building2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      {author.address}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card"
        >
          <h3 className="text-xl font-semibold text-stone-100 mb-4">Citation</h3>
          <div className="bg-stone-800/50 p-4 rounded-lg font-mono text-sm text-stone-300">
            Turinici, G., & Brugiere, P. Onflow: a model free, online portfolio allocation algorithm robust to transaction fees. CEREMADE, Université Paris Dauphine - PSL.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
