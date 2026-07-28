<div align="center">

  <!-- Animated Live-Typing SVG Banner -->
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=500&size=22&pause=1000&color=38BDF8&center=true&vCenter=true&width=600&lines=Auto+Parts+E-Commerce+%26+Wholesale;Interactive+SVG+Blueprint+Engine;Retail+%2B+B2B+Trade+Platform" alt="Typing Banner" />

  <h1>Auto Parts E-Commerce & Wholesale Platform</h1>

  <p>
    <b>A unified digital distribution platform engineered for retail auto parts buyers and B2B wholesale trade.</b>
  </p>

  <!-- Visual Shields & Tech Stack Badges -->
  <p>
    <img src="https://img.shields.io/badge/Status-Work_In_Progress-38bdf8?style=for-the-badge&labelColor=0f172a" alt="Status: WIP" />
    <img src="https://img.shields.io/badge/Frontend-React_18_%7C_Vite-0f172a?style=for-the-badge&logo=react&logoColor=38bdf8" alt="Frontend" />
    <img src="https://img.shields.io/badge/Styling-Tailwind_CSS-0f172a?style=for-the-badge&logo=tailwindcss&logoColor=38bdf8" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Backend-Node.js-0f172a?style=for-the-badge&logo=nodedotjs&logoColor=38bdf8" alt="Backend" />
  </p>

</div>

⸻

### ◈ What Is This Platform?

This application is a full-stack e-commerce and inventory ecosystem built specifically for automotive spare parts distribution. It bridges the gap between individual B2C retail customers and high-volume B2B wholesale buyers (mechanics, workshops, and trade dealers).

Instead of relying on standard static product landing pages, the platform features a **custom hardware-accelerated SVG blueprint engine** on the hero section that dynamically renders and morphs vehicle chassis geometries using native CSS path vector interpolation.

⸻

### ⬡ Key System Capabilities

* **Dual-Market Pricing Engine:** Automatically switches product pricing based on account status—offering standard retail rates or verified wholesale trade discounts.
* **Interactive Blueprint Engine:** Native vector SVG morphing (`transition: d`) that dynamically transitions chassis geometries across vehicle classes (Sedan, Supercar, Executive).
* **Search & Categorization:** Deep filtering across engine, suspension, electrical, and body components by vehicle make, model, year, and OEM part numbers.
* **Triple-Layer Monorepo Architecture:** Clean code separation across client storefront (`frontend`), REST API backend (`backend`), and administrative panel (`admin`).

⸻

### ◈ Project Directory Structure

```text
├── admin/                  # Dedicated management portal for inventory & orders
├── backend/                # Node.js API server & database services
└── frontend/               # Client-facing web application
    ├── public/             # Static vectors & iconography
    └── src/
        ├── components/     # UI modules (Hero blueprint, Cart, Common, Layout)
        ├── context/        # Global state management (Cart, Auth)
        ├── pages/          # Route views (Home, Products, Wholesale, Detail)
        ├── routes/         # Centralized application routing
        └── styles/         # Global Tailwind directives & SVG animations