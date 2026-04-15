# Paper Skills

Transform research papers into interactive web applications using Qwen Code Agent Skills.

## Showcase

![Showcase](media/showcase.gif)

## Setup

Save the `research-webapp` skill to one of these locations:

**Personal (all projects):**
```bash
cp -r research-webapp ~/.qwen/skills/
```

**Project-level (shared with team):**
```bash
mkdir -p .qwen/skills
cp -r research-webapp .qwen/skills/
```

## Usage

1. **Explicit invocation:**
   ```
   /skills research-webapp
   ```

2. **Provide a research paper** (PDF, URL, or text) and ask to create an interactive web app.

3. The skill generates a complete React Vite application with:
   - Interactive narrative sections
   - Custom visualizations and 3D scenes
   - Performance charts and comparisons
   - Author cards and citations

## Examples

Generated apps in `examples/` folder:
- `paper0` through `paper9` - Sample outputs from the skill

Each example is a runnable React application created by the `research-webapp` skill.
