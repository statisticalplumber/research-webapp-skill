import { motion } from 'framer-motion';
import { HeroScene } from './HeroScene';

export function Hero() {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      <HeroScene />
      
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-center max-w-5xl"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold mb-6 leading-tight text-stone-900">
            Weakly Nonlinear Analysis of a Reaction-Diffusion Model for
            <span className="block text-green-700">Demyelinating Lesions</span>
            in Multiple Sclerosis
          </h1>
          
          <p className="text-lg md:text-xl text-stone-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            A mathematical investigation of pattern formation in demyelination using Turing instability and weakly nonlinear analysis
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Romina Travaglini
            </span>
            <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              Rossella Della Marca
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-stone-800">Abstract</h2>
            <p className="text-base md:text-lg text-stone-600 leading-relaxed">
              Multiple Sclerosis is a chronic autoimmune disorder characterized by the degradation of the myelin sheath in the central nervous system, leading to neurological impairments. In this work, we analyze a reaction-diffusion model derived from kinetic theory to study the formation of demyelinating lesions. We perform a <span className="font-semibold text-green-700">Turing instability analysis</span> and a <span className="font-semibold text-blue-700">weakly nonlinear analysis</span> to investigate different spatial patterns that may emerge. Our study examines how key parameters, including the <span className="font-semibold text-orange-600">squeezing probability</span> of immune cells and the <span className="font-semibold text-orange-600">chemotactic response</span>, impact pattern formation. Numerical simulations confirm the analytical results, revealing the emergence of distinct spatial structures.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="animate-bounce">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-stone-50 to-transparent" />
    </section>
  );
}
