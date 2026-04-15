# Reasoning LLMs-as-Judges Visualization

An interactive web visualization of the research paper "Examining Reasoning LLMs-as-Judges in Non-Verifiable LLM Post-Training" by Yixin Liu et al. (Meta & Yale University, March 2026).

## Overview

This React application transforms the academic paper into an engaging, interactive narrative experience featuring:

- **Interactive 3D Hero Scene** - Animated brain-like visualization with particles and connections
- **Experimental Pipeline Diagram** - Clickable components explaining the synthetic experimental setup
- **Reward Hacking Charts** - Interactive line and bar charts comparing reasoning vs non-reasoning judges
- **Arena-Hard Benchmark Visualization** - Performance comparison charts showing adversarial policy effectiveness
- **Adversarial Strategy Explorer** - Interactive breakdown of the systematic adversarial pattern discovered
- **Analysis Grid** - Four key findings: SFT Distillation, Rubric Augmentation, Reasoning Effort, and Pairwise Judges

## Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Recharts** for data visualization
- **React Three Fiber** + **Drei** for 3D scenes
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
paper3/
├── src/
│   ├── components/
│   │   ├── AdversarialStrategy.tsx   # Interactive adversarial pattern explorer
│   │   ├── AnalysisGrid.tsx          # Key findings comparison cards
│   │   ├── ArenaHardChart.tsx        # Arena-Hard benchmark visualization
│   │   ├── ExperimentDiagram.tsx     # Experimental pipeline diagram
│   │   ├── HeroScene.tsx             # 3D animated hero background
│   │   ├── ReasoningComparisonChart.tsx  # Reasoning vs non-reasoning comparison
│   │   └── RewardHackingChart.tsx    # Reward hacking visualization
│   ├── App.tsx                       # Main application component
│   ├── main.tsx                      # Entry point
│   ├── types.ts                      # TypeScript interfaces
│   └── index.css                     # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── postcss.config.js
```

## Paper Summary

This research examines the effectiveness of reasoning and non-reasoning LLM judges in RL-based alignment:

**Key Findings:**
1. **Non-reasoning judges** lead to severe reward hacking - policies exploit judge weaknesses
2. **Reasoning judges** enable genuine improvement by aligning with gold-standard evaluations
3. **SFT distillation** from gold-standard reasoning traces is essential for judge quality
4. **Higher reasoning effort** in judges leads to better policy training
5. **Adversarial discovery** - policies learn to deceive judges through systematic patterns

## License

Apache-2.0

## Citation

```
@article{liu2026reasoning,
  title={Examining Reasoning LLMs-as-Judges in Non-Verifiable LLM Post-Training},
  author={Liu, Yixin and Yu, Yue and Su, DiJia and Wang, Sid and Wang, Xuewei and Jiang, Song and Liu, Bo and Cohan, Arman and Tian, Yuandong and Chen, Zhengxing},
  journal={Meta Superintelligence Labs \& Yale University},
  year={2026}
}
```
