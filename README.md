# Student QR Link

A Vite + React + TypeScript app to generate a QR code that opens a student profile with contact info for parents.

## Getting started

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

## Tech
- Vite
- React (TypeScript)
- Tailwind CSS + shadcn/ui

## Deploy to Netlify
- Build command: `npm run build`
- Publish directory: `dist`
- SPA Redirects are configured via `netlify.toml` and `public/_redirects`.

## Notes
- Form data persists locally in `localStorage` so you can edit later.
- QR encodes compact params and the profile page supports both long/short keys.
