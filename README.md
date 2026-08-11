<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&amp;color=1E5EA8&amp;height=200&amp;section=header&amp;text=AutoPartsPK&amp;fontSize=60&amp;fontColor=EDF0F2&amp;animation=fadeIn&amp;fontAlignY=38&amp;desc=Wholesale%20%26%20Retail%20Auto%20Parts%20Platform&amp;descAlignY=58&amp;descSize=18" width="100%"/>

<img src="https://readme-typing-svg.demolab.com?font=Space+Grotesk&amp;size=22&amp;duration=3000&amp;pause=1000&amp;color=1E5EA8&amp;center=true&amp;vCenter=true&amp;width=600&amp;lines=Full-stack+e-commerce+platform;React+%2B+Express+%2B+PostgreSQL;Customer+storefront+%7C+Admin+panel+%7C+REST+API" alt="Typing SVG" />

<br/>

![React](https://img.shields.io/badge/React-19-1E5EA8?style=for-the-badge&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-1E5EA8?style=for-the-badge&logo=node.js&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-1E5EA8?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-1E5EA8?style=for-the-badge&logo=postgresql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-1E5EA8?style=for-the-badge&logo=tailwindcss&logoColor=white)

</div>

---

## Overview

**AutoPartsPK** is a full-stack e-commerce platform built for a wholesale and retail auto spare parts supplier. It's composed of three independent applications sharing one backend API:

- **Storefront** — the customer-facing website: product catalog with vehicle fitment search, cart & checkout, customer accounts, wholesale inquiries, and a blog
- **Admin Panel** — a separate internal app for managing products, categories, vehicles, orders, inquiries, blog posts, and site settings
- **Backend API** — a REST API and PostgreSQL database powering both

---

## ✨ Key Features

- 🔍 **Vehicle fitment search** — browse parts by make, model, and year
- 💰 **Tiered wholesale pricing** — automatic retail → wholesale pricing based on order quantity
- 📦 **Minimum order quantities (MOQ)** enforced end-to-end
- 🧾 **Instant checkout vs. Request-for-Quote** — large orders route to manual quote confirmation
- 🛒 **Full cart & checkout** with COD, bank transfer, and mobile wallet payment options
- 🔐 **Real authentication** — bcrypt-hashed passwords, JWT sessions, Google Sign-In (server-verified)
- 🖼️ **Cloud image hosting** for product photos and user avatars
- 📊 **Admin dashboard** — live stats, recent orders, recent inquiries
- 📥 **Bulk product import** via CSV
- 📝 **Blog** — fully admin-manageable articles
- ⚖️ **Legal pages** — Privacy Policy, Terms of Service, Return Policy

---

## 🛠️ Tech Stack

### Frontend (Storefront) & Admin Panel
| Technology | Purpose |
|---|---|
| **React** (Vite) | UI framework |
| **React Router** | Client-side routing |
| **Tailwind CSS v4** | Styling, custom design tokens |
| **Framer Motion** | Scroll reveals, transitions, parallax |
| **React Icons** | Iconography |
| **Axios** | HTTP client (admin panel) |
| **Sonner** | Toast notifications |
| **PapaParse** | CSV parsing (bulk product import) |
| **@react-oauth/google** + **jwt-decode** | Google Sign-In |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js + Express** | REST API server |
| **Prisma ORM** | Database modeling & queries |
| **PostgreSQL** (via Neon) | Production database |
| **SQLite** | Local development database |
| **bcryptjs** | Password hashing |
| **jsonwebtoken** | Session authentication |
| **google-auth-library** | Server-side Google token verification |
| **Cloudinary** | Image hosting (product photos, avatars) |
| **Multer** | Multipart form/file upload handling |
| **CORS**, **dotenv** | Middleware & environment config |

### Infrastructure
| Service | Purpose |
|---|---|
| **Vercel** | Frontend + Admin hosting |
| **Railway** | Backend API hosting |
| **Neon** | Serverless PostgreSQL |
| **Cloudinary** | Image CDN |

---

## 📁 Project Structure

```
AutoPartsPK/
├── frontend/          # Customer-facing storefront (React + Vite)
├── admin/             # Admin panel (React + Vite)
├── backend/           # Express API + Prisma + database
│   ├── prisma/        # Schema, migrations, seed data
│   └── src/
│       ├── routes/    # API route handlers
│       ├── middleware/
│       └── db.js
└── shared/            # Shared constants (future use)
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20.x (recommended — see note below)
- npm

> **Note:** This project was developed and tested against Node 20 LTS. Newer Node versions (e.g. 24+) have caused compatibility issues with Prisma's native engine binaries.

### 1. Backend Setup
```bash
cd backend
npm install
npx prisma migrate dev
node prisma/seed.js
npm run dev
```
Runs on `http://localhost:4000`

### 2. Frontend (Storefront) Setup
```bash
cd frontend
npm install
npm run dev
```
Runs on `http://localhost:5173`

### 3. Admin Panel Setup
```bash
cd admin
npm install
npm run dev
```
Runs on `http://localhost:5174`

---

## 🔑 Environment Variables

### `backend/.env`
```
DATABASE_URL=
JWT_SECRET=
GOOGLE_CLIENT_ID=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### `frontend/.env` and `admin/.env`
```
VITE_API_URL=
VITE_RECAPTCHA_SITE_KEY=
VITE_GOOGLE_CLIENT_ID=
```

---

## 🧭 Roadmap

- [x] Storefront: catalog, cart, checkout, auth, blog
- [x] Admin panel: products, orders, inquiries, settings, dashboard
- [x] Real authentication (customer + admin)
- [x] Cloud image storage
- [x] Legal pages
- [x] Blog content management
- [ ] Email notifications
- [ ] Live payment gateway integration
- [ ] Production deployment (backend + admin)
- [ ] Frontend visual redesign pass
- [ ] SEO optimization

---

<div align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&amp;color=1E5EA8&amp;height=100&amp;section=footer" width="100%"/>
</div>