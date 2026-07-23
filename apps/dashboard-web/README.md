# Dashboard Web App

Vite + React dashboard web application with Tailwind CSS.

## Structure

```
apps/dashboard-web/
├── src/
│   ├── App.tsx            # Root component with React Router
│   ├── main.tsx           # Entry point (React Query + StrictMode)
│   ├── index.css          # Tailwind CSS import + base styles
│   └── vite-env.d.ts      # Vite client types
├── index.html
├── package.json
├── tsconfig.json          # Project references (app + node)
├── tsconfig.app.json      # React/app source config
├── tsconfig.node.json     # Vite config tsconfig
└── vite.config.ts         # Vite + React + Tailwind + API proxy
```

## Setup

The dev server proxies `/api` requests to `http://localhost:3001` (the server app).

## Scripts

| Command            | Description                      |
| ------------------ | -------------------------------- |
| `pnpm dev`         | Start Vite dev server            |
| `pnpm build`       | Type check + production build    |
| `pnpm preview`     | Preview production build locally |
| `pnpm check-types` | Type check without building      |
| `pnpm lint`        | Lint source files                |
| `pnpm format`      | Check formatting                 |
