import { motion } from 'framer-motion';
import { Mail, Building, GraduationCap } from 'lucide-react';

const authors = [
  {
    name: 'Romina Travaglini',
    affiliations: [
      { name: 'INDAM – National Institute for Advanced Mathematics', type: 'institute' },
      { name: 'University of Parma', type: 'university' },
    ],
    email: 'travaglini@altamatematica.it',
    isCorresponding: true,
    role: 'Post-doc Fellow',
  },
  {
    name: 'Rossella Della Marca',
    affiliations: [
      { name: 'University of Naples "Federico II"', type: 'university' },
    ],
    email: 'rossella.dellamarca@unina.it',
    isCorresponding: false,
    role: 'Researcher',
  },
];

const acknowledgments = `
We are thankful to the anonymous reviewers for their useful comments and suggestions.

This work was performed in the framework of activities sponsored by:
• Italian National Group of Mathematical Physics (GNFM-INdAM)
• University of Parma (Italy)
• University of Naples Federico II (Italy)

RT is a post-doc fellow supported by the National Institute of Advanced Mathematics (INdAM), Italy.

RDM and RT also thank the support of the University of Parma through the action Bando di Ateneo per la ricerca 2022, co-funded by MUR-Italian Ministry of Universities and Research - D.M. 737/2021 - PNR - PNRR - NextGenerationEU "Collective and self-organised dynamics: kinetic and network approaches".

The work was carried out in the frame of activities sponsored by:
• COST Action CA18232
• Portuguese Projects UIDB/00013/2020 and UIDP/00013/2020 of CMAT-UM
• Portuguese national funds through FCT/MCTES PTDC/03091/2022, "Mathematical Modelling of Multi-scale Control Systems: applications to human diseases – CoSysM3"
`;

export function AuthorsSection() {
  return (
    <section id="authors" className="py-24 bg-gradient-to-b from-stone-50 to-stone-100">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-stone-800">
            Authors & Affiliations
          </h2>
          <p className="text-lg text-stone-600">
            Researchers advancing mathematical modeling of Multiple Sclerosis
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {authors.map((author, index) => (
            <motion.div
              key={author.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">{author.name}</h3>
                  {author.isCorresponding && (
                    <span className="px-3 py-1 bg-white/20 text-white text-sm rounded-full">
                      Corresponding Author
                    </span>
                  )}
                </div>
                <p className="text-white/80 mt-2">{author.role}</p>
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-3">
                  {author.affiliations.map((affiliation, i) => (
                    <div key={i} className="flex items-start gap-3">
                      {affiliation.type === 'university' ? (
                        <GraduationCap className="w-5 h-5 text-green-600 mt-0.5" />
                      ) : (
                        <Building className="w-5 h-5 text-blue-600 mt-0.5" />
                      )}
                      <span className="text-stone-700">{affiliation.name}</span>
                    </div>
                  ))}
                </div>

                {author.email && (
                  <a
                    href={`mailto:${author.email}`}
                    className="flex items-center gap-3 text-stone-600 hover:text-green-600 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span className="text-sm">{author.email}</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-16"
        >
          <h3 className="text-2xl font-semibold mb-6 text-stone-800">
            Citation
          </h3>
          <div className="bg-stone-50 rounded-xl p-6 border border-stone-200">
            <p className="text-stone-700 leading-relaxed italic">
              Travaglini, R., & Della Marca, R. <em>Weakly nonlinear analysis of a reaction-diffusion model for demyelinating lesions in Multiple Sclerosis</em>. University of Parma & University of Naples Federico II.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-stone-900 text-white rounded-2xl p-8">
            <h3 className="text-2xl font-semibold mb-6">
              Acknowledgments
            </h3>
            <div className="prose prose-invert max-w-none">
              <p className="text-stone-300 leading-relaxed whitespace-pre-line">
                {acknowledgments}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
