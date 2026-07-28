<div align="center">
  <!-- Replace the src below with a high-quality screen recording (GIF/WebP) of your animated hero -->
  <a href="https://autopartspk.vercel.app/">
    <img src="https://via.placeholder.com/1200x600/0f172a/38bdf8?text=[Insert+High-Res+Animation+GIF+Here]" alt="Hero Interface Live Preview" width="100%" />
  </a>
</div>

<br />

<div align="center">
  <h1>Wholesale Auto Parts — Hero Interface</h1>
  <p>
    <b>A high-performance, SVG-driven React component featuring mathematically synchronized path morphing and orchestrated rendering.</b>
  </p>
  
  <p>
    <a href="#architecture">Architecture</a> • 
    <a href="#features">Features</a> • 
    <a href="#deployment">Deployment</a>
  </p>
</div>

⸻

### ◈ Overview

This component serves as the landing interface for a nationwide auto parts distributor. Instead of relying on heavy JavaScript animation libraries (like GSAP or Framer Motion), the chassis morphing relies entirely on native CSS transitions applied directly to SVG paths. 

This requires strict normalization of SVG coordinates—ensuring an identical number of vector nodes across the Sedan, Supercar, and Executive specifications—resulting in a perfectly fluid, 60fps hardware-accelerated morph.

### ⬡ Technical Features

* **Synchronized Path Morphing:** CSS `transition: d` handles the complex vector interpolation between vehicle classes.
* **Orchestrated Render Sequence:** Utilizes delayed `stroke-dashoffset` and `opacity` properties to simulate a live "drawing" blueprint effect upon initial mount.
* **Independent Telemetry Tracking:** Callouts and rotating wheel groups maintain their own transform origins and transitions without breaking the primary chassis morph.
* **Responsive Layout:** Built with Tailwind CSS grids to maintain proper scaling and aspect ratios across desktop and mobile viewports.

⸻

### ◈ Component Architecture

The interface is broken down into two primary visual columns: the typographical content and the live SVG canvas.

```javascript
// Example of the normalized vector data structure
const CARS = [
  {
    id: 'supercar',
    figBadge: 'FIG. 02 — PERFORMANCE SPECIFICATION',
    bodyPath: 'M 120,322 L 115,302 C 120,288 ... Z', // Normalized to exactly match other vehicle arrays
    wheels: [250, 688]
  }
  // ...
]