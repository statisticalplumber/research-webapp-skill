import { motion } from 'framer-motion';
import { Mail, Building2, BookOpen } from 'lucide-react';

export function Authors() {
  const authors = [
    {
      name: 'Martin A. Mojahed',
      email: 'martin.mojahed@roma1.infn.it',
      affiliations: [
        { name: 'INFN Sezione di Roma', location: 'Piazzale Aldo Moro 2, I-00185 Rome, Italy' },
      ],
    },
    {
      name: 'Sascha Weber',
      email: 'wesascha@uni-mainz.de',
      affiliations: [
        { name: 'PRISMA+ Cluster of Excellence', location: 'Mainz, Germany' },
        { name: 'Mainz Institute for Theoretical Physics', location: 'Johannes Gutenberg-Universität Mainz' },
      ],
    },
  ];

  return (
    <section id="authors" className="min-h-screen py-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold gradient-text glow-text mb-4">
              Authors & Affiliations
            </h2>
            <p className="text-xl text-gray-300">
              December 31, 2025
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {authors.map((author, i) => (
              <motion.div
                key={author.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass-card p-8 interactive-element"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-starlight-gold to-plasma-cyan flex items-center justify-center text-cosmic-900 font-bold text-xl shadow-lg">
                    {author.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{author.name}</h3>
                    <a href={`mailto:${author.email}`} className="flex items-center gap-2 text-sm text-plasma-cyan hover:text-plasma-teal transition-colors">
                      <Mail className="w-4 h-4" />
                      {author.email}
                    </a>
                  </div>
                </div>

                <div className="space-y-2">
                  {author.affiliations.map((affiliation, j) => (
                    <div key={j} className="flex items-start gap-3 text-sm">
                      <Building2 className="w-4 h-4 text-starlight-gold flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-gray-200">{affiliation.name}</p>
                        {affiliation.location && (
                          <p className="text-gray-400 text-xs">{affiliation.location}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Citation */}
          <div className="glass-card p-8">
            <h3 className="text-2xl font-serif font-bold text-white mb-6 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-plasma-cyan" />
              Citation
            </h3>

            <div className="space-y-4">
              <div className="equation text-base p-6 bg-cosmic-700/50 rounded-lg">
                <p className="text-gray-200">
                  M. A. Mojahed and S. Weber, <span className="text-plasma-cyan">"Freeze-in leptogenesis without the need for right-handed neutrino oscillations,"</span> 2025.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="glass-card p-4">
                  <p className="text-gray-400 text-sm mb-2">arXiv / preprint:</p>
                  <code className="text-starlight-gold text-sm">MITP-25-086</code>
                </div>
                <div className="glass-card p-4">
                  <p className="text-gray-400 text-sm mb-2">Date:</p>
                  <code className="text-starlight-gold text-sm">December 31, 2025</code>
                </div>
              </div>

              <div className="pt-4 border-t border-cosmic-600">
                <h4 className="text-white font-semibold mb-3">BibTeX:</h4>
                <pre className="text-xs text-gray-400 p-4 bg-cosmic-800 rounded-lg overflow-x-auto">
{`@article{MojahedWeber2025,
  author = {Martin A. Mojahed and Sascha Weber},
  title = {Freeze-in leptogenesis without the need for right-handed neutrino oscillations},
  year = {2025},
  preprint = {MITP-25-086}
}`}
                </pre>
              </div>
            </div>
          </div>

          {/* Acknowledgments */}
          <div className="glass-card p-8">
            <h3 className="text-2xl font-serif font-bold text-white mb-4">
              Acknowledgments
            </h3>
            <p className="text-gray-200 leading-relaxed">
              We are grateful to <span className="text-starlight-gold">Kai Schmitz</span> for many valuable discussions. 
              We would also like to thank <span className="text-starlight-gold">Marco Drewes</span> and <span className="text-starlight-gold">Kai Schmitz</span> 
              for helpful comments on the draft.
            </p>
            <p className="text-gray-200 leading-relaxed mt-4">
              The work of M. A. M. and S. W. was supported by the Cluster of Excellence "Precision Physics, 
              Fundamental Interactions, and Structure of Matter" (PRISMA+ EXC 2118/1) funded by the Deutsche 
              Forschungsgemeinschaft (DFG, German Research Foundation) within the German Excellence Strategy 
              (Project No. 390831469).
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
