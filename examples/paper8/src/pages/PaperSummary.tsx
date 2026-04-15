import { motion } from 'framer-motion';
import { InlineMath, BlockMath } from 'react-katex';
import { BookOpen, Target, Lightbulb, Award, FileText, Quote } from 'lucide-react';

const keyFindings = [
  {
    icon: Target,
    title: 'Main Problem',
    content: 'Address the admissibility of pre-Lie structures for semisimple Lie algebras over ℂ.',
  },
  {
    icon: Lightbulb,
    title: 'Key Discovery',
    content: 'Semisimple Lie algebras DO admit AFA structures, contrary to expectations from LSA/RSA non-admissibility.',
  },
  {
    icon: Award,
    title: 'Main Theorem',
    content: 'S₃-associative algebras are universal pre-Lie structures for ALL Lie algebras over ℂ.',
  },
];

const algebraComparison = [
  { class: 'LSA', name: 'Left-Symmetric', condition: '(x,y,z) = (y,x,z)', semisimple: false, solvable: true },
  { class: 'RSA', name: 'Right-Symmetric', condition: '(x,y,z) = (x,z,y)', semisimple: false, solvable: true },
  { class: 'AFA', name: 'Anti-Flexible', condition: '(x,y,z) = (z,y,x)', semisimple: true, solvable: true },
  { class: 'A₃', name: 'A₃-Associative', condition: 'Σ(A₃) = 0', semisimple: true, solvable: true },
  { class: 'S₃', name: 'S₃-Associative', condition: 'Σ(S₃) = 0', semisimple: true, solvable: true },
  { class: 'Assoc', name: 'Associative', condition: '(x,y,z) = 0', semisimple: true, solvable: true },
];

const sections = [
  {
    title: 'Introduction',
    content: 'Lie-admissible algebras include five classes of nonassociative algebras plus associative algebras, all corresponding to subgroups of S₃. Pre-Lie structures are closely related to affine structures on manifolds associated with Lie groups.',
  },
  {
    title: 'Anti-Flexible Algebras (Section 2)',
    content: 'AFAs satisfy (x,y,z) = (z,y,x). They are their own opposite algebras (unlike LSA/RSA which are mutually opposite). Geometrically, AFAs correspond to richer structures than flat torsion-free connections, with matching curvature tensors for two connections.',
  },
  {
    title: 'Lie-Admissibility Criteria (Section 3)',
    content: 'Four solution classes (I-IV) are identified for projection order p=1. Class I yields trivial solutions. Classes II, III, and IV provide non-trivial AFA structures. Solvable Lie algebras admit AFAs through these solution classes.',
  },
  {
    title: 'A₃ and S₃ Associativity (Section 4)',
    content: 'A₃-associative algebras satisfy the first Bianchi identity geometrically. S₃-associative algebras subsume all other classes. Examples include dihedral quandles and cross-product algebras.',
  },
  {
    title: 'Semisimple Lie Algebras (Section 5)',
    content: 'The paper provides an explicit counterexample: 𝔰𝔩(2,ℂ) admits an AFA structure constructed from its grading. The paper also shows 𝔰𝔲(2) admits both A₃ and S₃-associative structures.',
  },
  {
    title: 'Conclusions (Section 6)',
    content: 'Semisimple Lie algebras (n≥3) exclude only LSA and RSA structures. The S₃ group action suggests potential gauge transformations on non-commutative group manifold geometries.',
  },
];

function PaperSummary() {
  return (
    <div className="page-container">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="section"
      >
        <div className="hero" style={{ padding: '2rem 0' }}>
          <h1 className="gradient-text" style={{ fontSize: '2.5rem' }}>
            Paper Summary
          </h1>
          <p style={{ fontSize: '1.1rem', marginTop: '1rem' }}>
            Pre-Lie Structures for Semisimple Lie Algebras
          </p>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
            Xerxes D. Arsiwalla¹, Fernando Olivie Méndez Méndez²
          </p>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>
            ¹Wolfram Institute for Computational Foundations of Science, USA<br />
            ²University of Leeds, UK
          </p>
        </div>
      </motion.section>

      {/* Abstract */}
      <section className="section">
        <div className="info-card" style={{ border: '2px solid #646cff' }}>
          <h3>
            <FileText size={24} className="accent-primary" />
            Abstract
          </h3>
          <div style={{ marginTop: '1rem', lineHeight: 1.8 }}>
            <p>
              We address the problem of admissibility of pre-Lie structures associated with a given Lie algebra, 
              particularly, <strong>semisimple Lie algebras over ℂ</strong>.
            </p>
            <p style={{ marginTop: '0.5rem' }}>
              Among the five classes of nonassociative Lie-admissible algebras, <strong>LSAs and RSAs are known to be 
              non-admissible</strong> by semisimple Lie algebras of finite dimension n ≥ 3.
            </p>
            <p style={{ marginTop: '0.5rem' }}>
              Here, we examine the remaining classes, particularly <strong>Anti-Flexible Algebras (AFAs)</strong>. 
              We report an explicit <strong>counterexample demonstrating an AFA admissible by 𝔰𝔩(2,ℂ)</strong>.
            </p>
            <p style={{ marginTop: '0.5rem' }}>
              Finally, we <strong>prove that S₃-associative algebras are universal pre-Lie structures</strong> for 
              any Lie algebra over ℂ, including semisimple ones.
            </p>
          </div>
        </div>
      </section>

      {/* Key Findings */}
      <section className="section">
        <h2 className="section-title">Key Findings</h2>
        <div className="cards-grid">
          {keyFindings.map((finding, index) => {
            const Icon = finding.icon;
            return (
              <motion.div
                key={finding.title}
                className="info-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h3>
                  <Icon size={24} style={{ color: index === 0 ? '#646cff' : index === 1 ? '#6cffb4' : '#6cffff' }} />
                  {finding.title}
                </h3>
                <p style={{ marginTop: '0.5rem' }}>{finding.content}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Algebra Comparison Table */}
      <section className="section">
        <h2 className="section-title">Admissibility by Algebra Type</h2>
        <p className="section-subtitle">
          Which pre-Lie structures are admitted by different Lie algebra classes?
        </p>
        <div className="visualization-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Class</th>
                <th>Name</th>
                <th>Condition</th>
                <th>Semisimple</th>
                <th>Solvable</th>
              </tr>
            </thead>
            <tbody>
              {algebraComparison.map((alg) => (
                <motion.tr
                  key={alg.class}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <td>
                    <span className="badge" style={{ 
                      background: alg.class === 'S₃' ? 'rgba(108, 255, 255, 0.2)' :
                                 alg.class === 'AFA' ? 'rgba(100, 108, 255, 0.2)' :
                                 alg.class === 'A₃' ? 'rgba(95, 39, 205, 0.2)' :
                                 alg.class === 'Assoc' ? 'rgba(29, 209, 161, 0.2)' :
                                 'rgba(255, 107, 107, 0.2)',
                      color: alg.class === 'S₃' ? '#6cffff' :
                             alg.class === 'AFA' ? '#646cff' :
                             alg.class === 'A₃' ? '#a29bfe' :
                             alg.class === 'Assoc' ? '#1dd1a1' :
                             '#ff6b6b'
                    }}>
                      {alg.class}
                    </span>
                  </td>
                  <td>{alg.name}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
                    <InlineMath math={alg.condition} />
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {alg.semisimple ? (
                      <span style={{ color: '#6cffb4' }}>✓ Yes</span>
                    ) : (
                      <span style={{ color: '#ff6b6b' }}>✗ No (n≥3)</span>
                    )}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span style={{ color: '#6cffb4' }}>✓ Yes</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Paper Sections */}
      <section className="section">
        <h2 className="section-title">Paper Structure</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              className="info-card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <h3>
                <BookOpen size={20} className="accent-primary" />
                Section {index + 1}: {section.title}
              </h3>
              <p style={{ marginTop: '0.5rem', color: 'rgba(255,255,255,0.7)' }}>
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Theorem */}
      <section className="section">
        <div className="info-card" style={{ border: '3px solid #6cffff', background: 'linear-gradient(135deg, rgba(108, 255, 255, 0.05), rgba(100, 108, 255, 0.05))' }}>
          <h3>
            <Award size={24} style={{ color: '#6cffff' }} />
            Main Theorem (Theorem 5.1)
          </h3>
          <div className="math-display" style={{ marginTop: '1rem' }}>
            <BlockMath math="\text{Theorem: } S_3\text{-associative algebras realize universal pre-Lie structures for all Lie algebras over } \mathbb{C}" />
          </div>
          <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(108, 255, 255, 0.1)', borderRadius: '8px' }}>
            <p style={{ color: '#6cffff' }}>
              <strong>Implication:</strong> Every Lie algebra—including all semisimple ones—admits an S₃-associative 
              pre-Lie structure. The only structures excluded by semisimple Lie algebras (for n ≥ 3) are LSAs and RSAs.
            </p>
          </div>
        </div>
      </section>

      {/* Counterexample */}
      <section className="section">
        <h2 className="section-title">Counterexample: 𝔰𝔩(2,ℂ) admits AFA</h2>
        <div className="info-card">
          <p>
            The paper constructs an explicit AFA structure on <strong>𝔰𝔩(2,ℂ)</strong> using its grading:
          </p>
          <div className="math-display" style={{ marginTop: '1rem' }}>
            <BlockMath math="\mathfrak{g} = \mathfrak{g}_{-1} \oplus \mathfrak{g}_0 \oplus \mathfrak{g}_1" />
          </div>
          <p style={{ marginTop: '1rem' }}>where:</p>
          <div className="math-display">
            <BlockMath math="\mathfrak{g}_{-1} = \langle F \rangle, \quad \mathfrak{g}_0 = \langle H \rangle, \quad \mathfrak{g}_1 = \langle E \rangle" />
          </div>
          <p style={{ marginTop: '1rem' }}>The AFA product is defined by:</p>
          <div className="math-display">
            <BlockMath math="\begin{aligned}
              E \cdot F &= H \\
              F \cdot H &= 2F \\
              H \cdot E &= 2E \\
              H \cdot H &= 2H
            \end{aligned}" />
          </div>
          <p style={{ marginTop: '1rem' }}>
            with all other products determined by the grading condition and AFA symmetry.
          </p>
          <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(108, 255, 180, 0.1)', borderRadius: '8px' }}>
            <span style={{ color: '#6cffb4' }}>
              ✓ This provides the first explicit example of an AFA admissible by a simple Lie algebra!
            </span>
          </div>
        </div>
      </section>

      {/* Geometric Interpretation */}
      <section className="section">
        <h2 className="section-title">Geometric Interpretation</h2>
        <div className="cards-grid">
          <motion.div
            className="info-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h3>
              <Quote size={24} className="accent-primary" />
              LSA/RSA Geometry
            </h3>
            <p style={{ marginTop: '0.5rem' }}>
              LSAs correspond to flat torsion-free left-invariant affine structures on manifolds.
              RSAs are the opposite algebras with similar geometric interpretation.
            </p>
          </motion.div>

          <motion.div
            className="info-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h3>
              <Quote size={24} className="accent-secondary" />
              AFA Geometry
            </h3>
            <p style={{ marginTop: '0.5rem' }}>
              AFAs correspond to <strong>richer structures</strong> than flat torsion-free connections.
              They admit two connections ∇ and ∇̃ with non-vanishing curvature, such that curvature tensors match.
            </p>
          </motion.div>

          <motion.div
            className="info-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3>
              <Quote size={24} className="accent-tertiary" />
              A₃ Geometry
            </h3>
            <p style={{ marginTop: '0.5rem' }}>
              A₃-associativity corresponds to the <strong>first Bianchi identity</strong>:
            </p>
            <div className="math-display" style={{ padding: '0.8rem', marginTop: '0.5rem' }}>
              <BlockMath math="\mathcal{R}(x,y)z + \mathcal{R}(y,z)x + \mathcal{R}(z,x)y = 0" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Future Directions */}
      <section className="section">
        <h2 className="section-title">Future Directions</h2>
        <div className="info-card">
          <ul style={{ lineHeight: 2, marginLeft: '1.5rem' }}>
            <li>
              <strong>Gauge Theory Connection:</strong> The S₃ group action suggests potential gauge transformations 
              on non-commutative group manifold geometries.
            </li>
            <li>
              <strong>Noncommutative Rings:</strong> Extension to Lie algebras over noncommutative rings 
              (following Berenstein and Retakh).
            </li>
            <li>
              <strong>Complete Classification:</strong> Full classification of all pre-Lie structures admissible 
              by a given Lie algebra.
            </li>
            <li>
              <strong>Geometric Applications:</strong> Further exploration of the geometric meaning of 
              semisimple Lie groups admitting only non-flat torsion-free connections.
            </li>
          </ul>
        </div>
      </section>

      {/* Conclusion */}
      <section className="section">
        <div className="info-card" style={{ border: '2px solid #6cffb4' }}>
          <h3>
            <Lightbulb size={24} style={{ color: '#6cffb4' }} />
            Conclusion
          </h3>
          <p style={{ marginTop: '1rem', lineHeight: 1.8 }}>
            This work fundamentally changes our understanding of pre-Lie structures on semisimple Lie algebras. 
            While LSAs and RSAs are excluded (for n ≥ 3), the paper demonstrates that <strong>AFAs, A₃-associative, 
            and S₃-associative structures are all admissible</strong>. The universality of S₃-associative algebras 
            provides a complete answer: every Lie algebra over ℂ admits at least one pre-Lie structure.
          </p>
          <div className="math-display" style={{ marginTop: '1rem' }}>
            <BlockMath math="\boxed{\text{Semisimple Lie algebras admit pre-Lie structures: AFA, A}_3\text{, S}_3\text{ (but not LSA/RSA)}}" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default PaperSummary;
