import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sigma, Network, Lightbulb, BookOpen, ArrowRight, Zap, Layers, GitBranch } from 'lucide-react';

const features = [
  {
    icon: Sigma,
    title: 'Anti-Flexible Algebras',
    description: 'Explore AFAs where the associator satisfies (x,y,z) = (z,y,x). Discover how semisimple Lie algebras can admit AFA structures.',
    link: '/afa',
    color: '#646cff',
  },
  {
    icon: Network,
    title: 'Lie Algebra Explorer',
    description: 'Visualize structure constants and compute pre-algebraic structures for various Lie algebras including sl(2,ℂ).',
    link: '/lie-algebra',
    color: '#d46cff',
  },
  {
    icon: Lightbulb,
    title: 'S₃-Associative Algebras',
    description: 'Discover universal pre-Lie structures. Every Lie algebra over ℂ admits an S₃-associative structure.',
    link: '/s3-associative',
    color: '#6cffff',
  },
  {
    icon: BookOpen,
    title: 'Paper Summary',
    description: 'Key findings, theorems, and conclusions from the research on pre-Lie structures for semisimple Lie algebras.',
    link: '/summary',
    color: '#6cffb4',
  },
];

const lieAdmissibleClasses = [
  { name: 'LSA', fullName: 'Left-Symmetric Algebra', permutation: '(1 2)', admissible: 'Solvable only', color: '#ff6b6b' },
  { name: 'RSA', fullName: 'Right-Symmetric Algebra', permutation: '(2 3)', admissible: 'Solvable only', color: '#feca57' },
  { name: 'AFA', fullName: 'Anti-Flexible Algebra', permutation: '(1 3)', admissible: 'All Lie algebras', color: '#54a0ff' },
  { name: 'A₃', fullName: 'A₃-Associative', permutation: 'A₃ subgroup', admissible: 'All Lie algebras', color: '#5f27cd' },
  { name: 'S₃', fullName: 'S₃-Associative', permutation: 'Full S₃', admissible: 'Universal', color: '#00d2d3' },
  { name: 'Assoc', fullName: 'Associative', permutation: 'Identity', admissible: 'All Lie algebras', color: '#1dd1a1' },
];

function HomePage() {
  return (
    <div className="page-container">
      {/* Hero Section */}
      <motion.section
        className="hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Pre-Lie Structures for Semisimple Lie Algebras</h1>
        <p>
          An interactive exploration of Lie-admissible algebras, including the surprising discovery 
          that semisimple Lie algebras admit Anti-Flexible Algebra structures and universal S₃-associative structures.
        </p>
        <div className="hero-buttons">
          <Link to="/afa">
            <button className="btn-primary">
              Explore AFAs <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
            </button>
          </Link>
          <Link to="/summary">
            <button className="btn-secondary">
              Read Summary
            </button>
          </Link>
        </div>
      </motion.section>

      {/* Key Features */}
      <section className="section">
        <h2 className="section-title">Explore the Research</h2>
        <p className="section-subtitle">
          Interactive visualizations and computational tools for understanding Lie-admissible algebras
        </p>
        <div className="cards-grid">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="info-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <h3>
                  <Icon size={24} style={{ color: feature.color }} />
                  {feature.title}
                </h3>
                <p>{feature.description}</p>
                <Link to={feature.link} className="card-link" style={{ marginTop: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: feature.color }}>
                  Explore <ArrowRight size={16} />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Six Lie-Admissible Classes */}
      <section className="section">
        <h2 className="section-title">Six Classes of Lie-Admissible Algebras</h2>
        <p className="section-subtitle">
          Each class corresponds to a subgroup of S₃ acting on the associator
        </p>
        <div className="visualization-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Class</th>
                <th>Full Name</th>
                <th>Permutation</th>
                <th>Admissibility</th>
              </tr>
            </thead>
            <tbody>
              {lieAdmissibleClasses.map((cls) => (
                <motion.tr
                  key={cls.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <td>
                    <span className="badge" style={{ background: `${cls.color}20`, color: cls.color }}>
                      {cls.name}
                    </span>
                  </td>
                  <td>{cls.fullName}</td>
                  <td style={{ fontFamily: 'monospace' }}>{cls.permutation}</td>
                  <td>{cls.admissible}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Key Insights */}
      <section className="section">
        <h2 className="section-title">Key Insights</h2>
        <div className="cards-grid">
          <motion.div
            className="info-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h3>
              <Zap size={24} style={{ color: '#feca57' }} />
              Counterexample Found
            </h3>
            <p>
              Contrary to expectations, semisimple Lie algebras <strong>do admit</strong> AFA structures. 
              The paper provides an explicit counterexample for 𝔰𝔩(2,ℂ).
            </p>
          </motion.div>

          <motion.div
            className="info-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h3>
              <Layers size={24} style={{ color: '#6cffff' }} />
              Universal Structure
            </h3>
            <p>
              <strong>Theorem:</strong> S₃-associative algebras are universal pre-Lie structures for 
              <em>all</em> Lie algebras over ℂ, including semisimple ones.
            </p>
          </motion.div>

          <motion.div
            className="info-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h3>
              <GitBranch size={24} style={{ color: '#6cffb4' }} />
              Geometric Interpretation
            </h3>
            <p>
              AFAs correspond to richer geometric structures than flat torsion-free connections, 
              with matching curvature tensors for two connections.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
