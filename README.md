# CDT Distribution — Website

A pixel-faithful, fully responsive marketing website for **CDT Distribution**, built from the
[CDT Website Figma design](https://www.figma.com/design/2RbCcHJEXNwwoaaMdtO5tA/CDT-Website).

Built with **Next.js 14 (App Router)** + **Tailwind CSS**.

## Sections
1. **Hero** — Teton featured product, rating card, product thumbnails, lion on sofa
2. **About** — "Your Local Wholesale Partner" + "Loved by Thousands" product collage
3. **Categories** — horizontally-scrollable product category cards
4. **Best Sellers** — top product cards
5. **Why CDT** — "The CDT Advantage" stats + feature highlights
6. **FAQ** — accordion support section
7. **Contact** — address / phone / email / hours + QR + location map

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Production:

```bash
npm run build    # generates a fully static site in ./out
```

Deploy the `out/` folder to any static host (e.g. Netlify drag-and-drop). There is no
backend — the contact form posts directly to the Woopsa admin API from the browser.

> Note: do **not** run `npm run build` while `npm run dev` is running — they share the
> `.next` folder. Stop the dev server first.

## Structure
- `app/` — layout, global styles, page composition, fonts (next/font/google)
- `components/` — one component per section + `Navbar`, `SideRail`, `Footer`, `Reveal`, `Icons`
- `public/images/` — image assets exported from the Figma design

## Fonts
The design uses **Gotham** (proprietary). It is substituted with **Montserrat** (the standard
free geometric equivalent). All other fonts — Poppins, Playfair Display, Bebas Neue, DM Sans,
Inter — are loaded from Google Fonts.

## Animations
Sections fade/slide in on scroll via an IntersectionObserver (`components/Reveal.jsx`).
This is progressive enhancement: content is fully visible without JS and respects
`prefers-reduced-motion`.
