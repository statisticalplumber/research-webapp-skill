import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ReferenceLine, Legend, AreaChart, Area
} from 'recharts';
import { Target, Info } from 'lucide-react';

// Generate parameter space data
function generateParameterSpaceData() {
  const data: { mass: string; mixing: number; experiment?: string }[] = [];

  // Mass range: 0.1 to 40 GeV (log scale)
  for (let logMass = -1; logMass <= 1.6; logMass += 0.05) {
    const mass = Math.pow(10, logMass);

    // Mixing range: 10^-12 to 10^-4
    for (let logMix = -12; logMix <= -4; logMix += 0.3) {
      const mixing = Math.pow(10, logMix);
      
      // Successful region: between seesaw line and experimental bounds
      const seesawLimit = 0.01 / mass; // Simplified seesaw relation
      const upperLimit = Math.min(0.1, 10 / mass);
      
      if (mixing > seesawLimit && mixing < upperLimit && mass >= 0.1 && mass <= 40) {
        // Check experiment sensitivity
        if (mass < 1 && mixing > 1e-7) {
          data.push({ mass: mass.toFixed(2), mixing, experiment: 'SHiP' });
        } else if (mass < 10 && mixing > 1e-8) {
          data.push({ mass: mass.toFixed(2), mixing, experiment: 'HL-LHC' });
        } else if (mass < 40 && mixing > 1e-9) {
          data.push({ mass: mass.toFixed(2), mixing, experiment: 'FCC-ee' });
        } else {
          data.push({ mass: mass.toFixed(2), mixing });
        }
      }
    }
  }
  
  return data;
}

// Generate evolution curve data
function generateEvolutionData() {
  const data: { z: number; muDelta_e: number; muDelta_mu: number; yB: number }[] = [];
  
  for (let z = 0.01; z <= 10; z += 0.1) {
    // Simulate wash-in then wash-out behavior
    const tempFactor = Math.exp(-z);
    const washInPeak = Math.exp(-Math.pow(z - 2, 2) / 2);
    
    data.push({
      z: z,
      muDelta_e: 0.5 * washInPeak * tempFactor + 0.1 * Math.exp(-z * 3),
      muDelta_mu: 0.3 * washInPeak * tempFactor + 0.05 * Math.exp(-z * 2),
      yB: 8.7e-11 * (1 - Math.exp(-z / 3)) * (1 + Math.sin(z * 0.5) * 0.1),
    });
  }
  
  return data;
}

export function ParameterSpace() {
  const [selectedExperiment, setSelectedExperiment] = useState<'SHiP' | 'HL-LHC' | 'FCC-ee' | 'all'>('all');
  const [viewMode, setViewMode] = useState<'paramSpace' | 'evolution'>('paramSpace');

  const paramSpaceData = useMemo(() => generateParameterSpaceData(), []);
  const evolutionData = useMemo(() => generateEvolutionData(), []);

  // Filter points by experiment
  const filteredPoints = paramSpaceData.filter(d => 
    selectedExperiment === 'all' || d.experiment === selectedExperiment
  );

  return (
    <section id="results" className="min-h-screen py-20 px-4 md:px-8">
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
              Parameter Space & Results
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The region of parameter space where WIFI-LG successfully accounts for the observed 
              baryon asymmetry, with experimental sensitivity projections.
            </p>
          </div>

          {/* View mode selector */}
          <div className="flex justify-center gap-4">
            {(['paramSpace', 'evolution'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  viewMode === mode
                    ? 'bg-starlight-gold text-cosmic-900 scale-105'
                    : 'bg-cosmic-700 text-gray-300 hover:bg-cosmic-600'
                }`}
              >
                {mode === 'paramSpace' ? 'Parameter Space (Fig. 2)' : 'Evolution of Asymmetry'}
              </button>
            ))}
          </div>

          {viewMode === 'paramSpace' ? (
            <>
              {/* Parameter Space Visualization */}
              <div className="glass-card p-6 md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                  <h3 className="text-2xl font-serif font-bold text-white">
                    RHN Mass vs. Mixing Strength
                  </h3>
                  <div className="flex gap-2">
                    {(['all', 'SHiP', 'HL-LHC', 'FCC-ee'] as const).map((exp) => (
                      <button
                        key={exp}
                        onClick={() => setSelectedExperiment(exp)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedExperiment === exp
                            ? 'bg-plasma-cyan text-cosmic-900'
                            : 'bg-cosmic-700 text-gray-300 hover:bg-cosmic-600'
                        }`}
                      >
                        {exp}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="glass-card p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="text-white font-medium">Successful Region</span>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Parameter space where WIFI-LG generates correct BAU
                    </p>
                  </div>
                  <div className="glass-card p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-3 h-3 rounded-full bg-blue-400" />
                      <span className="text-white font-medium">SHiP Sensitivity</span>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Search for heavy neutral leptons
                    </p>
                  </div>
                  <div className="glass-card p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-3 h-3 rounded-full bg-purple-400" />
                      <span className="text-white font-medium">HL-LHC / FCC-ee</span>
                    </div>
                    <p className="text-gray-400 text-sm">
                      High-energy collider probes
                    </p>
                  </div>
                </div>

                <div className="glass-card p-6 overflow-hidden">
                  <ResponsiveContainer width="100%" height={500}>
                    <LineChart data={paramSpaceData.slice(0, 50)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#303045" />
                      <XAxis 
                        type="number" 
                        dataKey="mass" 
                        scale="log"
                        domain={[0.1, 40]}
                        stroke="#6b7280"
                        label={{ value: 'RHN Mass (GeV)', position: 'insideBottomRight', offset: -10, fill: '#9ca3af' }}
                      />
                      <YAxis 
                        type="number" 
                        dataKey="mixing" 
                        scale="log"
                        domain={[1e-12, 1e-4]}
                        stroke="#6b7280"
                        label={{ value: '|Θ|²', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(30, 30, 53, 0.95)',
                          border: '1px solid #303045',
                          borderRadius: '8px',
                          color: '#e5e5e5',
                        }}
                        formatter={(value: any, name: any) => [
                          value?.toExponential(2),
                          name === 'mass' ? 'Mass (GeV)' : 'Mixing |Θ|²'
                        ]}
                      />
                      <ReferenceLine x="0.1" stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'BBN Bound', position: 'top', fill: '#ef4444', fontSize: 12 }} />
                      <ReferenceLine x="40" stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Upper Limit', position: 'top', fill: '#ef4444', fontSize: 12 }} />
                      
                      {/* Seesaw line */}
                      <Line
                        type="monotone"
                        dataKey={(data: any) => 0.01 / parseFloat(data.mass)}
                        stroke="#f5d388"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={false}
                        name="Seesaw Limit"
                      />
                      
                      {/* Successful region (simplified) */}
                      {filteredPoints.length > 0 && (
                        <Line
                          type="monotone"
                          dataKey="mixing"
                          data={filteredPoints.slice(0, 30)}
                          stroke={filteredPoints[0]?.experiment === 'SHiP' ? '#60a5fa' : filteredPoints[0]?.experiment === 'HL-LHC' ? '#c084fc' : '#22d3ee'}
                          strokeWidth={2}
                          dot={false}
                          name={selectedExperiment === 'all' ? 'Success Region' : selectedExperiment}
                        />
                      )}
                      
                      <Legend />
                    </LineChart>
                  </ResponsiveContainer>
                  
                  <div className="mt-4 p-4 bg-cosmic-700/50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-starlight-gold flex-shrink-0 mt-0.5" />
                      <p className="text-gray-300 text-sm">
                        <strong>Key Result:</strong> WIFI-LG enables successful leptogenesis for GeV-scale RHNs 
                        with arbitrary mass splittings (δM ≫ 10⁻²), unlike standard FILG which requires 
                        nearly degenerate RHNs. Large regions are accessible to future experiments.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Evolution Chart */}
              <div className="glass-card p-6 md:p-8">
                <h3 className="text-2xl font-serif font-bold text-white mb-6">
                  Evolution of Lepton Asymmetry
                </h3>
                
                <div className="glass-card p-6">
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={evolutionData}>
                      <defs>
                        <linearGradient id="colorMuE" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#4ade80" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorMuMu" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#303045" />
                      <XAxis 
                        dataKey="z" 
                        stroke="#6b7280"
                        label={{ value: 'z = T_EW/T', position: 'insideBottomRight', offset: -10, fill: '#9ca3af' }}
                      />
                      <YAxis 
                        stroke="#6b7280"
                        label={{ value: 'Chemical Potentials', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(30, 30, 53, 0.95)',
                          border: '1px solid #303045',
                          borderRadius: '8px',
                          color: '#e5e5e5',
                        }}
                      />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="muDelta_e"
                        stroke="#4ade80"
                        fillOpacity={1}
                        fill="url(#colorMuE)"
                        name="μ_Δₑ (Electron)"
                      />
                      <Area
                        type="monotone"
                        dataKey="muDelta_mu"
                        stroke="#22d3ee"
                        fillOpacity={1}
                        fill="url(#colorMuMu)"
                        name="μ_Δ_μ (Muon)"
                      />
                      <ReferenceLine y={8.7e-11} stroke="#f5d388" strokeDasharray="3 3" label={{ value: 'BAU Observed', position: 'right', fill: '#f5d388' }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          ) : (
            /* Evolution view */
            <div className="glass-card p-6 md:p-8">
              <h3 className="text-2xl font-serif font-bold text-white mb-6">
                Temperature Evolution of Asymmetries
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="glass-card p-6">
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={evolutionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#303045" />
                      <XAxis 
                        dataKey="z" 
                        stroke="#6b7280"
                        label={{ value: 'z = T_EW/T', position: 'insideBottomRight', offset: -10, fill: '#9ca3af' }}
                      />
                      <YAxis 
                        stroke="#6b7280"
                        label={{ value: 'Asymmetry', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(30, 30, 53, 0.95)',
                          border: '1px solid #303045',
                          borderRadius: '8px',
                          color: '#e5e5e5',
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="muDelta_e"
                        stroke="#4ade80"
                        strokeWidth={2}
                        dot={false}
                        name="μ_Δₑ"
                      />
                      <Line
                        type="monotone"
                        dataKey="muDelta_mu"
                        stroke="#22d3ee"
                        strokeWidth={2}
                        dot={false}
                        name="μ_Δ_μ"
                      />
                      <ReferenceLine y={8.7e-11} stroke="#f5d388" strokeDasharray="3 3" label="BAU" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-4">
                  <div className="glass-card p-6">
                    <h4 className="text-lg font-semibold text-white mb-4">Key Stages</h4>
                    <div className="space-y-4">
                      {[
                        { z: 'z ~ 0.01 (T ~ 10⁴ GeV)', desc: 'Wash-in phase: Asymmetry generated by RHN interactions' },
                        { z: 'z ~ 0.1-1 (T ~ 100-1000 GeV)', desc: 'Peak asymmetry: Maximum μ_Δ values reached' },
                        { z: 'z ~ 3-10 (T ~ 13-130 GeV)', desc: 'Wash-out suppression: Asymmetry preserved to T_EW' },
                      ].map((stage, i) => (
                        <div key={i} className="flex gap-3">
                          <span className="text-starlight-gold font-mono text-sm">{stage.z}</span>
                          <p className="text-gray-300 text-sm flex-1">{stage.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass-card p-6">
                    <h4 className="text-lg font-semibold text-white mb-4">Final Result</h4>
                    <div className="equation text-center">
                      <span className="text-plasma-cyan">Y</span><sub className="text-gray-400">B</sub>
                      <span className="text-gray-400"> ≈</span>
                      <span className="text-starlight-gold ml-2">8.7 × 10</span>
                      <sup className="text-starlight-gold text-lg">-11</sup>
                    </div>
                    <p className="text-gray-400 text-center text-sm mt-4">
                      Consistent with Planck observations
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Experimental Probes */}
          <div className="glass-card p-8">
            <h3 className="text-2xl font-serif font-bold text-white mb-6 flex items-center gap-3">
              <Target className="w-8 h-8 text-plasma-cyan" />
              Experimental Probes
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: 'SHiP',
                  desc: 'Search for Hidden Particles',
                  energy: '400 GeV proton beam',
                  sensitivity: '|U_μ|² ~ 10⁻⁸ - 10⁻⁷',
                  timeline: '2030s',
                  color: 'blue',
                },
                {
                  name: 'HL-LHC',
                  desc: 'High-Luminosity LHC',
                  energy: '14 TeV collisions',
                  sensitivity: '|U_μ|² ~ 10⁻⁹',
                  timeline: '2030s',
                  color: 'purple',
                },
                {
                  name: 'FCC-ee',
                  desc: 'Future Circular Collider',
                  energy: 'e⁺e⁻ at Z-pole',
                  sensitivity: '|U_μ|² ~ 10⁻¹⁰',
                  timeline: '2040s',
                  color: 'cyan',
                },
              ].map((exp, i) => (
                <motion.div
                  key={exp.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`glass-card p-6 interactive-element border-l-4 border-${exp.color}-400`}
                >
                  <h4 className={`text-xl font-bold text-${exp.color}-400 mb-2`}>{exp.name}</h4>
                  <p className="text-gray-300 text-sm mb-4">{exp.desc}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Energy:</span>
                      <span className="text-white">{exp.energy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Sensitivity:</span>
                      <span className="text-white font-mono">{exp.sensitivity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Timeline:</span>
                      <span className="text-white">{exp.timeline}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
