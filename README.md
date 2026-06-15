# Orqestra — Marketing Site

The public-facing marketing and waitlist site for Orqestra.

Built with React, TypeScript, Vite, Tailwind CSS, Framer Motion, and Supabase.

---

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Available at:

```text
http://localhost:5173
```

Create a production build:

```bash
npm run build
```

Output is generated in:

```text
dist/
```

Preview the production build locally:

```bash
npm run preview
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

These variables are used by the Early Access form to submit waitlist requests directly to Supabase.

---

## Supabase Setup

### Waitlist Table

Create the following table:

```sql
create table waitlist (
  id bigint generated always as identity primary key,
  created_at timestamptz default now(),
  name text not null,
  email text not null,
  organization text not null,
  role text not null,
  industry text not null
);
```

### Row Level Security

Enable RLS on the table.

Create an insert policy:

```sql
create policy "allow_public_waitlist_insert"
on waitlist
for insert
to anon
with check (true);
```

This allows visitors to submit waitlist requests from the public website.

---

## Project Structure

```text
src/
├── components/
│   ├── AIEstateGraph.tsx
│   ├── ConfidenceIndicator.tsx
│   ├── ConfidenceMesh.tsx
│   ├── Footer.tsx
│   └── Navbar.tsx
│
├── lib/
│   ├── supabase.ts
│   └── useTheme.tsx
│
├── sections/
│   ├── Applications.tsx
│   ├── CoreCapabilities.tsx
│   ├── EarlyAccess.tsx
│   ├── Hero.tsx
│   ├── Platform.tsx
│   └── WhatWeBelieve.tsx
│
├── App.tsx
├── main.tsx
└── index.css
```

---

## Design System

### Colors

- Deep Navy: `#0A0E14`
- Surface Navy: `#10151F`
- Signal Teal: `#5EEAD4`

### Typography

- Geist (Display)
- Inter (Body)

### Visual Language

The **Confidence Mesh** serves as the core visual motif.

Confidence is represented through:

- Node density
- Edge opacity
- Edge thickness
- Structured connectivity

The motif is reused across:

- Hero section
- Platform section
- Capability cards
- Ambient backgrounds
- Brand mark elements

## Domain

Primary domain:

```text
orqestrahq.com
```