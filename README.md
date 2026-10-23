# Nexus Auto SA

> Bringing Quality Japanese Cars Closer to You — Direct Vehicle Imports & Sourcing for Australia & Sri Lanka.

[![Live Site](https://img.shields.io/badge/Live_Site-nexus--auto--sa.web.app-e8192c?style=flat&logo=firebase)](https://nexus-auto-sa.web.app)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white)](https://vitejs.dev)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore_%26_Hosting-ffca28?logo=firebase&logoColor=black)](https://firebase.google.com)

Nexus Auto SA connects buyers across Australia and Sri Lanka with curated used cars and authentic Japanese imports. Every vehicle is inspected in Japan and imported directly upon the buyer's request with zero unnecessary showroom markups.

---

## Key Features

- **Direct Import Catalogue:** Curated Japanese vehicle models with comprehensive specs, high-resolution galleries, and auction grading details.
- **Custom Import Enquiries:** Dedicated request portal allowing customers to specify their dream make, model, year, transmission, and budget.
- **Admin Management Dashboard:**
  - Secure passkey-protected administration panel.
  - Live inventory CRUD with multi-image gallery upload (with automated client-side canvas compression) and URL support.
  - Real-time customer enquiry tracking backed by Cloud Firestore.
- **Modern Glassmorphic UI:** High-contrast dark theme, fluid micro-interactions, responsive mobile navigation, and optimized SVG branding.
- **Finance Portal:** Customer repayment estimation and pre-approval inquiry workflow.
- **Multi-Market Support:** Operations and logistics tailored for Australian and Sri Lankan vehicle standards.

---

## Tech Stack

- **Frontend:** React 19, React Router v7, HTML5, Vanilla CSS3 (Custom Design System tokens)
- **Tooling:** Vite 8, ESLint
- **Backend / Database:** Google Firebase (Cloud Firestore & Firebase Hosting)
- **Deployment:** Firebase Hosting (`https://nexus-auto-sa.web.app`)

---

## Project Structure

```
src/
├── assets/         # Optimized vehicle imagery & SVG logo marks
├── components/     # Header, Footer, VehicleModal, Icons, etc.
├── data/           # Default inventory, specs & business configuration
├── hooks/          # Scroll reveal & custom React hooks
├── pages/
│   ├── Home.jsx           # Landing page with hero & featured imports
│   ├── About.jsx          # Company background & sourcing philosophy
│   ├── WhatWeOffer.jsx    # Searchable, filterable import catalogue
│   ├── VehicleDetails.jsx # Detailed vehicle spec sheet & lightbox gallery
│   ├── RequestCar.jsx     # Custom vehicle import enquiry form
│   ├── Finance.jsx        # Vehicle finance portal
│   ├── Contact.jsx        # Direct contact & enquiry submission
│   ├── Admin.jsx          # Protected dealer stock management
│   └── NotFound.jsx       # 404 handler
├── firebase.js     # Firebase SDK initialization
└── styles.css      # Core design tokens, components & responsive queries
```

---

## Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yasithpramodya/Nexus_Auto_SA.git
   cd Nexus_Auto_SA
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local dev server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Deploy to Firebase Hosting:**
   ```bash
   npx firebase deploy --only hosting
   ```

---

## License

Private repository © Nexus Auto SA. All rights reserved.
