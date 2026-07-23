# Server

Express + Node.js API server with MongoDB.

## Structure

```
apps/server/
├── __tests__/
│   ├── helpers.ts              # useTestDatabase() helper for test files
│   ├── setup.ts                # Global vitest setup (in-memory MongoDB)
│   └── tsconfig.json           # Test-specific tsconfig
├── src/
│   ├── config/
│   │   ├── index.ts                   # Exports env vars (mongoUri, serverPort)
│   │   ├── ingestEnvironmentFiles.ts  # dotenv loader
│   │   └── mongoConfig.ts            # Mongoose connection
│   ├── routes/
│   │   └── v1/
│   │       └── index.ts               # v1 router
│   └── index.ts                       # Express app entry point
├── .env.example
├── package.json
├── tsconfig.json
└── vitest.config.ts
```

## Setup

```bash
cp .env.example .env
# Fill in your MongoDB connection string and port.
```

## Scripts

| Command            | Description                      |
| ------------------ | -------------------------------- |
| `pnpm dev`         | Start dev server with hot reload |
| `pnpm build`       | Compile TypeScript to `dist/`    |
| `pnpm start`       | Run compiled server              |
| `pnpm test`        | Run tests (vitest)               |
| `pnpm test:watch`  | Run tests in watch mode          |
| `pnpm check-types` | Type check without emitting      |
| `pnpm lint`        | Lint source files                |
| `pnpm format`      | Check formatting                 |
