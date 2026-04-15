# FormCraft-Pro
The FormCraft-Pro Web Application is a dynamic and user-friendly platform that allows users to create, customize, and manage online forms without any coding knowledge.
# FormCraft Pro — Complete Setup Guide

## 🛠 Tech Stack

| Layer        | Technology          | Why                                      |
|-------------|---------------------|------------------------------------------|
| Framework   | React 18 + Vite     | Fast HMR, component-based, SPA-ready    |
| Drag & Drop | @dnd-kit            | Accessible, modular DnD for React        |
| State       | Zustand             | Minimal global state, no Redux boilerplate|
| Charts      | Recharts            | Declarative charts built on D3           |
| Animations  | Framer Motion       | Smooth page/element transitions          |
| Routing     | React Router v6     | Client-side SPA routing                  |
| Styling     | Tailwind CSS        | Utility-first, consistent design system  |
| IDs         | uuid                | Unique field/rule IDs                    |

---

## 📁 Full Project Structure

```
form-builder/
├── index.html                              # HTML entry point (loads fonts)
├── package.json                            # Dependencies & scripts
├── vite.config.js                          # Vite + React plugin config
├── tailwind.config.js                      # Tailwind theme (fonts, colors, keyframes)
├── postcss.config.js                       # PostCSS for Tailwind
│
└── src/
    ├── main.jsx                            # ReactDOM.render + BrowserRouter
    ├── App.jsx                             # Route layout + sidebar nav
    │
    ├── styles/
    │   └── globals.css                     # Tailwind base + CSS variables + scrollbar
    │
    ├── store/
    │   └── formStore.js                    # Zustand store: fields, rules, submissions
    │
    ├── utils/
    │   └── fieldTypes.js                   # Field palette config + color map
    │
    ├── pages/
    │   ├── BuilderPage.jsx                 # Route: / — Form builder layout
    │   ├── LogicPage.jsx                   # Route: /logic — Conditional rules
    │   └── DashboardPage.jsx               # Route: /dashboard — Analytics
    │
    └── components/
        ├── Builder/
        │   ├── FieldPalette.jsx            # Left panel: draggable field types
        │   ├── FormCanvas.jsx              # Center: DnD drop zone + sortable fields
        │   ├── FieldCard.jsx               # Individual field preview card
        │   └── PropertiesPanel.jsx         # Right panel: field property editor
        │
        └── Dashboard/
            ├── StatCard.jsx                # KPI metric card with trend indicator
            ├── FunnelChart.jsx             # Step-by-step drop-off funnel
            ├── SubmissionsChart.jsx        # Daily area chart (Recharts)
            ├── DeviceBreakdown.jsx         # Donut charts: device + traffic source
            └── SubmissionsTable.jsx        # Paginated submissions table
```

---

## 🚀 Step-by-Step Setup

### STEP 1 — Prerequisites

Make sure you have Node.js (v18 or higher) installed.

```bash
# Check your Node version (must be 18+)
node --version

# Check npm version
npm --version
```

If Node is not installed, download from: https://nodejs.org

---

### STEP 2 — Create the Project Folder

```bash
# Go to where you want the project
cd ~/Desktop

# Create the folder (or use the provided files directly)
mkdir form-builder
cd form-builder
```

---

### STEP 3 — Copy All Project Files

Copy all the provided source files into the `form-builder/` folder, maintaining the folder structure exactly as shown above.

Your folder should look like this after copying:
```
form-builder/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    └── (all files as above)
```

---

### STEP 4 — Install Dependencies

```bash
# Make sure you're inside the project folder
cd form-builder

# Install all npm packages (this takes ~30-60 seconds)
npm install
```

This installs:
- react, react-dom, react-router-dom
- @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities
- zustand, recharts, framer-motion, uuid, clsx
- vite, tailwindcss, autoprefixer, postcss (dev)

---

### STEP 5 — Start Development Server

```bash
npm run dev
```

You'll see output like:
```
  VITE v5.x.x  ready in 300ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```

Open **http://localhost:5173** in your browser.

---

### STEP 6 — Explore the App

| Page        | URL                        | Feature                          |
|-------------|----------------------------|----------------------------------|
| Builder     | http://localhost:5173/     | Drag-and-drop form builder       |
| Logic       | http://localhost:5173/logic| Conditional branching rules      |
| Dashboard   | http://localhost:5173/dashboard | Analytics & funnel metrics  |

---

## 🏗 Build for Production

```bash
# Build optimized production bundle
npm run build

# Preview the production build locally
npm run preview
```


Authors
Chetana Gajanan Deshbhandari-4VP22CS016
Neha Vasant Naik-4VP22CS054
Nishchita A-4VP22CS059
Radhika Kishor Ankolekar-4VP22CS076
Vaishnavi S Savant-4VP22CS114
Yamini U L-4VP22CS125
