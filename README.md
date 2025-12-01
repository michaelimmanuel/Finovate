This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Directory Structure

This project uses the Next.js App Router and a small set of shared UI primitives. Here’s the layout and what goes where:

```
app/
	globals.css        # Global Tailwind styles applied in RootLayout
	layout.tsx         # Global layout; sets Geist fonts and applies base classes
	page.tsx           # Home page (Client, uses Framer Motion + shadcn components)

components/
	ui/                # Shared shadcn-style UI primitives
		button.tsx       # cva-based variants, optional Radix Slot via asChild
		card.tsx         # Composed primitives: Card, CardHeader, CardContent, etc.
		input.tsx        # Styled input with focus-visible and disabled behaviors

lib/
	utils.ts           # cn(...) utility combining clsx + tailwind-merge

public/              # Static assets (images, favicons)

config + tooling
	package.json       # Scripts: dev, build, start, lint
	eslint.config.mjs  # ESLint config (keep changes lint-clean)
	postcss.config.mjs # Tailwind v4 via @tailwindcss/postcss
	next.config.ts     # Minimal Next.js config
	tsconfig.json      # TS config with path alias '@/'
```

### Conventions
- App Router only (no `pages/`). Co-locate feature files next to their route as the app grows.
- Use `"use client"` for files that import `framer-motion` or rely on browser APIs.
- Prefer `cn(...)` for class merging to avoid Tailwind conflicts.
- UI primitives live under `components/ui/` and follow shadcn patterns with `cva` variants and `data-slot` attributes.
- Imports use the `@/` alias (e.g., `@/components/ui/button`, `@/lib/utils`).

### Scripts
- Dev: `npm run dev` → http://localhost:3000
- Build: `npm run build`
- Start (prod): `npm run start`
- Lint: `npm run lint`

### Client + Motion Example
If a page uses Framer Motion, structure it like:

```tsx
"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function Home() {
	return (
		<main className="p-10">
			<motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Finovate</motion.h1>
			<Button>Primary</Button>
		</main>
	)
}
```

If you need a deeper structure (route groups, feature co-location, server actions), see `.github/copilot-instructions.md` for recommended patterns.
