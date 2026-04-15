import { useState } from 'react';
import { RefreshCw } from 'lucide-react';

interface AssetNode {
  id: number;
  name: string;
  allocation: number;
  color: string;
}

export default function PortfolioDiagram() {
  const [feeLevel, setFeeLevel] = useState(0);
  
  const assets: AssetNode[] = [
    { id: 1, name: 'Asset A', allocation: 0.5, color: '#3B82F6' },
    { id: 2, name: 'Asset B', allocation: 0.5, color: '#06B6D4' },
  ];
  
  const simulateUpdate = () => {
    const update = assets.map(asset => ({
      ...asset,
      allocation: Math.max(0.1, Math.min(0.9, asset.allocation + (Math.random() - 0.5) * (feeLevel > 0 ? 0.05 : 0.15)))
    }));
    
    const total = update.reduce((sum: number, a: AssetNode) => sum + a.allocation, 0);
    update.map(a => ({ ...a, allocation: a.allocation / total }));
  };
  
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-4 items-center justify-center">
        <button
          onClick={() => setFeeLevel(0)}
          className={`px-4 py-2 rounded-lg transition-all ${
            feeLevel === 0
              ? 'bg-blue-600 text-white'
              : 'bg-stone-700 text-stone-300 hover:bg-stone-600'
          }`}
        >
          No Transaction Fees
        </button>
        <button
          onClick={() => setFeeLevel(2)}
          className={`px-4 py-2 rounded-lg transition-all ${
            feeLevel === 2
              ? 'bg-blue-600 text-white'
              : 'bg-stone-700 text-stone-300 hover:bg-stone-600'
          }`}
        >
          2% Transaction Fees
        </button>
      </div>
      
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-stone-100">
            Portfolio Allocation Dynamics
          </h3>
          <button
            onClick={simulateUpdate}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg hover:from-blue-500 hover:to-emerald-500 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            Simulate Update
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {assets.map((asset) => (
              <div
                key={asset.id}
                className="card p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-stone-200">{asset.name}</span>
                  <span className="text-emerald-400 font-bold">
                    {(asset.allocation * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full h-3 bg-stone-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ 
                      width: `${asset.allocation * 100}%`,
                      backgroundColor: asset.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="relative h-64 card p-4 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center z-10">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              
              <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
                <defs>
                  <linearGradient id="gradientLine" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>
                <line
                  x1="50%"
                  y1="50%"
                  x2="25%"
                  y2="30%"
                  stroke="url(#gradientLine)"
                  strokeWidth="3"
                  strokeDasharray={feeLevel > 0 ? "5,5" : "none"}
                />
                <line
                  x1="50%"
                  y1="50%"
                  x2="75%"
                  y2="30%"
                  stroke="url(#gradientLine)"
                  strokeWidth="3"
                  strokeDasharray={feeLevel > 0 ? "5,5" : "none"}
                />
              </svg>
              
              <div className="absolute top-8 left-1/4 transform -translate-x-1/2">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">A</span>
                </div>
              </div>
              <div className="absolute top-8 right-1/4 transform translate-x-1/2">
                <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">B</span>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <p className="text-stone-400 text-sm">
                {feeLevel > 0 ? (
                  <span className="text-amber-400">
                    High fees reduce rebalancing frequency
                  </span>
                ) : (
                  <span className="text-emerald-400">
                    Continuous gradient flow optimization
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-stone-700/50 rounded-lg">
          <p className="text-stone-300 text-sm">
            <strong className="text-blue-400">Onflow Algorithm:</strong> Uses softmax parameterization to update allocations through ODE-based gradient flows.
            With transaction costs (ξ &gt; 0), the algorithm naturally reduces turnover by incorporating a pseudo-Huber loss term that penalizes large allocation changes.
          </p>
        </div>
      </div>
    </div>
  );
}
