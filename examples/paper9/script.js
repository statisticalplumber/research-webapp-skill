// Pre-Lie Structures Research Explorer
// Interactive visualization and calculator for Lie-admissible algebras

// ==================== STATE MANAGEMENT ====================
const state = {
    dimension: 3,
    algebraType: 'LSA',
    visualizationMode: 'associator',
    productMatrix: []
};

// ==================== CANVAS VISUALIZATIONS ====================

function initCanvases() {
    initHeroCanvas();
    initAFAVisualization();
    initMainCanvas();
}

function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    const ctx = canvas.getContext('2d');
    resizeCanvas(canvas, 500, 500);
    
    let time = 0;
    const particles = [];
    
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 3 + 1,
            color: `hsla(${Math.random() * 60 + 240}, 70%, 60%, ${Math.random() * 0.5 + 0.3})`
        });
    }
    
    function animate() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        time += 0.01;
        
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            
            // Wave motion
            const waveX = Math.sin(time + p.x * 0.01) * 10;
            const waveY = Math.cos(time + p.y * 0.01) * 10;
            
            p.x += waveX * 0.1;
            p.y += waveY * 0.1;
            
            // Boundary
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });
        
        // Draw connections
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 0.5;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 80) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    function resizeCanvas(canvas, w, h) {
        const parent = canvas.parentElement;
        const maxWidth = parent.clientWidth * 0.8;
        const maxHeight = parent.clientHeight * 0.6;
        canvas.width = Math.min(w, maxWidth);
        canvas.height = Math.min(h, maxHeight);
    }
    
    window.addEventListener('resize', () => resizeCanvas(canvas, 500, 500));
}

function initAFAVisualization() {
    const canvas = document.getElementById('afaCanvas');
    const ctx = canvas.getContext('2d');
    resizeCanvas(canvas, 400, 300);
    
    let time = 0;
    const nodes = [];
    
    for (let i = 0; i < 9; i++) {
        nodes.push({
            x: 0,
            y: 0,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: 8
        });
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(248, 250, 252, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 80;
        
        time += 0.02;
        
        nodes.forEach((node, i) => {
            const angle = (i / nodes.length) * Math.PI * 2 + Math.sin(time + i * 0.3) * 0.2;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            node.x = x;
            node.y = y;
            
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, Math.PI * 2);
            ctx.fillStyle = i % 2 === 0 ? '#6366f1' : '#ec4899';
            ctx.fill();
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
            ctx.stroke();
        });
        
        // Draw connections showing symmetry
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.3)';
        ctx.lineWidth = 1;
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }
        
        // Draw center
        ctx.beginPath();
        ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#fbbf24';
        ctx.fill();
        
        requestAnimationFrame(draw);
    }
    
    draw();
    
    function resizeCanvas(canvas, w, h) {
        const parent = canvas.parentElement;
        canvas.width = parent.clientWidth - 2;
        canvas.height = 300;
    }
    
    window.addEventListener('resize', () => resizeCanvas(canvas, 400, 300));
}

function initMainCanvas() {
    const canvas = document.getElementById('mainCanvas');
    const ctx = canvas.getContext('2d');
    resizeMainCanvas(canvas);
    
    let time = 0;
    let particles = [];
    
    function resizeMainCanvas(canvas) {
        const parent = canvas.parentElement;
        canvas.width = parent.clientWidth - 2;
        canvas.height = 500;
    }
    
    function createParticles() {
        particles = [];
        const cols = state.dimension;
        const rows = state.dimension;
        const cellWidth = canvas.width / cols;
        const cellHeight = canvas.height / rows;
        
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                particles.push({
                    x: i * cellWidth + cellWidth / 2,
                    y: j * cellHeight + cellHeight / 2,
                    vx: (Math.random() - 0.5) * 2,
                    vy: (Math.random() - 0.5) * 2,
                    color: `hsla(${Math.random() * 360}, 70%, 60%, 0.8)`
                });
            }
        }
    }
    
    function drawAssociator() {
        ctx.fillStyle = 'rgba(248, 250, 252, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        time += 0.01;
        
        particles.forEach(p => {
            const wave = Math.sin(time * 3 + p.x * 0.02 + p.y * 0.02) * 20;
            p.x += p.vx + wave * 0.05;
            p.y += p.vy + wave * 0.05;
            
            // Boundary
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });
        
        // Draw grid lines
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.1)';
        ctx.lineWidth = 1;
        
        const cols = state.dimension;
        const rows = state.dimension;
        const cellWidth = canvas.width / cols;
        const cellHeight = canvas.height / rows;
        
        for (let i = 0; i <= cols; i++) {
            ctx.beginPath();
            ctx.moveTo(i * cellWidth, 0);
            ctx.lineTo(i * cellWidth, canvas.height);
            ctx.stroke();
        }
        
        for (let j = 0; j <= rows; j++) {
            ctx.beginPath();
            ctx.moveTo(0, j * cellHeight);
            ctx.lineTo(canvas.width, j * cellHeight);
            ctx.stroke();
        }
        
        // Draw associator visualization
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.3)';
        ctx.lineWidth = 2;
        
        if (state.dimension >= 3) {
            // Triangle representing associator
            const c1 = { x: particles[0]?.x || canvas.width / 3, y: particles[0]?.y || canvas.height / 3 };
            const c2 = { x: particles[particles.length - 1]?.x || canvas.width / 3 * 2, y: particles[particles.length - 1]?.y || canvas.height / 3 };
            const c3 = { x: canvas.width / 2, y: canvas.height / 2 };
            
            ctx.beginPath();
            ctx.moveTo(c1.x, c1.y);
            ctx.lineTo(c2.x, c2.y);
            ctx.lineTo(c3.x, c3.y);
            ctx.closePath();
            ctx.stroke();
            
            // Label
            ctx.fillStyle = '#6366f1';
            ctx.font = 'bold 14px monospace';
            ctx.fillText('(x, y, z)', c1.x - 50, c1.y - 20);
        }
    }
    
    function drawStructure() {
        ctx.fillStyle = 'rgba(248, 250, 252, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const cols = state.dimension;
        const rows = state.dimension;
        const cellWidth = canvas.width / cols;
        const cellHeight = canvas.height / rows;
        
        // Draw grid cells
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                const x = i * cellWidth;
                const y = j * cellHeight;
                const size = Math.min(cellWidth, cellHeight) * 0.6;
                
                ctx.fillStyle = 'rgba(99, 102, 241, 0.1)';
                ctx.fillRect(x, y, size, size);
                
                ctx.strokeStyle = 'rgba(99, 102, 241, 0.3)';
                ctx.lineWidth = 1;
                ctx.strokeRect(x, y, size, size);
                
                // Number label
                ctx.fillStyle = '#6366f1';
                ctx.font = 'bold 12px monospace';
                ctx.fillText(`${i},${j}`, x + size / 2 - 10, y + size / 2 + 15);
            }
        }
        
        // Draw arrows representing product
        if (cols > 1 && rows > 1) {
            ctx.strokeStyle = '#ec4899';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(canvas.width * 0.25, canvas.height * 0.5);
            ctx.lineTo(canvas.width * 0.75, canvas.height * 0.5);
            ctx.stroke();
            
            ctx.fillStyle = '#ec4899';
            ctx.fillText('x ⋅ y → x ⋅ y', canvas.width * 0.25, canvas.height * 0.55);
        }
    }
    
    function drawComparison() {
        ctx.fillStyle = 'rgba(248, 250, 252, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const cols = state.dimension;
        const cellWidth = canvas.width / cols;
        
        // Draw different colored regions
        ctx.fillStyle = 'rgba(99, 102, 241, 0.1)';
        ctx.fillRect(0, 0, cellWidth, canvas.height);
        
        ctx.fillStyle = 'rgba(236, 72, 153, 0.1)';
        ctx.fillRect(cellWidth * 1, 0, cellWidth, canvas.height);
        
        ctx.fillStyle = 'rgba(20, 184, 166, 0.1)';
        ctx.fillRect(cellWidth * 2, 0, cellWidth, canvas.height);
        
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.lineWidth = 1;
        
        for (let i = 0; i <= cols; i++) {
            ctx.beginPath();
            ctx.moveTo(i * cellWidth, 0);
            ctx.lineTo(i * cellWidth, canvas.height);
            ctx.stroke();
        }
        
        // Labels
        ctx.fillStyle = '#64748b';
        ctx.font = '12px sans-serif';
        ctx.fillText('LSA', 10, 25);
        ctx.fillText('AFA', cellWidth * 1.5 + 5, 25);
        ctx.fillText('A₃', cellWidth * 2.5 + 5, 25);
        
        if (cols >= 4) {
            ctx.fillText('S₃', cellWidth * 3.5 + 5, 25);
        }
    }
    
    function animate() {
        if (state.visualizationMode === 'associator') {
            drawAssociator();
        } else if (state.visualizationMode === 'structure') {
            drawStructure();
        } else {
            drawComparison();
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => resizeMainCanvas(canvas));
}

// ==================== AFA CALCULATOR ====================

function getMatrixInput() {
    const container = document.getElementById('matrixContainer');
    state.productMatrix = [];
    
    if (container && container.innerHTML) {
        const inputs = container.querySelectorAll('input');
        for (let i = 0; i < inputs.length; i += 3) {
            const row = [];
            for (let j = 0; j < 3; j++) {
                row.push(parseFloat(inputs[i + j]?.value) || 0);
            }
            state.productMatrix.push(row);
        }
    }
    return state.productMatrix;
}

function calculateAFA() {
    const resultsDiv = document.getElementById('resultContent');
    
    if (!state.productMatrix || state.productMatrix.length === 0) {
        resultsDiv.innerHTML = '<p style="color: var(--danger);">Please enter matrix values first.</p>';
        return;
    }
    
    const dim = Math.sqrt(state.productMatrix.length);
    const results = [];
    let isAFA = true;
    
    // Test AFA condition: (x, y, z) = (z, y, x)
    // This means: (x·y)·z - x·(y·z) = (z·y)·x - z·(y·x)
    // Or: (x·y)·z + z·(y·x) = x·(y·z) + (z·y)·x
    
    for (let i = 0; i < dim; i++) {
        for (let j = 0; j < dim; j++) {
            for (let k = 0; k < dim; k++) {
                const x = state.productMatrix[i];
                const y = state.productMatrix[j];
                const z = state.productMatrix[k];
                
                // Calculate (x, y, z)
                const xy = multiplyVectors(x, y);
                const yz = multiplyVectors(y, z);
                const lhs = multiplyVector(xy, z);
                const rhs = multiplyVector(x, yz);
                const associator = subtractVectors(lhs, rhs);
                
                // Calculate (z, y, x)
                const zy = multiplyVectors(z, y);
                const yx = multiplyVectors(y, x);
                const lhs2 = multiplyVector(zy, x);
                const rhs2 = multiplyVector(z, yx);
                const associator2 = subtractVectors(lhs2, rhs2);
                
                const diff = subtractVectors(associator, associator2);
                const norm = Math.sqrt(diff.reduce((sum, v) => sum + v * v, 0));
                
                if (norm > 0.01) {
                    isAFA = false;
                }
                
                results.push({
                    indices: [i, j, k],
                    lhs: lhs,
                    rhs: rhs,
                    lhs2: lhs2,
                    rhs2: rhs2,
                    norm: norm
                });
            }
        }
    }
    
    let html = '';
    
    if (isAFA) {
        html += '<div class="result-item pass"><span>✅ AFA Condition</span><span>Associativity symmetric: (x,y,z) = (z,y,x)</span></div>';
        html += '<p style="margin-top: 1rem; padding: 1rem; background: rgba(34, 197, 94, 0.1); border-radius: 0.5rem;">The bilinear product satisfies the Anti-Flexible Algebra condition!</p>';
        
        if (dim >= 2) {
            html += '<h4 style="margin-top: 1rem; margin-bottom: 0.5rem;">Sample Associators:</h4>';
            const samples = results.slice(0, 5);
            samples.forEach(s => {
                html += `<div style="font-family: monospace; font-size: 0.875rem; padding: 0.5rem; margin-bottom: 0.5rem; background: rgba(248, 250, 252, 0.5); border-radius: 0.25rem;">
                    e<sub>${s.indices.join('·e')}</sub>: |(x,y,z)| = ${s.norm.toFixed(4)}
                </div>`;
            });
        }
    } else {
        html += '<div class="result-item fail"><span>❌ AFA Condition</span><span>Associativity NOT symmetric</span></div>';
        html += '<p style="margin-top: 1rem; padding: 1rem; background: rgba(239, 68, 68, 0.1); border-radius: 0.5rem;">The bilinear product does NOT satisfy the Anti-Flexible Algebra condition.</p>';
        
        html += '<h4 style="margin-top: 1rem; margin-bottom: 0.5rem;">Violations:</h4>';
        const violations = results.filter(r => r.norm > 0.01).slice(0, 10);
        if (violations.length > 0) {
            violations.forEach(v => {
                html += `<div style="font-family: monospace; font-size: 0.875rem; padding: 0.5rem; margin-bottom: 0.5rem; background: rgba(248, 250, 252, 0.5); border-radius: 0.25rem;">
                    e<sub>${v.indices.join('·e')}</sub>: |(x,y,z) - (z,y,x)| = ${v.norm.toFixed(4)}
                </div>`;
            });
        } else {
            html += '<p>No violations found (within numerical tolerance).</p>';
        }
    }
    
    resultsDiv.innerHTML = html;
}

function multiplyVectors(a, b) {
    if (!a || !b || !a.length || !b.length) return [];
    return a.map((val, i) => val * b[i]);
}

function multiplyVector(a, b) {
    if (!a || !b || !a.length || !b.length) return [];
    return a.map(val => val * b);
}

function subtractVectors(a, b) {
    if (!a || !b) return [];
    return a.map((val, i) => val - (b[i] || 0));
}

function loadExample1() {
    const matrix = [
        [1, 1, 1],
        [0, 1, 1],
        [0, 0, 1]
    ];
    
    const container = document.getElementById('matrixContainer');
    if (container) {
        container.innerHTML = '';
        matrix.forEach(row => {
            row.forEach(val => {
                const input = document.createElement('input');
                input.type = 'number';
                input.step = '0.01';
                input.value = val;
                input.placeholder = val;
                container.appendChild(input);
            });
        });
        state.productMatrix = matrix;
    }
}

function loadExample2() {
    const matrix = [
        [0, 1, 1],
        [0, 0, 1],
        [0, 0, 0]
    ];
    
    const container = document.getElementById('matrixContainer');
    if (container) {
        container.innerHTML = '';
        matrix.forEach(row => {
            row.forEach(val => {
                const input = document.createElement('input');
                input.type = 'number';
                input.step = '0.01';
                input.value = val;
                input.placeholder = val;
                container.appendChild(input);
            });
        });
        state.productMatrix = matrix;
    }
}

function updateDimension() {
    state.dimension = parseInt(document.getElementById('dimension').value);
    document.getElementById('dimensionValue').textContent = state.dimension;
    
    // Update matrix inputs
    const container = document.getElementById('matrixContainer');
    if (container) {
        container.innerHTML = '';
        const size = state.dimension * state.dimension;
        for (let i = 0; i < size; i++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.step = '0.01';
            input.value = i % 2 === 0 ? 1 : 0;
            input.placeholder = i;
            container.appendChild(input);
        }
        state.productMatrix = [];
        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < state.dimension; j++) {
                row.push(parseFloat(container.children[i * state.dimension + j]?.value) || 0);
            }
            state.productMatrix.push(row);
        }
    }
}

// ==================== INTERACTIVE VIZUALIZATION ====================

function updateVisualization() {
    state.algebraType = document.getElementById('algebraType').value;
    state.visualizationMode = document.getElementById('visMode').value;
    state.dimension = parseInt(document.getElementById('visDimension').value);
}

// ==================== UTILITY FUNCTIONS ====================

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update active navigation
            document.querySelectorAll('.nav-links a').forEach(a => {
                a.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    initCanvases();
    updateDimension();
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        window.scrollBy({ top: 300, behavior: 'smooth' });
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        window.scrollBy({ top: -300, behavior: 'smooth' });
    }
});

// Add tooltip functionality for math equations
function addMathTooltips() {
    const mathDisplays = document.querySelectorAll('.math-display');
    mathDisplays.forEach(display => {
        const mathContent = display.textContent;
        const tooltip = document.createElement('div');
        tooltip.style.cssText = `
            position: absolute;
            background: var(--dark);
            color: white;
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;
            font-size: 0.875rem;
            max-width: 300px;
            z-index: 1000;
            display: none;
        `;
        document.body.appendChild(tooltip);
        
        display.addEventListener('mouseenter', () => {
            tooltip.style.display = 'block';
            tooltip.textContent = mathContent;
        });
        
        display.addEventListener('mousemove', (e) => {
            tooltip.style.left = `${e.clientX + 10}px`;
            tooltip.style.top = `${e.clientY + 10}px`;
        });
        
        display.addEventListener('mouseleave', () => {
            tooltip.style.display = 'none';
        });
    });
}

// Initialize tooltips
document.addEventListener('DOMContentLoaded', addMathTooltips);

// ==================== DYNAMIC CONTENT ====================

const examplesData = {
    'ex1': {
        title: '3D Solvable Lie Algebra',
        generators: 'e₁, e₂, e₃',
        product: [
            'e₁⋅e₁ = e₁',
            'e₂⋅e₂ = λ₂e₂',
            'e₃⋅e₃ = λ₃e₃',
            'e₁⋅e₂ = e₂',
            'e₁⋅e₃ = e₃'
        ],
        bracket: [
            '[e₁, e₂] = e₂',
            '[e₁, e₃] = e₃'
        ]
    },
    'ex5': {
        title: '𝔰𝔩(2,ℂ) Counterexample',
        generators: 'H, E, F',
        grading: '𝔤 = 𝔤₋₁ ⊕ 𝔤₀ ⊕ 𝔤₁',
        product: [
            'E⋅F = H - 2F',
            'F⋅H = 2F',
            'H⋅E = 2E',
            'E⋅E = 0',
            'F⋅F = 0',
            'E⋅H = 0'
        ],
        bracket: [
            '[H, E] = 2E',
            '[H, F] = -2F',
            '[E, F] = H'
        ]
    }
};

// Add dynamic example cards
function addDynamicExamples() {
    const grid = document.querySelector('.examples-grid');
    if (!grid) return;
    
    Object.entries(examplesData).forEach(([key, data]) => {
        const card = document.createElement('div');
        card.className = 'example-card';
        card.innerHTML = `
            <div class="example-header">
                <span class="example-number">Ex ${key === 'ex1' ? '2.1' : '5.1'}</span>
                <span class="example-type">${data.title}</span>
            </div>
            <div class="example-content">
                <p><strong>Generators:</strong> ${data.generators}</p>
                ${data.grading ? `<p><strong>Grading:</strong> ${data.grading}</p>` : ''}
                <p><strong>Product:</strong></p>
                <ul>
                    ${data.product.map(p => `<li>${p}</li>`).join('')}
                </ul>
                <p><strong>Associated Lie Bracket:</strong></p>
                <ul>
                    ${data.bracket.map(b => `<li>${b}</li>`).join('')}
                </ul>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Initialize examples
document.addEventListener('DOMContentLoaded', () => {
    addDynamicExamples();
});
