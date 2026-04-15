import { useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { EarlyUniverseScene } from './EarlyUniverseScene';
import { Info, Thermometer, Atom, Zap } from 'lucide-react';

export function EarlyUniverse() {
  const [selectedInfo, setSelectedInfo] = useState<number | null>(null);

  const infoItems = [
    {
      icon: Thermometer,
      title: 'High Temperature Regime',
      content: 'WIFI-LG operates at temperatures T ~ 100 GeV - 10⁶ GeV, well above the electroweak scale. In this regime, SM interactions maintain thermal equilibrium while RHNs freeze in.',
    },
    {
      icon: Atom,
      title: 'Thermal Plasma',
      content: 'The early Universe is filled with a hot plasma of SM particles. Right-handed electrons develop an asymmetry μ_eR ≠ 0, which drives the wash-in mechanism.',
    },
    {
      icon: Zap,
      title: 'RHN Production',
      content: 'Right-handed neutrinos are produced through Yukawa interactions with the plasma. Unlike freeze-out, they never reach equilibrium, accumulating gradually.',
    },
  ];

  return (
    <section id="cosmology" className="min-h-screen py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold gradient-text glow-text mb-4">
              Cosmological Context
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Understanding the thermal history of the early Universe and the role of 
              right-handed electron asymmetries.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* 3D Scene */}
            <div className="glass-card p-4 overflow-hidden rounded-lg">
              <Canvas
                camera={{ position: [0, 0, 60], fov: 60 }}
                gl={{ antialias: true }}
              >
                <EarlyUniverseScene />
              </Canvas>
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <p className="text-sm text-gray-400">
                  Visualization: Thermal plasma sphere (green) with RHN at center (gold) and neutrino trajectories
                </p>
              </div>
            </div>

            {/* Information Cards */}
            <div className="space-y-4">
              {infoItems.map((item, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setSelectedInfo(selectedInfo === i ? null : i)}
                  className={`w-full glass-card p-6 text-left transition-all ${
                    selectedInfo === i ? 'border-starlight-gold' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${
                      selectedInfo === i ? 'bg-starlight-gold text-cosmic-900' : 'bg-cosmic-700 text-starlight-gold'
                    }`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-lg font-semibold ${
                        selectedInfo === i ? 'text-starlight-gold' : 'text-white'
                      }`}>
                        {item.title}
                      </h3>
                      <motion.div
                        initial={false}
                        animate={{ height: selectedInfo === i ? 'auto' : 0, opacity: selectedInfo === i ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-gray-300 text-sm mt-2">{item.content}</p>
                      </motion.div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="glass-card p-8">
            <h3 className="text-2xl font-serif font-bold text-white mb-6">
              Temperature Evolution Timeline
            </h3>
            
            <div className="relative">
              {/* Timeline */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-plasma-teal via-starlight-gold to-plasma-cyan" />
              
              <div className="space-y-8">
                {[
                  {
                    z: 'T > 10⁶ GeV',
                    title: 'Initial Asymmetry Generation',
                    desc: 'A chiral asymmetry q_e = n_e - n_ē is generated, creating μ_eR⁰ ≠ 0. This serves as the "fuel" for WIFI-LG.',
                    limit: '|μ_eR| ≲ 9.6 × 10⁻⁴',
                  },
                  {
                    z: 'T_e ≈ 85 TeV',
                    title: 'Electron Yukawa Equilibration',
                    desc: 'Right-handed electrons begin to equilibrate. The asymmetry starts to be transferred to lepton flavors.',
                    limit: 'μ_eR eq',
                  },
                  {
                    z: 'T ~ 1-10 TeV',
                    title: 'Wash-In Phase',
                    desc: 'RHNs produce lepton flavor asymmetries through wash-in. Maximum μ_Δ values reached.',
                    limit: 'Peak asymmetry',
                  },
                  {
                    z: 'T_EW ≈ 131.7 GeV',
                    title: 'Electroweak Phase Transition',
                    desc: 'Sphalerons convert lepton asymmetry to baryon asymmetry. Final BAU is frozen in.',
                    limit: 'Y_B ≈ 8.7 × 10⁻¹¹',
                  },
                ].map((stage, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="relative pl-24"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-6 top-6 w-4 h-4 rounded-full bg-starlight-gold border-4 border-cosmic-900 glow-circle" />
                    
                    <div className="glass-card p-6">
                      <div className="flex flex-wrap items-center gap-4 mb-3">
                        <span className="font-mono text-starlight-gold text-sm">{stage.z}</span>
                        <h4 className="text-xl font-semibold text-white">{stage.title}</h4>
                      </div>
                      <p className="text-gray-300 mb-3">{stage.desc}</p>
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-cosmic-700 rounded text-sm">
                        <Info className="w-4 h-4 text-plasma-cyan" />
                        <span className="text-plasma-cyan">{stage.limit}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="glass-card p-8">
            <h3 className="text-2xl font-serif font-bold text-white mb-6">
              Key Chemical Potentials
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  symbol: 'μ_eR',
                  name: 'Right-handed electron chemical potential',
                  value: '|μ_eR⁰| ≤ 9.6 × 10⁻⁴',
                  role: 'Initial asymmetry source',
                },
                {
                  symbol: 'μ_Δα',
                  name: 'Lepton flavor asymmetries (α = e, μ, τ)',
                  value: 'μ_Δα = B/3 - L_α',
                  role: 'Generated through wash-in',
                },
                {
                  symbol: 'Y_B',
                  name: 'Baryon asymmetry',
                  value: 'Y_B = c_sph Σ μ_Δα / (2π² g*_s)',
                  role: 'Final observable',
                },
                {
                  symbol: 'z',
                  name: 'Temperature variable',
                  value: 'z = T_EW / T',
                  role: 'Evolution parameter',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-6"
                >
                  <div className="flex items-start justify-between mb-3">
                    <code className="text-2xl text-starlight-gold font-mono">{item.symbol}</code>
                    <span className="text-xs text-plasma-cyan px-2 py-1 bg-plasma-cyan/10 rounded">{item.role}</span>
                  </div>
                  <h4 className="text-white font-medium mb-2">{item.name}</h4>
                  <code className="text-sm text-gray-400 block">{item.value}</code>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
