"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export function Hero() {
  const [toolsOpen, setToolsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const target = e.target as Node
      if (!menuRef.current || !buttonRef.current) return
      if (menuRef.current.contains(target) || buttonRef.current.contains(target)) return
      setToolsOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setToolsOpen(false)
    }
    document.addEventListener("click", onDocClick)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("click", onDocClick)
      document.removeEventListener("keydown", onKey)
    }
  }, [])

  return (
    <header className="relative min-h-[90svh] bg-white text-black">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex items-center justify-between text-sm">
          <div className="font-heading text-2xl tracking-tight">Finovate</div>
          <nav className="hidden md:flex items-center gap-2 rounded-full border border-accent/40 bg-black/90 text-white px-3 py-2 shadow-sm relative">
            <a href="#hero" className="rounded-full px-3 py-1 hover:text-accent transition-colors">Home</a>
            <span className="opacity-50">•</span>
            <div className="relative">
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={toolsOpen}
                onClick={() => setToolsOpen((v) => !v)}
                ref={buttonRef}
                className="rounded-full px-3 py-1 hover:text-accent transition-colors inline-flex items-center gap-1"
              >
                Tools <ChevronDown className="size-4" />
              </button>
              {toolsOpen && (
                <div
                  role="menu"
                  ref={menuRef}
                  className="absolute top-full left-0 z-50 mt-2 min-w-[220px] rounded-xl border border-accent/40 bg-black/90 text-white shadow-md p-2 flex flex-col"
                >
                  <a role="menuitem" href="#digest" className="rounded-md px-3 py-2 hover:bg-white hover:text-black transition-colors">50‑second Daily Digest</a>
                  <a role="menuitem" href="#analysis" className="rounded-md px-3 py-2 hover:bg-white hover:text-black transition-colors">AI Analysis</a>
                </div>
              )}
            </div>
            <span className="opacity-50">•</span>
            <a href="#articles" className="rounded-full px-3 py-1 hover:text-accent transition-colors">Articles</a>
            <span className="ml-2 mr-1 h-5 w-px bg-accent/40" />
            <Button asChild variant="accent" className="rounded-full px-4 py-1 text-sm">
              <Link href="/signup">Login / Register</Link>
            </Button>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <motion.h1
          className="font-heading text-5xl md:text-7xl tracking-tight absolute left-1/2 top-[28vh] -translate-x-1/2 text-center"
          {...fadeUp}
        >
          Make the markets make sense
        </motion.h1>

        <motion.p
          className="absolute left-1/2 top-[42vh] -translate-x-1/2 text-center text-base md:text-lg max-w-2xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.1 } }}
        >
          Get a 50‑second daily digest and crisp AI analysis on stocks and crypto.
        </motion.p>

        <motion.div
          className="absolute left-1/2 top-[52vh] -translate-x-1/2 flex w-full max-w-md items-center justify-center"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.18 } }}
        >
          <Button asChild variant="accent">
            <Link href="/signup">Create your account</Link>
          </Button>
        </motion.div>

        <div className="absolute left-1/2 top-[60vh] -translate-x-1/2 text-xs text-neutral-600">
            You can also browse <a href="#articles" className="underline">latest articles</a>.
        </div>
      </div>
    </header>
  )
}
