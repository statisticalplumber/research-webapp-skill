# Pre-Lie Structures for Semisimple Lie Algebras - Research Visualization

An interactive web application visualizing the research paper "Pre-Lie Structures for Semisimple Lie Algebras" by Xerxes D. Arsiwalla and Fernando Olivie Méndez Méndez.

## Overview

This research webapp transforms the academic paper into an engaging, interactive narrative experience featuring:

- **3D Visualizations**: Three.js and React Three Fiber scenes depicting algebraic structures
- **Interactive Components**: Framer Motion animations and user interactions
- **Responsive Design**: Mobile-friendly layout with Tailwind CSS
- **Academic Elegance**: Professional styling with gold accents and dark theme

## Features

### Sections

1. **Hero Scene** - 3D visualization with floating algebraic structures and particles
2. **The Problem** - Overview of the research problem and known limitations
3. **Pre-Lie Structures** - Detailed explanation of the five classes of Lie-admissible algebras
4. **Anti-Flexible Algebras (AFA)** - Interactive 3D scene showing AFA properties
5. **Key Results** - Summary of findings with success/failure indicators
6. **Authors** - Author information and acknowledgments

### Technical Stack

- **React 19** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS v4** for styling
- **React Three Fiber** + **Drei** for 3D visualizations
- **Framer Motion** for animations
- **Lucide React** for icons

## Getting Started

### Development

```bash
npm install
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```
research-webapp/
├── src/
│   ├── components/
│   │   ├── AFAScene.tsx        # 3D visualization for Anti-Flexible Algebras
│   │   ├── AuthorsSection.tsx  # Authors and acknowledgments
│   │   ├── Footer.tsx          # Footer component
│   │   ├── HeroScene.tsx       # Main 3D hero scene
│   │   ├── Navigation.tsx      # Navigation bar with scroll detection
│   │   ├── ProblemSection.tsx  # Problem statement section
│   │   ├── ResultsSection.tsx  # Key results summary
│   │   └── StructuresSection.tsx # Pre-Lie structures overview
│   ├── App.tsx                 # Main application component
│   ├── index.css               # Global styles with Tailwind
│   ├── main.tsx                # Entry point
│   └── types.ts                # TypeScript types and constants
├── index.html
├── package.json
├── postcss.config.js
├── tsconfig.json
└── vite.config.ts
```

## Research Paper Information

**Title**: Pre-Lie Structures for Semisimple Lie Algebras  
**Authors**: 
- Xerxes D. Arsiwalla (Wolfram Institute for Computational Foundations of Science, USA)
- Fernando Olivie Méndez Méndez (University of Leeds, UK)

**Key Findings**:
- Semisimple Lie algebras admit Anti-Flexible Algebras (AFAs) - contrary to expectations
- A₃-associative and S₃-associative algebras are admissible
- S₃-associative algebras are universal pre-Lie structures for all Lie algebras over ℂ
- Only LSAs and RSAs are excluded for semisimple Lie algebras with n ≥ 3

## License

This visualization is created for educational purposes based on the research paper.
