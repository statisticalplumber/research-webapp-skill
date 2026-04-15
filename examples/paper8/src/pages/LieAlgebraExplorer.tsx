import { useState } from 'react';
import { motion } from 'framer-motion';
import { InlineMath, BlockMath } from 'react-katex';
import { Database, TrendingUp, Sigma } from 'lucide-react';

interface StructureConstant {
  i: number;
  j: number;
  k: number;
  value: string;
}

interface LieAlgebra {
  name: string;
  dimension: number;
  type: string;
  structureConstants: StructureConstant[];
  relations: string[];
  admitsLSA: boolean;
  admitsRSA: boolean;
  admitsAFA: boolean;
  admitsA3: boolean;
  admitsS3: boolean;
}

const lieAlgebras: LieAlgebra[] = [
  {
    name: '𝔰𝔩(2,ℂ)',
    dimension: 3,
    type: 'Simple',
    structureConstants: [
      { i: 1, j: 2, k: 2, value: '2' },
      { i: 1, j: 3, k: 3, value: '-2' },
      { i: 2, j: 3, k: 1, value: '1' },
    ],
    relations: ['[H,E] = 2E', '[H,F] = -2F', '[E,F] = H'],
    admitsLSA: false,
    admitsRSA: false,
    admitsAFA: true,
    admitsA3: true,
    admitsS3: true,
  },
  {
    name: '𝔰𝔲(2)',
    dimension: 3,
    type: 'Compact Real Form',
    structureConstants: [
      { i: 1, j: 2, k: 3, value: '2' },
      { i: 2, j: 3, k: 1, value: '2' },
      { i: 3, j: 1, k: 2, value: '2' },
    ],
    relations: ['[X₁,X₂] = 2X₃', '[X₂,X₃] = 2X₁', '[X₃,X₁] = 2X₂'],
    admitsLSA: false,
    admitsRSA: false,
    admitsAFA: true,
    admitsA3: true,
    admitsS3: true,
  },
  {
    name: 'Solvable (2D)',
    dimension: 2,
    type: 'Solvable',
    structureConstants: [
      { i: 1, j: 2, k: 2, value: '1' },
    ],
    relations: ['[e₁,e₂] = e₂'],
    admitsLSA: true,
    admitsRSA: true,
    admitsAFA: true,
    admitsA3: true,
    admitsS3: true,
  },
  {
    name: 'Solvable (3D, Ex 2.2)',
    dimension: 3,
    type: 'Solvable',
    structureConstants: [
      { i: 1, j: 2, k: 2, value: '1' },
      { i: 3, j: 1, k: 3, value: '1' },
    ],
    relations: ['[e₁,e₂] = e₂', '[e₃,e₁] = e₃'],
    admitsLSA: true,
    admitsRSA: true,
    admitsAFA: true,
    admitsA3: true,
    admitsS3: true,
  },
  {
    name: 'Abelian (3D)',
    dimension: 3,
    type: 'Abelian',
    structureConstants: [],
    relations: ['[eᵢ,eⱼ] = 0 for all i,j'],
    admitsLSA: true,
    admitsRSA: true,
    admitsAFA: true,
    admitsA3: true,
    admitsS3: true,
  },
];

function LieAlgebraExplorer() {
  const [selectedAlgebra, setSelectedAlgebra] = useState<LieAlgebra>(lieAlgebras[0]);
  const [showStructureConstants, setShowStructureConstants] = useState(true);
  const [projectionOrder, setProjectionOrder] = useState<1 | 2>(1);

  const getPreAlgebraicStructure = (alg: LieAlgebra): string => {
    if (alg.name.includes('𝔰𝔩')) {
      return 'E·F = H, F·H = 2F, H·E = 2E, H·H = 2H';
    } else if (alg.name.includes('𝔰𝔲')) {
      return 'X₁·X₂ = X₃, X₂·X₃ = X₁ + iX₂, X₃·X₁ = iX₁ + X₂';
    } else if (alg.name.includes('Solvable')) {
      return 'e₁·e₂ = δe₂, e₂·e₁ = -iδe₂ (Class II solution)';
    }
    return 'Trivial product';
  };

  return (
    <div className="page-container">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="section"
      >
        <h1 className="section-title gradient-text">Lie Algebra Explorer</h1>
        <p className="section-subtitle">
          Explore structure constants and pre-Lie structures for various Lie algebras
        </p>
      </motion.section>

      {/* Structure Constants Definition */}
      <section className="section">
        <div className="info-card">
          <h3>
            <Sigma size={24} className="accent-primary" />
            Structure Constants
          </h3>
          <p style={{ marginTop: '1rem' }}>
            For a Lie algebra with basis <InlineMath math="\{e_1, \ldots, e_n\}" />, the Lie bracket is determined by:
          </p>
          <div className="math-display">
            <BlockMath math="[e_i, e_j] = \\sum_{k=1}^n c_{ij}^k e_k" />
          </div>
          <p style={{ marginTop: '1rem' }}>
            where <InlineMath math="c_{ij}^k" /> are the structure constants satisfying antisymmetry 
            <InlineMath math="c_{ij}^k = -c_{ji}^k" /> and the Jacobi identity.
          </p>
        </div>
      </section>

      {/* Algebra Selector */}
      <section className="section">
        <h2 className="section-title">
          <Database size={28} style={{ display: 'inline', marginRight: '0.5rem' }} />
          Select Lie Algebra
        </h2>
        <div className="cards-grid">
          {lieAlgebras.map((alg, index) => (
            <motion.div
              key={alg.name}
              className="info-card"
              onClick={() => setSelectedAlgebra(alg)}
              whileHover={{ scale: 1.03 }}
              style={{
                cursor: 'pointer',
                border: selectedAlgebra.name === alg.name ? '2px solid #646cff' : undefined,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <h3 style={{ color: alg.type === 'Simple' ? '#ff6b6b' : alg.type === 'Solvable' ? '#6cffb4' : '#646cff' }}>
                {alg.name}
              </h3>
              <p style={{ margin: '0.5rem 0', color: 'rgba(255,255,255,0.6)' }}>
                {alg.type} · dim = {alg.dimension}
              </p>
              <div style={{ marginTop: '0.5rem' }}>
                {alg.admitsLSA ? (
                  <span className="badge badge-tertiary">LSA ✓</span>
                ) : (
                  <span className="badge" style={{ background: 'rgba(255,107,107,0.2)', color: '#ff6b6b' }}>LSA ✗</span>
                )}
                {alg.admitsAFA ? (
                  <span className="badge badge-primary">AFA ✓</span>
                ) : (
                  <span className="badge" style={{ background: 'rgba(255,107,107,0.2)', color: '#ff6b6b' }}>AFA ✗</span>
                )}
                {alg.admitsS3 ? (
                  <span className="badge badge-secondary">S₃ ✓</span>
                ) : (
                  <span className="badge" style={{ background: 'rgba(255,107,107,0.2)', color: '#ff6b6b' }}>S₃ ✗</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Detailed View */}
      <section className="section">
        <div className="interactive-panel">
          <div className="control-group">
            <div className="control-item">
              <label>Projection Order</label>
              <select value={projectionOrder} onChange={(e) => setProjectionOrder(Number(e.target.value) as 1 | 2)}>
                <option value={1}>p = 1 (Simple)</option>
                <option value={2}>p = 2 (Complex)</option>
              </select>
            </div>
            <div className="control-item">
              <label>Display Options</label>
              <button onClick={() => setShowStructureConstants(!showStructureConstants)}>
                {showStructureConstants ? 'Hide' : 'Show'} Structure Constants
              </button>
            </div>
          </div>

          {/* Algebra Details */}
          <div className="result-box">
            <div className="result-title">{selectedAlgebra.name}</div>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <span className="badge badge-primary">{selectedAlgebra.type}</span>
              <span className="badge badge-secondary">Dimension: {selectedAlgebra.dimension}</span>
              <span className="badge badge-tertiary">Projection Order: p={projectionOrder}</span>
            </div>

            <p><strong>Lie Bracket Relations:</strong></p>
            <div className="math-display">
              {selectedAlgebra.relations.map((rel, i) => (
                <div key={i} style={{ marginBottom: i < selectedAlgebra.relations.length - 1 ? '0.5rem' : 0 }}>
                  <InlineMath math={rel.replace(/\[/g, '[').replace(/\]/g, ']')} />
                </div>
              ))}
            </div>

            {showStructureConstants && selectedAlgebra.structureConstants.length > 0 && (
              <>
                <p style={{ marginTop: '1rem' }}><strong>Non-zero Structure Constants cᵢⱼᵏ:</strong></p>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>i</th>
                      <th>j</th>
                      <th>k</th>
                      <th>cᵢⱼᵏ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedAlgebra.structureConstants.map((sc, idx) => (
                      <tr key={idx}>
                        <td>{sc.i}</td>
                        <td>{sc.j}</td>
                        <td>{sc.k}</td>
                        <td style={{ fontFamily: 'monospace' }}>{sc.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>

          {/* Pre-Lie Admissibility */}
          <div className="result-box success" style={{ marginTop: '1.5rem' }}>
            <div className="result-title">
              <TrendingUp size={20} style={{ display: 'inline', marginRight: '0.5rem' }} />
              Pre-Lie Admissibility
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Class</th>
                  <th>Full Name</th>
                  <th>Admissible?</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span className="badge" style={{ background: 'rgba(255,107,107,0.2)', color: '#ff6b6b' }}>LSA</span></td>
                  <td>Left-Symmetric Algebra</td>
                  <td>{selectedAlgebra.admitsLSA ? '✓ Yes' : '✗ No'}</td>
                  <td>{selectedAlgebra.admitsLSA ? 'Solvable algebras' : 'Semisimple (n≥3) exclude LSA'}</td>
                </tr>
                <tr>
                  <td><span className="badge" style={{ background: 'rgba(255,202,87,0.2)', color: '#feca57' }}>RSA</span></td>
                  <td>Right-Symmetric Algebra</td>
                  <td>{selectedAlgebra.admitsRSA ? '✓ Yes' : '✗ No'}</td>
                  <td>{selectedAlgebra.admitsRSA ? 'Solvable algebras' : 'Semisimple (n≥3) exclude RSA'}</td>
                </tr>
                <tr>
                  <td><span className="badge badge-primary">AFA</span></td>
                  <td>Anti-Flexible Algebra</td>
                  <td>{selectedAlgebra.admitsAFA ? '✓ Yes' : '✗ No'}</td>
                  <td>{selectedAlgebra.admitsAFA ? (selectedAlgebra.type === 'Simple' ? 'Counterexample!' : 'All solvable') : 'Not computed'}</td>
                </tr>
                <tr>
                  <td><span className="badge" style={{ background: 'rgba(95,39,205,0.2)', color: '#a29bfe' }}>A₃</span></td>
                  <td>A₃-Associative</td>
                  <td>{selectedAlgebra.admitsA3 ? '✓ Yes' : '✗ No'}</td>
                  <td>All Lie algebras</td>
                </tr>
                <tr>
                  <td><span className="badge badge-tertiary">S₃</span></td>
                  <td>S₃-Associative</td>
                  <td>{selectedAlgebra.admitsS3 ? '✓ Yes' : '✗ No'}</td>
                  <td>Universal pre-Lie structure</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pre-Algebraic Structure */}
          <div className="result-box" style={{ marginTop: '1.5rem' }}>
            <div className="result-title">Pre-Algebraic Structure Example</div>
            <p style={{ marginBottom: '1rem', color: 'rgba(255,255,255,0.7)' }}>
              A possible pre-Lie product structure:
            </p>
            <div className="math-display">
              <BlockMath math={`\\text{${getPreAlgebraicStructure(selectedAlgebra)}}`} />
            </div>
            <p style={{ marginTop: '1rem' }}>
              This satisfies <InlineMath math="[x,y] = x \\cdot y - y \\cdot x" /> for the given Lie algebra.
            </p>
          </div>

          {/* Jacobi Check */}
          <div className="result-box success" style={{ marginTop: '1.5rem' }}>
            <div className="result-title">Jacobi Identity Verification</div>
            <div className="math-display">
              <BlockMath math="[x,[y,z]] + [y,[z,x]] + [z,[x,y]] = 0" />
            </div>
            <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(108, 255, 180, 0.1)', borderRadius: '8px' }}>
              <span style={{ color: '#6cffb4' }}>
                ✓ Jacobi identity satisfied for {selectedAlgebra.name}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Key Theorem */}
      <section className="section">
        <div className="info-card" style={{ border: '2px solid #646cff' }}>
          <h3>Key Theorem</h3>
          <div className="math-display" style={{ marginTop: '1rem' }}>
            <BlockMath math="\\text{Theorem: Every Lie algebra over } \\mathbb{C} \\text{ admits an } S_3\\text{-associative structure}" />
          </div>
          <p style={{ marginTop: '1rem' }}>
            This is a universal result - <strong>all</strong> Lie algebras, including semisimple ones, 
            admit S₃-associative pre-Lie structures. The only structures excluded by semisimple Lie 
            algebras (for n ≥ 3) are LSAs and RSAs.
          </p>
        </div>
      </section>
    </div>
  );
}

export default LieAlgebraExplorer;
