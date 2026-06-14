# Orqestra — Marketing Site

## Setup
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
```

## Structure
```
src/
  components/
    ConfidenceMesh.tsx        — signature network visual (hero, platform, ambient)
    ConfidenceIndicator.tsx    — small confidence dial used across cards
    Navbar.tsx
    Footer.tsx
  sections/
    Hero.tsx
    WhatWeBelieve.tsx
    Platform.tsx               — "The Orqestra Platform"
    CoreCapabilities.tsx        — 7 capability cards
    Applications.tsx            — applications section
    EarlyAccess.tsx              — signup form
  App.tsx
  index.css                      — design tokens, base styles, focus states
```

## Design System
- Colors: deep navy (#0A0E14 / #10151F) with a single teal accent (#5EEAD4)
- Type: Geist (display) + Inter (body)
- Signature element: the **Confidence Mesh** — a node/edge network where
  line weight and opacity encode confidence, reused at every scale
  (hero, platform section, ambient background, capability glyphs,
  navbar/footer logomark).
- Animation: Framer Motion, scroll-triggered reveals only — no looping or
  decorative animation. Respects `prefers-reduced-motion`.
