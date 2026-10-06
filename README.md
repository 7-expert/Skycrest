# 🏗️ Skycrest Building Contracting LLC — Official Web Application & Project Report

![Skycrest Banner](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss)
![Status](https://img.shields.io/badge/Status-Active%20Dev-brightgreen?style=for-the-badge)

> **"LET'S REDEFINE POSSIBLE®"**  
> *Skycrest Building Contracting LLC is a premier construction, architectural engineering, and infrastructure development company delivering state-of-the-art residential, commercial, and industrial landmarks.*

---

## 📋 Table of Contents
1. [Executive Summary](#-executive-summary)
2. [Key Features & Capabilities](#-key-features--capabilities)
3. [Technology Stack](#-technology-stack)
4. [Project Directory Architecture](#-project-directory-architecture)
5. [Component & Section Breakdown](#-component--section-breakdown)
6. [Design System & Aesthetics](#-design-system--aesthetics)
7. [Installation & Local Setup Guide](#-installation--local-setup-guide)
8. [Available Scripts](#-available-scripts)
9. [Development & Change Log Report](#-development--change-log-report)

---

## 🌟 Executive Summary

The **Skycrest Web Application** is a modern, high-performance, and visually captivating corporate web portal engineered for **Skycrest Building Contracting LLC**. Built with Next.js 16 (App Router + Turbopack), React 19, and Tailwind CSS v4, the application communicates corporate authority, engineering excellence, sustainability commitment, and architectural innovation.

### Core Objectives
- **Brand Elevation**: Presenting a premium visual presence featuring sleek dark themes, custom amber-gold accents, smooth scrolling, and dynamic vector illustrations.
- **Portfolio Demonstration**: Showcasing flagship commercial towers, luxury residential developments, industrial parks, and infrastructure projects.
- **Client & Partner Engagement**: Streamlined contact pathways, interactive inquiry channels, locations map, and career portals.

---

## ✨ Key Features & Capabilities

- 🚀 **Lightning Fast Next.js App Router**: Built on Next.js 16 with Turbopack for instant HMR and optimized server-side performance.
- 🎨 **Premium Aesthetic Design System**: Tailored dark theme using rich `#141414` charcoal backgrounds, high-contrast typography, and dynamic `#F59E0B` amber-gold highlights.
- 📜 **Locomotive Smooth Scroll**: Fluid, weighted scroll dynamics via `LocomotiveScroll` integration for immersive storytelling.
- 🏙️ **Interactive Project Showcase**: Dynamic filtering, detailed project metadata cards, and modal previews for completed and ongoing developments.
- 📱 **Fully Responsive Layout**: Mobile-first architecture tested across mobile, tablet, desktop, and ultra-wide displays.
- 🌿 **Safety & Sustainability Spotlight**: Dedicated sections detailing LEED/ESTIDAMA standards, zero-harm protocols, and green building techniques.
- 💼 **Recruitment & Contact Hub**: Interactive lead-capture forms, office coordinates, and employment application flows.

---

## 🛠️ Technology Stack

| Domain | Technology / Library | Description |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16.3](https://nextjs.org/) | React Framework with App Router & Turbopack |
| **UI Library** | [React 19.2](https://react.dev/) | Core UI rendering engine |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Modern utility-first CSS framework |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean, minimalist SVG iconography |
| **Animations & FX** | [GSAP 3.15](https://greensock.com/gsap/) | Professional web animations & motion timelines |
| **Smooth Scrolling**| [Locomotive Scroll 5](https://locomotivemtl.github.io/locomotive-scroll/) | Smooth scroll container & parallax engine |
| **Utilities** | `clsx`, `tailwind-merge` | Conditional class joining and Tailwind conflict resolution |
| **Linting** | ESLint 9 | Code quality & static analysis enforcement |

---

## 📁 Project Directory Architecture

```text
Skycrest/
├── app/
│   ├── favicon.ico             # App browser favicon icon
│   ├── globals.css             # Global Tailwind CSS directives & custom utility classes
│   ├── icon.png                # App icon asset
│   ├── layout.jsx              # Root App Router layout wrapper & SEO metadata
│   └── page.jsx                # Main landing page assembling sections
├── components/
│   ├── Footer.jsx              # Global footer with logo, navigation, social handles & vector illustration
│   ├── Navbar.jsx              # Sticky header navigation with mobile drawer & quick links
│   ├── SmoothScroll.jsx        # Locomotive Scroll wrapper context component
│   └── sections/
│       ├── AboutStrip.jsx              # Corporate profile, mission, vision & values strip
│       ├── CareersCTA.jsx              # Talent recruitment banner & career portal link
│       ├── ClientsTestimonials.jsx     # Strategic partner logos & client feedback
│       ├── ContactSection.jsx          # Interactive inquiry form & headquarters information
│       ├── FeaturedProjects.jsx        # Project gallery with filtering and detailed cards
│       ├── Hero.jsx                    # Hero banner with primary tagline & key statistics
│       ├── IndustryInsights.jsx        # Thought leadership, BIM & modern construction tech
│       ├── OurProcess.jsx              # 6-step project execution lifecycle diagram
│       ├── SafetySustainability.jsx   # Zero-harm safety protocols & green building standards
│       ├── Services.jsx                # Core services breakdown (Commercial, Residential, Fit-Outs)
│       ├── WhyChooseUs.jsx             # Key differentiators & technical capabilities
│       └── WhySkycrest.jsx             # Brand positioning and engineering precision summary
├── public/
│   ├── logo.png                # Main Skycrest brand logo asset
│   └── logo2.png               # Secondary/inverted brand logo asset
├── AGENTS.md                   # Custom agent guidelines & Next.js version rules
├── eslint.config.mjs           # ESLint configuration
├── jsconfig.json               # Path alias definitions (@/* mapping)
├── next.config.mjs             # Next.js build & runtime options
├── package.json                # Project dependencies & npm scripts
└── README.md                   # Complete project report & technical documentation
```

---

## 🧱 Component & Section Breakdown

### 1. `Navbar.jsx`
- **Purpose**: Primary navigation bar with fixed sticky positioning.
- **Features**: Brand logo integration, links to About, Services, Projects, Careers, Headquarters, Contact, and quick contact phone link. Includes a full-screen dynamic mobile navigation menu.

### 2. `Hero.jsx`
- **Purpose**: Main hero landing visual banner.
- **Features**: High-impact bold headline *"LET'S REDEFINE POSSIBLE®"*, action buttons ("Explore Projects", "Get in Touch"), key performance statistics (e.g. Completed Projects, Years of Excellence, Safety Rating).

### 3. `AboutStrip.jsx`
- **Purpose**: Corporate identity overview.
- **Features**: Company background, core leadership vision, commitment to engineering precision, and strategic values.

### 4. `Services.jsx`
- **Purpose**: Full listing of construction and contracting offerings.
- **Services Covered**: 
  - Commercial & High-Rise Construction
  - Residential & Luxury Villas
  - Infrastructure & Civil Engineering
  - Interior Design & Fit-Out Execution
  - Sustainability & LEED-Certified Development

### 5. `FeaturedProjects.jsx`
- **Purpose**: Interactive portfolio showcase.
- **Features**: Filter by category (Commercial, Residential, Infrastructure, Fit-Out), high-resolution image cards, location markers, completion dates, and project scope modals.

### 6. `WhyChooseUs.jsx` & `WhySkycrest.jsx`
- **Purpose**: Competitive advantage highlight.
- **Key Differentiators**: On-time delivery guarantee, advanced BIM integration, stringent quality control, and zero-accident safety records.

### 7. `OurProcess.jsx`
- **Purpose**: Explaining the lifecycle of project execution.
- **Stages**: 01. Feasibility & Planning → 02. Architectural Design → 03. Pre-Construction → 04. Execution & Construction → 05. Quality & Compliance → 06. Handover & Delivery.

### 8. `SafetySustainability.jsx`
- **Purpose**: Highlighting HSE (Health, Safety, Environment) policies.
- **Features**: Zero-Harm workplace pledge, ISO compliance certifications, solar/green energy integration, and waste reduction strategies.

### 9. `IndustryInsights.jsx`
- **Purpose**: Thought leadership articles and technology adoption.
- **Topics**: Modular construction, 3D building modeling, smart cities, and AI in structural monitoring.

### 10. `ContactSection.jsx` & `CareersCTA.jsx`
- **Purpose**: Lead capture and employment outreach.
- **Features**: Contact form with validation, office addresses, direct email/phone contacts, and career application links.

### 11. `Footer.jsx`
- **Purpose**: Corporate footer closure.
- **Features**: Secondary logo, primary navigation links, social media channels (LinkedIn, Instagram, Facebook, YouTube), dynamic vector city skyline SVG background illustration, and dynamic copyright year block.

---

## 🎨 Design System & Aesthetics

```gantt
    title Color Palette Specifications
    Charcoal Dark   : active, #141414, 0, 100
    Amber Gold      : active, #F59E0B, 0, 100
    Off-White Text  : active, #F9FAFB, 0, 100
    Muted Gray      : active, #9CA3AF, 0, 100
```

- **Color Palette**:
  - **Charcoal (`#141414`)**: Dominant dark background creating a luxury, professional atmosphere.
  - **Amber Gold (`#F59E0B`)**: Vibrant brand accent for CTAs, section highlights, and hover states.
  - **Off-White (`#F9FAFB`)**: High-legibility text color.
  - **Muted Gray (`#9CA3AF`)**: Subtle border fills and secondary body copy.
- **Typography**:
  - **Headings**: Bold uppercase condensed font styles (`font-condensed font-black`).
  - **Body Copy**: Clean sans-serif typography for maximum readability across all viewport sizes.

---

## 🚀 Installation & Local Setup Guide

### Prerequisites
- **Node.js**: `v18.17.0` or higher
- **npm**: `v9.0.0` or higher (or `pnpm` / `yarn` / `bun`)

### Step-by-Step Installation

1. **Navigate to project directory**:
   ```bash
   cd ~/Desktop/web/Skycrest
   ```

2. **Install all dependencies**:
   ```bash
   npm install
   ```

3. **Launch the development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   Open your browser and navigate to:
   ```text
   http://localhost:3000
   ```

---

## 📜 Available Scripts

In the project directory, you can run:

- `npm run dev`: Starts the Next.js development server with Turbopack enabled on port 3000 (`next dev -H 0.0.0.0`).
- `npm run build`: Compiles and builds the production bundle (`next build`).
- `npm run start`: Starts the production server after building (`next start`).
- `npm run lint`: Runs ESLint to check for code quality and syntax issues (`eslint`).

---

## 📊 Development & Change Log Report

| Date / Task ID | Component / Area | Description of Modification | Status |
| :--- | :--- | :--- | :--- |
| **2026-10-06** | Package Management | Executed clean `npm install` to populate `node_modules` and resolve `sh: 1: next: not found` error. | ✅ Resolved |
| **2026-10-06** | Dev Server | Verified server startup with Next.js 16.3.3 (Turbopack) on `http://0.0.0.0:3000`. | ✅ Running |
| **2026-10-06** | `Footer.jsx` | Removed policy links block (*Code of Ethics*, *Privacy Policy*, *InfoCentre 4.0*, *InfoCentre Enhancement*) per user directive. | ✅ Updated |
| **2026-10-06** | `ContactModal.jsx` | Built global Contact Inquiry Pop-up Modal and wired all "Get in Touch" / project buttons to trigger the popup modal. | ✅ Implemented |
| **2026-10-06** | `README.md` | Compiled and wrote complete project report and technical documentation. | ✅ Completed |

---

<div align="center">

**Skycrest Building Contracting LLC** — *Redefining Possible in Construction & Architectural Engineering.*

</div>
