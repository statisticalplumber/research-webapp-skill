import { motion } from 'framer-motion';
import { BookOpen, AlertTriangle, Lightbulb } from 'lucide-react';

export function Introduction() {
  return (
    <section id="introduction" className="min-h-screen flex items-center justify-center py-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="flex items-center gap-4 mb-8">
            <BookOpen className="w-10 h-10 text-starlight-gold" />
            <h2 className="text-4xl md:text-5xl font-serif font-bold gradient-text glow-text">
              The Baryon Asymmetry Problem
            </h2>
          </div>

          <div className="glass-card p-8 md:p-12">
            <p className="text-lg md:text-xl leading-relaxed text-gray-200">
              The <span className="text-starlight-gold font-semibold">baryon asymmetry of the Universe (BAU)</span> 
              constitutes one of the most compelling indications for physics beyond the Standard Model. 
              Our Universe contains vastly more matter than antimatter—a mystery that has puzzled 
              physicists for decades.
            </p>

            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <div className="glass-card p-6 interactive-element">
                <AlertTriangle className="w-8 h-8 text-plasma-cyan mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">The Puzzle</h3>
                <p className="text-gray-300 text-sm">
                  The Standard Model cannot adequately explain why matter dominates over antimatter 
                  in the observable Universe.
                </p>
              </div>

              <div className="glass-card p-6 interactive-element">
                <Lightbulb className="w-8 h-8 text-starlight-gold mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">A Solution</h3>
                <p className="text-gray-300 text-sm">
                  Leptogenesis through the type-I seesaw model offers an elegant explanation, 
                  connecting the BAU to neutrino masses.
                </p>
              </div>

              <div className="glass-card p-6 interactive-element">
                <BookOpen className="w-8 h-8 text-plasma-teal mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">This Work</h3>
                <p className="text-gray-300 text-sm">
                  A new mechanism—WIFI-LG—that works at GeV-scale neutrino masses without 
                  requiring oscillations or CP violation.
                </p>
              </div>
            </div>
          </div>

          <div className="glass-card p-8">
            <h3 className="text-2xl font-serif font-bold text-white mb-4">
              Sakharov's Conditions
            </h3>
            <p className="text-gray-200 leading-relaxed mb-6">
              Successful baryogenesis requires satisfying all three of Sakharov's conditions:
            </p>
            <ul className="space-y-4">
              {[
                { title: 'Baryon Number Violation', desc: 'Processes that change the baryon number of the Universe' },
                { title: 'C and CP Violation', desc: 'Violation of charge conjugation and combined charge-parity symmetry' },
                { title: 'Departure from Thermal Equilibrium', desc: 'Dynamics that prevent the asymmetry from being washed out' },
              ].map((condition, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="flex items-start gap-4 p-4 bg-cosmic-700/50 rounded-lg"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-starlight-gold/20 flex items-center justify-center text-starlight-gold font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <h4 className="text-white font-semibold">{condition.title}</h4>
                    <p className="text-gray-300 text-sm">{condition.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="equation">
            <span className="text-plasma-cyan">Y</span><sub className="text-gray-400">B</sub> ≈ 8.7 × 10<sup className="text-gray-400">-11</sup>
            <span className="text-gray-400 ml-4">(observed baryon asymmetry)</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
