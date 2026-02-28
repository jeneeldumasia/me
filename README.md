# Jeneel Dumasia — Portfolio

A complete, production-ready portfolio website designed for Jeneel Dumasia, showcasing his work as a Cloud & DevOps Technical Intern.

## Architecture & Aesthetic Direction
This portfolio utilizes a **Refined Brutalism / Architectural** design language. 
Jeneel builds cloud infrastructure—a discipline of structure, load balancing, and raw computational materials. This aesthetic mirrors his work by using raw materials (monochrome, sharp contrasting grids), massive structural typography, and highly precise visual language. It avoids space/cyberpunk tropes to present him as a mature, confident engineer.

The site is built as a highly-performant static single-page application:
- **Core Framework**: React + TypeScript via Vite
- **Styling**: Vanilla CSS with structural precision
- **Animation**: GSAP and Lenis (buttery smooth scrolling)
- **3D Render**: Three.js + React Three Fiber (architectural icosahedron representing physical to cloud transition)

## Setup & Deployment

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run locally**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```
   *This outputs to the `dist/` folder.*

4. **Deploy**:
   - **Vercel**: Run `vercel --prod` to deploy automatically, or connect your Git repository to Vercel.
   - **Netlify**: Drag and drop the `dist/` folder onto the Netlify UI, or connect via Git.
