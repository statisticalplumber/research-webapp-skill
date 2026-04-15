import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertCircle } from 'lucide-react';

interface DataPoint {
  time: number;
  onflow: number;
  eg: number;
  up: number;
  asset1: number;
  asset2: number;
}

const chartData: DataPoint[] = [
  { time: 0, onflow: 1, eg: 1, up: 1, asset1: 1, asset2: 1 },
  { time: 500, onflow: 5.2, eg: 4.8, up: 3.1, asset1: 2.1, asset2: 1.5 },
  { time: 1000, onflow: 12.5, eg: 10.2, up: 5.8, asset1: 4.2, asset2: 2.3 },
  { time: 1500, onflow: 22.3, eg: 17.5, up: 8.4, asset1: 6.8, asset2: 3.1 },
  { time: 2000, onflow: 35.6, eg: 26.1, up: 11.2, asset1: 9.5, asset2: 4.0 },
  { time: 2500, onflow: 48.2, eg: 34.8, up: 14.5, asset1: 12.3, asset2: 4.8 },
  { time: 3000, onflow: 56.8, eg: 41.2, up: 17.1, asset1: 15.1, asset2: 5.4 },
  { time: 3500, onflow: 62.4, eg: 45.6, up: 19.2, asset1: 17.8, asset2: 5.9 },
  { time: 4000, onflow: 66.1, eg: 48.3, up: 20.8, asset1: 20.2, asset2: 6.3 },
  { time: 4500, onflow: 68.5, eg: 50.1, up: 21.9, asset1: 22.5, asset2: 6.6 },
  { time: 5000, onflow: 69.8, eg: 51.2, up: 22.6, asset1: 24.3, asset2: 6.8 },
  { time: 5500, onflow: 70.2, eg: 51.8, up: 23.1, asset1: 25.8, asset2: 6.9 },
];

interface ChartConfig {
  title: string;
  subtitle: string;
  onflowColor: string;
  egColor: string;
  upColor: string;
  assetColor: string;
}

const chartConfigs: { [key: number]: ChartConfig } = {
  0: {
    title: 'Performance Comparison (Zero Transaction Fees)',
    subtitle: 'Onflow and EG both significantly outperform UP and individual assets',
    onflowColor: '#06B6D4',
    egColor: '#3B82F6',
    upColor: '#10B981',
    assetColor: '#F59E0B',
  },
  2: {
    title: 'Performance with 2% Transaction Fees',
    subtitle: 'Only Onflow maintains superiority over buy-and-hold strategies',
    onflowColor: '#06B6D4',
    egColor: '#EF4444',
    upColor: '#EF4444',
    assetColor: '#F59E0B',
  },
};

export default function PerformanceChart() {
  const [feeLevel, setFeeLevel] = useState(0);
  const [selectedPair, setSelectedPair] = useState(1);
  
  const pairDescriptions: { [key: number]: { name: string; desc: string } } = {
    1: { name: 'Iroquois - Kin Ark', desc: 'Volatile uncorrelated assets' },
    2: { name: 'Commercial Metals - Kin Ark', desc: 'Volatile uncorrelated assets' },
    3: { name: 'Coca Cola - IBM', desc: 'Non-volatile highly correlated' },
    4: { name: 'Commercial Metals - Meicco', desc: 'Volatile' },
  };
  
  const config = chartConfigs[feeLevel];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2">
          {[0, 2].map(level => (
            <button
              key={level}
              onClick={() => setFeeLevel(level)}
              className={`px-4 py-2 rounded-lg transition-all ${
                feeLevel === level
                  ? 'bg-blue-600 text-white'
                  : 'bg-stone-700 text-stone-300 hover:bg-stone-600'
              }`}
            >
              {level === 0 ? '0% Fees' : '2% Fees'}
            </button>
          ))}
        </div>
        
        <div className="flex gap-2">
          {Object.entries(pairDescriptions).map(([id]) => (
            <button
              key={id}
              onClick={() => setSelectedPair(Number(id))}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                selectedPair === Number(id)
                  ? 'bg-emerald-600 text-white'
                  : 'bg-stone-700 text-stone-300 hover:bg-stone-600'
              }`}
            >
              Pair {id}
            </button>
          ))}
        </div>
      </div>
      
      <div className="card">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-stone-100 mb-2">
            {config.title}
          </h3>
          <p className="text-stone-400 text-sm mb-4">
            {config.subtitle}
          </p>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: config.onflowColor }} />
              <span className="text-stone-300">Onflow</span>
            </span>
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: config.egColor }} />
              <span className="text-stone-300">EG Algorithm</span>
            </span>
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: config.upColor }} />
              <span className="text-stone-300">Cover UP</span>
            </span>
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: config.assetColor }} />
              <span className="text-stone-300">Individual Assets</span>
            </span>
          </div>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="time" 
                stroke="#9CA3AF"
                label={{ value: 'Time (trading days)', position: 'insideBottom', offset: -10, fill: '#9CA3AF' }}
              />
              <YAxis 
                stroke="#9CA3AF"
                label={{ value: 'Portfolio Value', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#292524',
                  border: '1px solid #4B5563',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#F5F5F4' }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="onflow"
                stroke={config.onflowColor}
                strokeWidth={3}
                dot={false}
                name="Onflow"
              />
              <Line
                type="monotone"
                dataKey="eg"
                stroke={config.egColor}
                strokeWidth={2}
                dot={false}
                name="EG"
              />
              <Line
                type="monotone"
                dataKey="up"
                stroke={config.upColor}
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                name="Cover UP"
              />
              <Line
                type="monotone"
                dataKey="asset1"
                stroke={config.assetColor}
                strokeWidth={1}
                strokeDasharray="3 3"
                dot={false}
                name="Best Asset (Buy & Hold)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 p-4 bg-stone-700/50 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-stone-300 text-sm">
                <strong>Key Insight:</strong> With {feeLevel}% transaction fees, the Onflow algorithm achieves approximately{' '}
                <span className="text-emerald-400 font-bold">{feeLevel === 0 ? '70x' : '50x'}</span> 
                initial wealth, while EG and Cover UP deteriorate significantly to{' '}
                <span className={feeLevel === 0 ? 'text-blue-400' : 'text-red-400'}>
                  {feeLevel === 0 ? '51x' : '~15x'}
                </span>{' '}
                when compared to buy-and-hold strategies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
