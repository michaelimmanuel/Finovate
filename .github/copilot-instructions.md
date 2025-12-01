# AI Coding Agent Guide for Finovate

Use this as a concise, actionable reference to be immediately productive in this Next.js + Tailwind v4 + shadcn/ui + Framer Motion app.

## Architecture
- **App Router:** Uses Next.js App Router under `app/` with `layout.tsx` and `page.tsx`. No `pages/` directory.
- **Global Layout:** `app/layout.tsx` sets fonts (Geist, Geist Mono) and applies CSS via `app/globals.css`. Respect the font variables and avoid altering the layout signature.
- **UI Components:** Reusable components live in `components/ui/` and follow shadcn-style patterns.
  - `button.tsx`: Variant-driven styles with `class-variance-authority` and optional `asChild` via Radix `Slot`.
  - `card.tsx`: Composed primitives (`Card`, `CardHeader`, `CardContent`, etc.).
  - `input.tsx`: Styled input with Tailwind classes.
- **Utilities:** `lib/utils.ts` exposes `cn(...inputs)` combining `clsx` + `tailwind-merge` for safe class merging.

## Styling & Conventions
- **Tailwind v4:** Config via `postcss` and Tailwind v4 packages. Use utility classes and prefer `cn()` for conditional merging.
- **Variants Pattern:** For new components, mirror `button.tsx` using `cva` for variants and sizes; export both component and its `...Variants` helper.
- **Data-slot attributes:** Components include `data-slot` for semantic targeting; preserve and use the same naming when adding primitives.
- **Import Aliases:** The project uses path alias `@/` (e.g., `@/components/ui/button`, `@/lib/utils`). Keep imports consistent with this alias.

## Motion & Client Components
- **Framer Motion:** Use `framer-motion` for animations (see `app/page.tsx` usage). Motion elements belong in Client Components.
- **Client Directive:** If a file imports `framer-motion` or relies on browser APIs, add `"use client"` at the top of the file.

## Build & Run
- **Dev:** `npm run dev` starts Next dev server at `http://localhost:3000`.
- **Build:** `npm run build` compiles the app; **Start:** `npm run start` runs the production build.
- **Lint:** `npm run lint` uses the repo `eslint.config.mjs`. Keep changes lint-clean.

## Patterns to Follow
- **Class merging:** Always use `cn()` for className composition to avoid Tailwind conflicts.
- **Component API surface:** Keep props aligned with native element props plus variant props where applicable; avoid custom prop names unless necessary.
- **Variants default:** Provide sane `defaultVariants` in `cva` configs and expose a typed `VariantProps<typeof ...Variants>`.
- **Accessibility:** Preserve focus-visible rings/borders and `disabled` behaviors included in base classes.

## File Examples
- **Button usage:**
  ```tsx
  import { Button } from "@/components/ui/button"
  <Button variant="outline" size="sm">Click</Button>
  ```
- **Card composition:**
  ```tsx
  import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
  <Card>
    <CardHeader><CardTitle>Title</CardTitle></CardHeader>
    <CardContent>Body</CardContent>
  </Card>
  ```
- **Class merging:**
  ```tsx
  import { cn } from "@/lib/utils"
  <div className={cn("p-4", isActive && "bg-accent")} />
  ```

## Integration Notes
- **Fonts:** Managed via `next/font/google` in `app/layout.tsx`. Use `geistSans.variable` and `geistMono.variable` already applied; do not re-import fonts per page.
- **Icons:** `lucide-react` is available; import icons directly and ensure consistent sizing via Tailwind (e.g., `size-4`).
- **Animations:** Prefer motion primitives (`motion.div`, `motion.h1`), with simple `initial/animate/transition` props for page/UI transitions.

## Common Pitfalls
- **Client imports in Server files:** If you need `framer-motion`, move the component to a Client Component and add `"use client"` at file top.
- **Inline imports:** Do not place `import` statements inside functions/components. Imports must be top-level.
- **Avoid unused config:** `next.config.ts` is minimal; add only necessary options.

## Where to Add New Code
- **New UI components:** Place in `components/ui/` with `cva` variants and `data-slot` attributes.
- **Feature pages/sections:** Add under `app/` as routed segments; ensure client/server component boundaries are respected.
- **Shared utilities:** Put in `lib/` and keep dependency-light.

## Testing & Quality
- **ESLint:** Run `npm run lint` before commit; fix type and style issues per `eslint.config.mjs`.
- **TypeScript:** Keep strict typing aligned with Next 16 / React 19 types.

## Quick Fix Example (Page client + motion)
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

---

If anything above is unclear or missing (e.g., routing conventions, deployment setup, or additional UI primitives), tell me which sections need more detail and I’ll refine them.