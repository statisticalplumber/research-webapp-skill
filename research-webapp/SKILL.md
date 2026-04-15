---
name: research-webapp
description: Transform research papers into elegant, interactive React Vite TypeScript web applications with narrative storytelling, 3D visualizations, and data-driven components. Use this when users want to convert PDF research papers into immersive web experiences, create paper visualizations, or build interactive academic content.
license: Complete terms in LICENSE.txt
---

This skill transforms research papers (typically provided as PDFs) into production-ready React Vite TypeScript web applications that tell the paper's story through interactive visualizations, 3D scenes, and elegant narrative design.

## INPUT

The user provides:
- A research paper (PDF file, URL, or text content)
- Optional: Specific focus areas, design preferences, or technical requirements

## OUTPUT

A complete React Vite application with:
- **Interactive narrative structure** - Scrolling sections that guide readers through the paper's key contributions
- **Custom visualizations** - Diagrams, charts, and interactive components that explain complex concepts
- **3D scenes** (when appropriate) - Three.js/React Three Fiber visualizations for scientific equipment, molecules, or abstract concepts
- **Data-driven components** - Performance charts, comparison graphs, and metric displays
- **Responsive design** - Mobile-friendly layouts with elegant typography and spacing
- **Author/paper metadata** - Proper attribution, citations, and links to original work

## WORKFLOW

### Phase 1: Paper Analysis & Structure

**1. Extract Key Information**
Read the research paper and identify:
- **Title, authors, affiliations** - For header and attribution
- **Abstract** - Core contribution summary
- **Key sections** - Introduction, Method, Results, Discussion
- **Figures/Tables** - Critical visualizations to recreate or enhance
- **Metrics/Results** - Performance data for interactive charts
- **Quotes** - Memorable statements for callout boxes

**2. Design the Narrative Arc**
Structure the web experience as a story:
```
Hero Section → Problem Statement → Solution/Method → Results → Impact → Authors → Citation
```

Each section should:
- Have a clear visual identity (background color, layout)
- Include interactive elements where appropriate
- Build on previous sections logically
- Use progressive disclosure (simple → complex)

**3. Choose Design Direction**
Based on the paper's domain, select an aesthetic:
- **Quantum/Physics**: Dark backgrounds, gold accents, particle effects, wave animations
- **Biology/Medicine**: Clean whites, organic shapes, soft greens/blues, cell-like structures
- **AI/ML**: Modern gradients, neural network visualizations, tech-forward aesthetics
- **Climate/Environmental**: Earth tones, natural gradients, data-heavy displays
- **Social Sciences**: Editorial layouts, typography-focused, citation-heavy

### Phase 2: Component Architecture

**Core Structure**
```
App.tsx           - Main application with navigation and section routing
components/
  ├── HeroScene.tsx     - 3D background or hero visualization
  ├── Diagrams.tsx      - Interactive 2D diagrams (surface codes, architectures, etc.)
  ├── Charts.tsx        - Performance metrics, comparison visualizations
  └── ImpactScene.tsx   - Domain-specific 3D visualization
types.ts          - TypeScript interfaces
```

**Section Types**

1. **Hero Section**
   - Full-screen impact with paper title
   - 3D background scene (Canvas/R3F)
   - Subtitle and key contribution
   - Scroll indicator

2. **Introduction/Problem**
   - Clean typography layout
   - Drop cap for first letter
   - Problem statement with visual emphasis
   - Context/motivation

3. **Method/Approach**
   - Interactive diagrams explaining the system
   - Step-by-step visual breakdowns
   - Animated architecture diagrams
   - Click/touch interactions for deeper understanding

4. **Results**
   - Interactive bar/line charts
   - Comparison toggles (baseline vs proposed)
   - Distance/parameter selectors
   - Real-time value displays

5. **Impact/Implications**
   - 3D visualization of application domain
   - Quote callouts from paper
   - Future directions
   - Real-world relevance

6. **Authors**
   - Card-based layout
   - Affiliation badges
   - Links to profiles/papers
   - Collaboration network (optional)

### Phase 3: Implementation

**Technical Stack**
- React 19+ with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Framer Motion for animations
- Lucide React for icons
- React Three Fiber + Drei for 3D
- Three.js for WebGL rendering

**File Structure**
```
research-visualization/
├── App.tsx              # Main app component
├── index.tsx            # Entry point
├── index.css            # Global styles + Tailwind
├── types.ts             # TypeScript interfaces
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript config
├── package.json         # Dependencies
├── index.html           # HTML entry point
├── metadata.json        # Skill metadata
├── .env.local           # API keys (if needed)
└── components/
    ├── HeroScene.tsx    # 3D hero background
    ├── Diagrams.tsx     # Interactive 2D diagrams
    └── ImpactScene.tsx  # Domain 3D visualization
```

**Design System**

Color palette (example - adjust per paper):
```css
/* Nobel/Academic Theme */
--nobel-gold: #C5A059;      /* Accent, highlights */
--stone-900: #1C1917;       /* Primary text */
--stone-600: #57534E;       /* Secondary text */
--stone-100: #F5F5F4;       /* Light backgrounds */
--white: #FFFFFF;           /* Cards, sections */
```

Typography:
- **Headings**: Serif font (font-serif) for academic elegance
- **Body**: Clean sans-serif or refined serif for readability
- **Code/Metrics**: Monospace for data displays

**Animation Principles**

---

### Tailwind CSS v4 Configuration (Critical)

When using Tailwind CSS v4 with Vite, you must configure PostCSS properly or CSS will not be applied:

**1. Install required dependencies:**
```bash
npm install -D tailwindcss postcss autoprefixer @tailwindcss/postcss
```

**2. Create `postcss.config.js`:**
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

**3. Update `vite.config.ts`:**
```typescript
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
})
```

**4. Update `src/index.css` syntax (Tailwind v4 uses new syntax):**
```css
/* OLD (v3) - Don't use */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* NEW (v4) - Use this instead */
@import "tailwindcss";
```

**5. Avoid `@apply` in CSS - use standard CSS instead:**
```css
/* OLD - @apply doesn't work well with v4 */
.card {
  @apply bg-stone-800/50 backdrop-blur-sm rounded-xl p-6;
}

/* NEW - Use standard CSS */
.card {
  background-color: rgba(41, 37, 36, 0.5);
  backdrop-filter: blur(4px);
  border-radius: 0.75rem;
  padding: 1.5rem;
}
```

**Common Error Messages:**
- "Unknown at rule: @tailwind" → Missing PostCSS config
- "Failed to load PostCSS config" → Need `@tailwindcss/postcss` package
- CSS not appearing → Check that PostCSS is configured in vite.config.ts

- **Scroll-triggered**: Sections animate into view
- **Hover states**: Interactive elements respond to cursor
- **Continuous motion**: Background scenes have subtle animation
- **Staggered reveals**: Lists/cards animate with delays
- **Smooth transitions**: All state changes are eased

### Phase 4: Interactive Components

**1. Surface Code / Grid Diagrams**
For papers with grid-based systems (quantum codes, cellular automata, etc.):
```tsx
- Clickable grid cells to inject "errors" or changes
- Real-time propagation visualization
- Color-coded states (stable vs active)
- Legend explaining symbols
```

**2. Architecture Flow Diagrams**
For ML/AI papers showing data flow:
```tsx
- Animated sequence showing input → processing → output
- Highlighted stages on hover
- Step-by-step progression (auto-play or manual)
- Labels explaining each component
```

**3. Performance Comparison Charts**
For results visualization:
```tsx
- Toggle between different metrics/distances
- Bar charts with animated transitions
- Baseline vs proposed method comparison
- Value labels with dynamic formatting
- Interactive parameter selection
```

**4. 3D Scientific Visualizations**
For domain-specific equipment or concepts:
```tsx
- Quantum computers (cryostats, chandeliers)
- Molecular structures
- Neural network architectures
- Abstract data representations
```

### Phase 5: Polish & Refinement

**Navigation**
- Fixed header with smooth scroll to sections
- Mobile hamburger menu
- Active section highlighting
- "View Paper" link to original DOI/arXiv

**Responsive Design**
- Mobile-first approach
- Stacked layouts on small screens
- Touch-friendly interactions
- Readable font sizes at all breakpoints

**Accessibility**
- Semantic HTML structure
- Alt text for visualizations
- Keyboard navigation support
- Sufficient color contrast

**Performance**
- Lazy load 3D scenes
- Optimize Three.js geometries
- Use React.memo for static components
- Defer non-critical animations

## EXAMPLE IMPLEMENTATION

**Sample Paper**: "Learning high-accuracy error decoding for quantum processors" (Nature, 2024)

**Resulting Structure**:
```tsx
<HeroScene />              // Floating quantum particles with wave torus
<Introduction />           // "The Noise Barrier" - problem statement
<SurfaceCodeDiagram />     // Interactive error detection demo
<TransformerDecoder />     // Animated architecture flow
<PerformanceChart />       // MWPM vs AlphaQubit comparison
<QuantumComputerScene />   // 3D cryostat visualization
<Authors />                // Contributor cards
```

**Key Interactions**:
- Click data qubits to see error propagation
- Toggle chart distances (3, 5, 11)
- Auto-animating architecture diagram
- Floating 3D quantum computer

## DESIGN PHILOSOPHY

**Academic Elegance**
- Respect the research - don't oversimplify
- Maintain scientific accuracy while adding engagement
- Use interactivity to enhance understanding, not distract
- Citation and attribution are prominent

**Visual Hierarchy**
1. Paper title and contribution (hero)
2. Problem motivation (why this matters)
3. Core innovation (what's new)
4. Evidence (results, charts)
5. Implications (so what?)
6. Credit (authors, citation)

**Interactive Purpose**
Every interactive element should:
- Clarify a complex concept
- Demonstrate a mechanism
- Compare results dynamically
- Engage without overwhelming

## TECHNICAL REQUIREMENTS

**Dependencies** (package.json):
```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "@react-three/fiber": "^9.4.0",
  "@react-three/drei": "^10.7.7",
  "three": "^0.181.1",
  "framer-motion": "^12.23.24",
  "lucide-react": "^0.553.0",
  "vite": "^6.2.0",
  "@vitejs/plugin-react": "^5.0.0",
  "typescript": "~5.8.2"
}
```

**Vite Config**:
- React plugin enabled
- Port 3000 for development
- Alias '@' to project root
- Environment variable support

**TypeScript**:
- Strict mode enabled
- React types configured
- Path aliases set up

## CRAFTSMANSHIP STANDARDS

**Code Quality**:
- Clean, readable component structure
- Consistent naming conventions
- Proper TypeScript typing
- Comments for complex logic (not obvious code)
- SPDX license headers where appropriate

**Visual Quality**:
- Pixel-perfect spacing and alignment
- Consistent color usage
- Smooth animations (60fps)
- No visual artifacts or glitches
- Professional polish throughout

**Content Accuracy**:
- Faithful representation of paper claims
- Accurate data in charts
- Proper author names and affiliations
- Correct citations and links

## USAGE INSTRUCTIONS

When a user provides a research paper:

1. **Read and analyze** the paper thoroughly
2. **Extract** title, authors, abstract, key sections, figures, results
3. **Design** the narrative arc and visual theme
4. **Create** the full React Vite application structure
5. **Implement** interactive components for key concepts
6. **Build** 3D scenes where they add value
7. **Polish** typography, spacing, and animations
8. **Test** all interactions and responsive layouts

**Output**: Complete, runnable React Vite application that transforms the static paper into an engaging, interactive narrative experience.

## REMEMBER

- **Start from the paper** - let the research drive design decisions
- **Interactivity serves understanding** - don't add gimmicks
- **Academic rigor matters** - maintain accuracy and proper attribution
- **Elegance over flashiness** - refined, professional aesthetics
- **Mobile-friendly** - responsive by default
- **Performance conscious** - optimize 3D and animations

This skill transforms dense academic papers into accessible, engaging web experiences without sacrificing scientific integrity.
