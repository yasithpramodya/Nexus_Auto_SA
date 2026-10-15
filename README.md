# Nexus Auto SA – React JS website

Built with **React 19**, **Vite** and **React Router**. Plain CSS, no UI library.

## Pages
| Page | URL | File |
|---|---|---|
| Home | `/` | `src/pages/Home.jsx` |
| Showroom Vehicles | `/vehicles` | `src/pages/WhatWeOffer.jsx` |
| About Us | `/about` | `src/pages/About.jsx` |
| Contact & Location | `/contact` | `src/pages/Contact.jsx` |

Shared header and footer: `src/components/`. All styles: `src/styles.css`.

## Run it
```bash
npm install
npm run dev        # opens http://localhost:5173
```

## Make it yours
- **Business details** (name, phone, email, address, hours, licence): `src/data/vehicles.js` → `business`
- **Vehicles**: `src/data/vehicles.js` → `vehicles`
- **Photos**: replace the placeholders in `src/assets/cars/` (same file names, or update the imports at the top of `vehicles.js`)
- **Colours and fonts**: the `:root` block at the top of `src/styles.css`

## Publish
```bash
npm run build      # creates the dist/ folder
```
Upload `dist/` to Netlify, Vercel, cPanel or any web host. Because it uses page URLs like `/contact`, set the host to send every route to `index.html`:
- Netlify: add a `_redirects` file in `public/` containing `/*  /index.html  200`
- Vercel: works automatically for Vite projects
- cPanel/Apache: add an `.htaccess` rewrite to `index.html`

## Contact form
"Send enquiry" opens the visitor's email app with the message filled in. To receive enquiries straight to your inbox, replace `submit()` in `src/pages/Contact.jsx` with Formspree, EmailJS or your own API.
