import { useState } from 'react';
import { motion } from 'framer-motion';
import { InlineMath, BlockMath } from 'react-katex';
import { Sparkles, GitBranch, Zap, Check } from 'lucide-react';

interface S3Product {
  i: number;
  j: number;
  k: number;
  alpha: string;
  beta: string;
}

function S3AssociativeDemo() {
  const [alpha, setAlpha] = useState(2);
  const [beta, setBeta] = useState(1);
  const [showProof, setShowProof] = useState(false);
  const [selectedExample, setSelectedExample] = useState<'general' | 'cross' | 'sl2'>('general');

  // General S3-associative algebra from Example 4.2
  const generalProducts: S3Product[] = [
    { i: 1, j: 1, k: 1, alpha: '1', beta: '1' },
    { i: 2, j: 2, k: 2, alpha: '1', beta: '1' },
    { i: 3, j: 3, k: 3, alpha: '1', beta: '1' },
    { i: 1, j: 2, k: 3, alpha: String(alpha), beta: String(beta) },
    { i: 2, j: 3, k: 1, alpha: String(alpha), beta: String(beta) },
    { i: 3, j: 1, k: 2, alpha: String(alpha), beta: String(beta) },
    { i: 2, j: 1, k: 3, alpha: String(beta), beta: String(alpha) },
    { i: 3, j: 2, k: 1, alpha: String(beta), beta: String(alpha) },
    { i: 1, j: 3, k: 2, alpha: String(beta), beta: String(alpha) },
  ];

  const getExampleInfo = () => {
    switch (selectedExample) {
      case 'cross':
        return {
          name: 'Cross Product Algebra',
          description: 'The standard cross product in ℝ³ is A₃-associative',
          products: [
            'e₁·e₂ = e₃', 'e₂·e₃ = e₁', 'e₃·e₁ = e₂',
            'e₂·e₁ = -e₃', 'e₃·e₂ = -e₁', 'e₁·e₃ = -e₂',
          ],
          commutator: '[eᵢ,eⱼ] = 2εᵢⱼₖeₖ ≅ 𝔰𝔲(2)',
          type: 'A₃-associative (antisymmetric)',
        };
      case 'sl2':
        return {
          name: '𝔰𝔩(2,ℂ) S₃-Structure',
          description: 'Universal S₃-associative structure for sl(2,ℂ)',
          products: [
            'E·F = H', 'F·H = 2F', 'H·E = 2E', 'H·H = 2H',
          ],
          commutator: '[H,E] = 2E, [H,F] = -2F, [E,F] = H',
          type: 'S₃-associative',
        };
      default:
        return {
          name: 'General S₃-Associative Algebra',
          description: 'Three-dimensional S₃-associative algebra with parameters α, β',
          products: generalProducts.map(p => 
            p.i === p.j 
              ? `e_${p.i}·e_${p.j} = e_${p.k}`
              : `e_${p.i}·e_${p.j} = ${p.i < p.j ? 'α' : 'β'}e_${p.k}`
          ),
          commutator: `[eᵢ,eⱼ] = (α - β)εᵢⱼₖeₖ ≅ 𝔰𝔲(2) (when α ≠ β)`,
          type: alpha !== beta ? 'Exclusively S₃-associative' : 'Also A₃-associative',
        };
    }
  };

  const exampleInfo = getExampleInfo();

  const associatorCondition = (
    <BlockMath math="(x,y,z) + (y,z,x) + (z,x,y) = (y,x,z) + (x,z,y) + (z,y,x)" />
  );

  const a3Condition = (
    <BlockMath math="(x,y,z) + (y,z,x) + (z,x,y) = 0" />
  );

  return (
    <div className="page-container">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="section"
      >
        <h1 className="section-title gradient-text">S₃-Associative Algebras</h1>
        <p className="section-subtitle">
          Universal pre-Lie structures for all Lie algebras over ℂ
        </p>
      </motion.section>

      {/* Definition */}
      <section className="section">
        <div className="info-card">
          <h3>
            <Sparkles size={24} className="accent-tertiary" />
            S₃-Associative Algebra Definition
          </h3>
          <p style={{ marginTop: '1rem' }}>
            An <strong>S₃-Associative Algebra</strong> is an algebra <InlineMath math="(\mathcal{A}, \cdot)" /> 
            with a bilinear product such that the associator satisfies:
          </p>
          <div className="math-display">
            {associatorCondition}
          </div>
          <p style={{ marginTop: '1rem' }}>
            This is the signed sum of associators over the full symmetric group S₃. 
            When the signed sum equals zero, the algebra is Lie-admissible.
          </p>
        </div>
      </section>

      {/* Comparison with A₃ */}
      <section className="section">
        <h2 className="section-title">S₃ vs A₃ Associativity</h2>
        <div className="cards-grid">
          <motion.div
            className="info-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
          >
            <h3>
              <GitBranch size={24} style={{ color: '#5f27cd' }} />
              A₃-Associative
            </h3>
            <p style={{ marginTop: '0.5rem' }}>Even permutations only:</p>
            <div className="math-display" style={{ padding: '0.8rem' }}>
              {a3Condition}
            </div>
            <p style={{ marginTop: '0.5rem', color: 'rgba(255,255,255,0.7)' }}>
              Geometric interpretation: First Bianchi identity for curvature
            </p>
            <div style={{ marginTop: '1rem', padding: '0.8rem', background: 'rgba(108, 255, 180, 0.1)', borderRadius: '6px' }}>
              <Check size={16} style={{ display: 'inline', marginRight: '0.3rem', color: '#6cffb4' }} />
              <span style={{ color: '#6cffb4' }}>All Lie algebras admit A₃ structures</span>
            </div>
          </motion.div>

          <motion.div
            className="info-card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
            style={{ border: '2px solid #6cffff' }}
          >
            <h3>
              <Zap size={24} style={{ color: '#6cffff' }} />
              S₃-Associative
            </h3>
            <p style={{ marginTop: '0.5rem' }}>Full symmetric group:</p>
            <div className="math-display" style={{ padding: '0.8rem' }}>
              <BlockMath math="\sum_{\sigma \in S_3} \text{sgn}(\sigma)(x_{\sigma(1)}, x_{\sigma(2)}, x_{\sigma(3)}) = 0" />
            </div>
            <p style={{ marginTop: '0.5rem', color: 'rgba(255,255,255,0.7)' }}>
              Universal: subsumes LSA, RSA, AFA, A₃, and associative algebras
            </p>
            <div style={{ marginTop: '1rem', padding: '0.8rem', background: 'rgba(108, 255, 255, 0.1)', borderRadius: '6px' }}>
              <Check size={16} style={{ display: 'inline', marginRight: '0.3rem', color: '#6cffff' }} />
              <span style={{ color: '#6cffff' }}>Universal for ALL Lie algebras!</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="section">
        <h2 className="section-title">
          <Sparkles size={28} style={{ display: 'inline', marginRight: '0.5rem' }} />
          Interactive S₃-Associative Demo
        </h2>
        <p className="section-subtitle">
          Explore different S₃-associative algebra examples
        </p>

        <div className="interactive-panel">
          <div className="control-group">
            <div className="control-item">
              <label>Select Example</label>
              <select value={selectedExample} onChange={(e) => setSelectedExample(e.target.value as any)}>
                <option value="general">General S₃ (Ex 4.2)</option>
                <option value="cross">Cross Product (Ex 5.3)</option>
                <option value="sl2">𝔰𝔩(2,ℂ) Structure</option>
              </select>
            </div>
            <div className="control-item">
              <label>α parameter: {alpha}</label>
              <input
                type="range"
                min="0"
                max="5"
                step="0.5"
                value={alpha}
                onChange={(e) => setAlpha(Number(e.target.value))}
                disabled={selectedExample !== 'general'}
              />
            </div>
            <div className="control-item">
              <label>β parameter: {beta}</label>
              <input
                type="range"
                min="0"
                max="5"
                step="0.5"
                value={beta}
                onChange={(e) => setBeta(Number(e.target.value))}
                disabled={selectedExample !== 'general'}
              />
            </div>
            <div className="control-item">
              <label>Display</label>
              <button onClick={() => setShowProof(!showProof)}>
                {showProof ? 'Hide' : 'Show'} Proof
              </button>
            </div>
          </div>

          {/* Example Info */}
          <div className="result-box">
            <div className="result-title">{exampleInfo.name}</div>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1rem' }}>
              {exampleInfo.description}
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <span className="badge badge-tertiary">{exampleInfo.type}</span>
              {selectedExample === 'general' && alpha !== beta && (
                <span className="badge badge-primary">α ≠ β (exclusively S₃)</span>
              )}
              {selectedExample === 'general' && alpha === beta && (
                <span className="badge badge-secondary">α = β (also A₃)</span>
              )}
            </div>

            <p><strong>Product Structure:</strong></p>
            <div className="math-display">
              {exampleInfo.products.map((prod, i) => (
                <div key={i} style={{ marginBottom: i < exampleInfo.products.length - 1 ? '0.5rem' : 0 }}>
                  <InlineMath math={prod.replace(/·/g, '\\cdot').replace(/≅/g, '\\cong')} />
                </div>
              ))}
            </div>

            <p style={{ marginTop: '1rem' }}><strong>Commututator Algebra:</strong></p>
            <div className="math-display">
              <InlineMath math={exampleInfo.commutator.replace(/\[/g, '[').replace(/\]/g, ']')} />
            </div>
          </div>

          {/* Product Table for General Case */}
          {selectedExample === 'general' && (
            <div className="result-box success" style={{ marginTop: '1.5rem' }}>
              <div className="result-title">Complete Product Table (α = {alpha}, β = {beta})</div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>eᵢ · eⱼ</th>
                    <th>e₁</th>
                    <th>e₂</th>
                    <th>e₃</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>e₁</strong></td>
                    <td>e₁</td>
                    <td style={{ color: alpha !== beta ? '#646cff' : undefined }}>α·e₃ = {alpha}e₃</td>
                    <td style={{ color: alpha !== beta ? '#d46cff' : undefined }}>β·e₂ = {beta}e₂</td>
                  </tr>
                  <tr>
                    <td><strong>e₂</strong></td>
                    <td style={{ color: alpha !== beta ? '#d46cff' : undefined }}>β·e₃ = {beta}e₃</td>
                    <td>e₂</td>
                    <td style={{ color: alpha !== beta ? '#646cff' : undefined }}>α·e₁ = {alpha}e₁</td>
                  </tr>
                  <tr>
                    <td><strong>e₃</strong></td>
                    <td style={{ color: alpha !== beta ? '#646cff' : undefined }}>α·e₂ = {alpha}e₂</td>
                    <td style={{ color: alpha !== beta ? '#d46cff' : undefined }}>β·e₁ = {beta}e₁</td>
                    <td>e₃</td>
                  </tr>
                </tbody>
              </table>
              <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>
                Diagonal elements: eᵢ·eᵢ = eᵢ (idempotent)
              </p>
            </div>
          )}

          {/* Commutator Result */}
          <div className="result-box" style={{ marginTop: '1.5rem' }}>
            <div className="result-title">Commututator Calculation</div>
            <p style={{ marginBottom: '1rem', color: 'rgba(255,255,255,0.7)' }}>
              Computing [eᵢ, eⱼ] = eᵢ·eⱼ - eⱼ·eᵢ:
            </p>
            <div className="math-display">
              {selectedExample === 'general' ? (
                <>
                  <BlockMath math="[e_1, e_2] = \\alpha e_3 - \\beta e_3 = (\\alpha - \\beta) e_3" />
                  <BlockMath math="[e_2, e_3] = (\\alpha - \\beta) e_1" />
                  <BlockMath math="[e_3, e_1] = (\\alpha - \\beta) e_2" />
                </>
              ) : selectedExample === 'cross' ? (
                <>
                  <BlockMath math="[e_1, e_2] = e_3 - (-e_3) = 2e_3" />
                  <BlockMath math="[e_2, e_3] = 2e_1, \\quad [e_3, e_1] = 2e_2" />
                </>
              ) : (
                <>
                  <BlockMath math="[H, E] = H \\cdot E - E \\cdot H = 2E - 0 = 2E" />
                  <BlockMath math="[H, F] = H \\cdot F - F \\cdot H = 0 - (-2F) = 2F" />
                  <BlockMath math="[E, F] = E \\cdot F - F \\cdot E = H - 0 = H" />
                </>
              )}
            </div>
            {selectedExample === 'general' && (
              <p style={{ marginTop: '1rem' }}>
                After rescaling generators by 1/(α-β), this gives <strong>𝔰𝔲(2)</strong> when α ≠ β.
              </p>
            )}
          </div>

          {/* Proof Section */}
          {showProof && (
            <motion.div
              className="result-box success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ marginTop: '1.5rem' }}
            >
              <div className="result-title">
                <Check size={20} style={{ display: 'inline', marginRight: '0.5rem' }} />
                Proof: S₃-Associative Algebras are Universal
              </div>
              <div className="math-display">
                <BlockMath math="\text{Theorem: } S_3\text{-associative algebras realize universal pre-Lie structures for all Lie algebras over } \mathbb{C}" />
              </div>
              <div style={{ marginTop: '1rem', lineHeight: 1.8 }}>
                <strong>Proof:</strong>
                <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
                  <li>
                    Given a Lie algebra <InlineMath math="(\mathcal{A}, [,])" />, any pre-algebraic structure 
                    <InlineMath math="(\mathcal{A}, \cdot)" /> satisfies the Akivis identity:
                  </li>
                  <div className="math-display" style={{ margin: '0.5rem 0' }}>
                    <BlockMath math="\sum_{\sigma \in S_3} \text{sgn}(\sigma)(x_{\sigma(1)}, x_{\sigma(2)}, x_{\sigma(3)}) = J(x_1, x_2, x_3)" />
                  </div>
                  <li>
                    For a Lie algebra, the Jacobinator vanishes: <InlineMath math="J(x_1, x_2, x_3) = 0" /> (Jacobi identity)
                  </li>
                  <li>
                    Therefore: <InlineMath math="\sum_{\sigma \in S_3} \text{sgn}(\sigma)(x_{\sigma(1)}, x_{\sigma(2)}, x_{\sigma(3)}) = 0" />
                  </li>
                  <li>
                    This is precisely the definition of an S₃-associative algebra! ∎
                  </li>
                </ol>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Hierarchy Diagram */}
      <section className="section">
        <h2 className="section-title">Hierarchy of Lie-Admissible Algebras</h2>
        <div className="visualization-container">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <motion.div
              className="info-card"
              style={{ width: '100%', maxWidth: '600px', border: '3px solid #6cffff' }}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
            >
              <h3 style={{ color: '#6cffff', textAlign: 'center' }}>S₃-Associative (Universal)</h3>
              <p style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                Contains all other classes as special cases
              </p>
            </motion.div>

            <div style={{ fontSize: '2rem', color: 'rgba(255,255,255,0.4)' }}>↑</div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <motion.div
                className="info-card"
                style={{ width: '180px' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h4 style={{ color: '#646cff' }}>AFA</h4>
                <p style={{ fontSize: '0.85rem' }}>(1 3) symmetry</p>
              </motion.div>

              <motion.div
                className="info-card"
                style={{ width: '180px' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h4 style={{ color: '#5f27cd' }}>A₃</h4>
                <p style={{ fontSize: '0.85rem' }}>Even permutations</p>
              </motion.div>

              <motion.div
                className="info-card"
                style={{ width: '180px' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h4 style={{ color: '#1dd1a1' }}>Associative</h4>
                <p style={{ fontSize: '0.85rem' }}>Identity subgroup</p>
              </motion.div>
            </div>

            <div style={{ fontSize: '2rem', color: 'rgba(255,255,255,0.4)' }}>↑</div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <motion.div
                className="info-card"
                style={{ width: '180px', border: '1px solid #ff6b6b' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h4 style={{ color: '#ff6b6b' }}>LSA</h4>
                <p style={{ fontSize: '0.85rem' }}>(1 2) symmetry</p>
                <p style={{ fontSize: '0.75rem', color: '#ff6b6b', marginTop: '0.3rem' }}>
                  ✗ Not for semisimple (n≥3)
                </p>
              </motion.div>

              <motion.div
                className="info-card"
                style={{ width: '180px', border: '1px solid #feca57' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h4 style={{ color: '#feca57' }}>RSA</h4>
                <p style={{ fontSize: '0.85rem' }}>(2 3) symmetry</p>
                <p style={{ fontSize: '0.75rem', color: '#feca57', marginTop: '0.3rem' }}>
                  ✗ Not for semisimple (n≥3)
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Result */}
      <section className="section">
        <div className="info-card" style={{ border: '3px solid #6cffff', background: 'linear-gradient(135deg, rgba(108, 255, 255, 0.1), rgba(100, 108, 255, 0.1))' }}>
          <h3>
            <Zap size={24} style={{ color: '#6cffff' }} />
            Main Result: Universality of S₃-Associative Structures
          </h3>
          <p style={{ marginTop: '1rem', fontSize: '1.1rem' }}>
            <strong>Every Lie algebra over ℂ admits an S₃-associative pre-Lie structure.</strong>
          </p>
          <p style={{ marginTop: '0.5rem' }}>
            This includes all semisimple Lie algebras, which exclude only LSA and RSA structures 
            (for dimension n ≥ 3). The S₃-associative condition is the most general Lie-admissible 
            condition, making it a universal pre-Lie structure.
          </p>
          <div className="math-display" style={{ marginTop: '1rem' }}>
            <BlockMath math="\forall \text{ Lie algebra } \mathfrak{g} \text{ over } \mathbb{C}, \exists \text{ S}_3\text{-associative structure on } \mathfrak{g}" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default S3AssociativeDemo;
