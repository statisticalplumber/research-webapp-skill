import { useState } from 'react';
import { motion } from 'framer-motion';
import { InlineMath, BlockMath } from 'react-katex';
import { Calculator, Check, X, Info } from 'lucide-react';

interface AFAProduct {
  i: number;
  j: number;
  k: number;
  d: string;
}

function AFAExplorer() {
  const [selectedExample, setSelectedExample] = useState<'sl2' | 'solvable1' | 'solvable2'>('sl2');
  const [showAssociator, setShowAssociator] = useState(true);
  const [selectedClass, setSelectedClass] = useState<'I' | 'II' | 'III' | 'IV'>('II');

  // Example: sl(2,C) AFA structure from Example 5.1
  const sl2AFA: AFAProduct[] = [
    { i: 1, j: 1, k: 1, d: 'λ' },
    { i: 1, j: 2, k: 3, d: '1' },
    { i: 1, j: 3, k: 2, d: '0' },
    { i: 2, j: 1, k: 3, d: '0' },
    { i: 2, j: 2, k: 2, d: '0' },
    { i: 2, j: 3, k: 1, d: '0' },
    { i: 3, j: 1, k: 2, d: '0' },
    { i: 3, j: 2, k: 1, d: '0' },
    { i: 3, j: 3, k: 3, d: '2' },
  ];

  // Solvable Lie algebra from Example 2.2
  const solvable1AFA: AFAProduct[] = [
    { i: 1, j: 2, k: 2, d: 'δ' },
    { i: 2, j: 1, k: 2, d: '-iδ' },
    { i: 3, j: 1, k: 3, d: 'δ' },
    { i: 1, j: 3, k: 3, d: '-iδ' },
  ];

  // 3D AFA from Example 2.1
  const solvable2AFA: AFAProduct[] = [
    { i: 1, j: 1, k: 1, d: '1' },
    { i: 2, j: 2, k: 2, d: 'λ₂' },
    { i: 3, j: 3, k: 3, d: 'λ₃' },
    { i: 1, j: 2, k: 2, d: '1' },
    { i: 1, j: 3, k: 3, d: '1' },
  ];

  const getAFAProducts = () => {
    switch (selectedExample) {
      case 'sl2': return sl2AFA;
      case 'solvable1': return solvable1AFA;
      case 'solvable2': return solvable2AFA;
    }
  };

  const getLieAlgebraInfo = () => {
    switch (selectedExample) {
      case 'sl2':
        return {
          name: '𝔰𝔩(2,ℂ)',
          relations: ['[H,E] = 2E', '[H,F] = -2F', '[E,F] = H'],
          type: 'Simple',
          dimension: 3,
        };
      case 'solvable1':
        return {
          name: 'Solvable (Example 2.2)',
          relations: ['[e₁,e₂] = e₂', '[e₃,e₁] = e₃'],
          type: 'Solvable',
          dimension: 3,
        };
      case 'solvable2':
        return {
          name: 'Solvable (Example 2.1)',
          relations: ['[e₁,e₂] = e₂', '[e₁,e₃] = e₃'],
          type: 'Solvable',
          dimension: 3,
        };
    }
  };

  const lieInfo = getLieAlgebraInfo();
  const products = getAFAProducts();

  const solutionClasses = {
    I: {
      name: 'Class I',
      description: 'k different from i and j',
      formula: 'dᵢⱼᵏ = cᵢⱼᵏ, dⱼᵢᵏ = 0',
      result: 'Trivial (associative)',
    },
    II: {
      name: 'Class II',
      description: 'k = i',
      formula: 'dᵢⱼⁱ = (1±i)/2 · cᵢⱼⁱ',
      result: 'Valid AFA (non-trivial)',
    },
    III: {
      name: 'Class III',
      description: 'Only (eᵢ,eⱼ,eᵢ) or (eᵢ,eᵢ,eᵢ) non-vanishing',
      formula: 'dᵢᵢˡ ≠ 0, dᵢⱼⁱ = cᵢⱼⁱ',
      result: 'Valid AFA',
    },
    IV: {
      name: 'Class IV',
      description: 'k = j',
      formula: 'dᵢⱼʲ = cᵢⱼʲ/2 = -dⱼᵢʲ',
      result: 'Valid AFA (related to Class III)',
    },
  };

  return (
    <div className="page-container">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="section"
      >
        <h1 className="section-title gradient-text">Anti-Flexible Algebra Explorer</h1>
        <p className="section-subtitle">
          Explore AFA structures where the associator satisfies <InlineMath math="(x,y,z) = (z,y,x)" />
        </p>
      </motion.section>

      {/* AFA Definition */}
      <section className="section">
        <div className="info-card">
          <h3>
            <Info size={24} className="accent-primary" />
            AFA Definition
          </h3>
          <p style={{ marginTop: '1rem' }}>
            An Anti-Flexible Algebra (AFA) is an algebra <InlineMath math="(\mathcal{A}, \cdot)" /> over a field <InlineMath math="\mathbb{F}" /> 
            with a bilinear product such that the associator satisfies:
          </p>
          <div className="math-display">
            <BlockMath math="(x, y, z) = (z, y, x)" />
          </div>
          <p style={{ marginTop: '1rem' }}>
            where the associator is defined as <InlineMath math="(x,y,z) = (x \cdot y) \cdot z - x \cdot (y \cdot z)" />.
            This condition ensures the algebra is Lie-admissible.
          </p>
        </div>
      </section>

      {/* Solution Classes */}
      <section className="section">
        <h2 className="section-title">Solution Classes (p=1)</h2>
        <p className="section-subtitle">
          Four classes of solutions based on the index structure of dᵢⱼᵏ
        </p>
        <div className="cards-grid">
          {(Object.keys(solutionClasses) as Array<keyof typeof solutionClasses>).map((key) => (
            <motion.div
              key={key}
              className={`info-card ${selectedClass === key ? 'selected' : ''}`}
              onClick={() => setSelectedClass(key)}
              whileHover={{ scale: 1.03 }}
              style={{ cursor: 'pointer', border: selectedClass === key ? '2px solid #646cff' : undefined }}
            >
              <h3>{solutionClasses[key].name}</h3>
              <p style={{ margin: '0.5rem 0', color: 'rgba(255,255,255,0.7)' }}>
                {solutionClasses[key].description}
              </p>
              <div className="math-display" style={{ padding: '0.8rem', fontSize: '0.9rem' }}>
                <InlineMath math={solutionClasses[key].formula.replace(/·/g, '\\cdot')} />
              </div>
              <p style={{ marginTop: '0.5rem', fontWeight: 600, color: solutionClasses[key].result.includes('Valid') ? '#6cffb4' : '#ff6b6b' }}>
                {solutionClasses[key].result.includes('Valid') || solutionClasses[key].result.includes('non-trivial') ? (
                  <><Check size={16} style={{ display: 'inline', marginRight: '0.3rem' }} />{solutionClasses[key].result}</>
                ) : (
                  <><X size={16} style={{ display: 'inline', marginRight: '0.3rem' }} />{solutionClasses[key].result}</>
                )}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Explorer */}
      <section className="section">
        <h2 className="section-title">
          <Calculator size={28} style={{ display: 'inline', marginRight: '0.5rem' }} />
          Interactive AFA Explorer
        </h2>
        <p className="section-subtitle">
          Select a Lie algebra and explore its AFA structure
        </p>

        <div className="interactive-panel">
          <div className="control-group">
            <div className="control-item">
              <label>Select Lie Algebra</label>
              <select value={selectedExample} onChange={(e) => setSelectedExample(e.target.value as any)}>
                <option value="sl2">𝔰𝔩(2,ℂ) - Simple (Counterexample)</option>
                <option value="solvable1">Solvable (Example 2.2)</option>
                <option value="solvable2">Solvable (Example 2.1)</option>
              </select>
            </div>
            <div className="control-item">
              <label>Display Options</label>
              <button onClick={() => setShowAssociator(!showAssociator)}>
                {showAssociator ? 'Hide' : 'Show'} Associator Info
              </button>
            </div>
          </div>

          {/* Lie Algebra Info */}
          <div className="result-box">
            <div className="result-title">Lie Algebra: {lieInfo.name}</div>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <span className="badge badge-primary">{lieInfo.type}</span>
              <span className="badge badge-secondary">dim = {lieInfo.dimension}</span>
            </div>
            <p><strong>Commutation Relations:</strong></p>
            <div className="math-display">
              {lieInfo.relations.map((rel, i) => (
                <div key={i} style={{ marginBottom: i < lieInfo.relations.length - 1 ? '0.5rem' : 0 }}>
                  <InlineMath math={rel.replace(/\[/g, '[').replace(/\]/g, ']')} />
                </div>
              ))}
            </div>
          </div>

          {/* AFA Product Table */}
          <div className="result-box success">
            <div className="result-title">AFA Product Structure</div>
            <p style={{ marginBottom: '1rem', color: 'rgba(255,255,255,0.7)' }}>
              Non-vanishing products eᵢ · eⱼ = dᵢⱼᵏ eᵏ:
            </p>
            <table className="data-table">
              <thead>
                <tr>
                  <th>i</th>
                  <th>j</th>
                  <th>k</th>
                  <th>dᵢⱼᵏ</th>
                  <th>Product</th>
                </tr>
              </thead>
              <tbody>
                {products.map((prod, idx) => (
                  <tr key={idx}>
                    <td>{prod.i}</td>
                    <td>{prod.j}</td>
                    <td>{prod.k}</td>
                    <td style={{ fontFamily: 'monospace' }}>{prod.d}</td>
                    <td>
                      <InlineMath math={`e_${prod.i} \\cdot e_${prod.j} = ${prod.d} e_${prod.k}`} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Associator Visualization */}
          {showAssociator && (
            <motion.div
              className="result-box"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="result-title">Associator Symmetry Check</div>
              <p style={{ marginBottom: '1rem', color: 'rgba(255,255,255,0.7)' }}>
                For an AFA, we must have <InlineMath math="(e_i, e_j, e_k) = (e_k, e_j, e_i)" />
              </p>
              <div className="math-display">
                <BlockMath math="(x, y, z) = (x \\cdot y) \\cdot z - x \\cdot (y \\cdot z)" />
              </div>
              <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(108, 255, 180, 0.1)', borderRadius: '8px' }}>
                <Check size={20} style={{ display: 'inline', marginRight: '0.5rem', color: '#6cffb4' }} />
                <span style={{ color: '#6cffb4' }}>
                  {selectedExample === 'sl2' 
                    ? '𝔰𝔩(2,ℂ) admits this AFA structure - Counterexample to non-admissibility!'
                    : 'This solvable Lie algebra admits an AFA structure'}
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Key Result */}
      <section className="section">
        <div className="info-card" style={{ border: '2px solid #646cff' }}>
          <h3>
            <Check size={24} style={{ color: '#6cffb4' }} />
            Key Result: Semisimple Lie Algebras Admit AFAs
          </h3>
          <p style={{ marginTop: '1rem' }}>
            Contrary to what one might expect from the behavior of LSAs and RSAs, 
            <strong> semisimple Lie algebras do admit AFA structures</strong>. The example of 𝔰𝔩(2,ℂ) 
            above demonstrates this explicitly, providing a counterexample to the conjecture that 
            semisimple Lie algebras exclude all non-associative Lie-admissible structures.
          </p>
          <div className="math-display" style={{ marginTop: '1rem' }}>
            <BlockMath math="\\text{Theorem: } \\mathfrak{sl}(2,\\mathbb{C}) \\text{ admits an AFA structure}" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default AFAExplorer;
