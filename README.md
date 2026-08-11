# Kevin Langat's Portfolio

A personal portfolio built with React, TypeScript, and Vite.

## Local development

```bash
npm ci
npm run dev
```

Create a production build with:

```bash
npm run build
```

## Deploy to Vercel

Import this repository in the Vercel dashboard. The included `vercel.json`
configures Vercel to install dependencies with `npm ci`, run the production
build, publish `dist/`, and serve `index.html` as the fallback for client-side
routes.

No environment variables are currently required.

Alternatively, deploy with the Vercel CLI:

```bash
npx vercel
```
