# Pre-Lie Structures for Semisimple Lie Algebras - Research Web App

An interactive research explorer for exploring Pre-Lie structures and Lie-admissible algebras based on the paper by Xerxes D. Arsiwalla and Fernando Olivie Méndez Méndez.

## Features

### 🎨 Interactive Visualizations
- **Hero section** with animated particle system visualization
- **AFA visualization** showing anti-flexible algebra symmetry
- **Main visualization canvas** with multiple modes:
  - Associator visualization
  - Structure diagram
  - Comparison view

### 🧮 AFA Calculator
- Interactive bilinear product matrix input
- Real-time validation of Anti-Flexible Algebra conditions
- Support for 2D, 3D, and 4D algebras
- Displays associator computations and violations

### 📚 Educational Content
- Overview of Lie-admissible algebras
- Detailed Anti-Flexible Algebra (AFA) definitions and properties
- Examples from the paper with interactive controls
- Comparison table of different pre-Lie structure types
- Key theorems and proofs

### 📖 Examples Included
1. **3D Solvable Lie Algebra** (Example 2.1)
2. **𝔰𝔩(2,ℂ) Counterexample** (Example 5.1)
3. **A₃-Associative Quandle** (Example 4.1)

## Getting Started

### View in Browser

Simply open `index.html` in any modern web browser:

```bash
# Option 1: Using Python's built-in server
cd /home/xyane/project/tmp/qwen_skill/paper13
python3 -m http.server 8080

# Then open in browser:
# http://localhost:8080
```

### Direct File Access

Open `index.html` directly in your browser.

## Sections

### Overview
- Introduction to Lie-admissible algebras
- Pre-Lie structures and their geometric connections
- Key concepts and terminology

### Anti-Flexible Algebras (AFAs)
- Definition: Associator symmetry (x, y, z) = (z, y, x)
- Properties: Self-opposite, Lie-admissible, non-commutative/non-anticommutative
- Counterexamples showing semisimple Lie algebras can admit AFAs

### Calculator
- Test your own bilinear products
- Check AFA conditions
- View associator computations

### Examples
- Interactive exploration of examples from the paper
- View products and associated Lie brackets
- Understand the geometric implications

### Comparison
- Side-by-side comparison of algebra types:
  - Associative
  - Left-Symmetric (LSA)
  - Anti-Flexible (AFA)
  - A₃-Associative
  - S₃-Associative

### Theorems
- Key results from the paper
- Theorem 5.1: S₃-associative algebras as universal pre-Lie structures
- Proposition 2.2: Relationship between LSA, RSA, and AFA
- Corollaries about semisimple Lie algebras

## Mathematical Background

### The Associator
For any algebra (𝒜, ⋅), the associator is:
```
(x, y, z) = (x⋅y)⋅z - x⋅(y⋅z)
```

### The Akivis Identity
```
[x₁,[x₂,x₃]] + [x₂,[x₃,x₁]] + [x₃,[x₁,x₂]] = ∑_{σ∈S₃} sgn(σ)(xσ(1),xσ(2),xσ(3))
```

### Pre-Lie Structure
A bilinear product ⋅ is a pre-Lie structure if its commutator [x,y] = x⋅y - y⋅x defines a Lie algebra.

## Key Findings from the Paper

1. **AFAs are self-opposite**: Unlike LSAs and RSAs, AFAs are invariant under swapping the product.

2. **Semisimple Lie algebras CAN admit AFAs**: Counterexample provided for 𝔰𝔩(2,ℂ).

3. **S₃-associative algebras are universal**: They serve as pre-Lie structures for ALL Lie algebras over ℂ.

4. **Geometric richness**: AFAs correspond to richer geometric structures than flat torsion-free affine connections.

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Technologies Used

- HTML5
- CSS3 with CSS Grid and Flexbox
- Vanilla JavaScript (ES6+)
- HTML5 Canvas for visualizations
- No external dependencies

## License

This web app is created for educational and research purposes based on:

> Arsiwalla, X. D., & Méndez Méndez, F. O. (Year). Pre-Lie Structures for Semisimple Lie Algebras. Wolfram Institute for Computational Foundations of Science & University of Leeds.

## Contributing

Feel free to enhance the app with:
- Additional examples
- More visualization modes
- Interactive theorem proofs
- Exercise problems with solutions

---

Built with ❤️ for the study of Nonassociative Algebras and Lie Theory.
