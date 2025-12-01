"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import Threads from "@/components/visuals/Threads"

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export function Hero() {
  const [toolsOpen, setToolsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

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
    <header className="relative min-h-[70svh] md:min-h-[90svh] bg-white text-black overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex items-center justify-between text-sm">
          <div className="font-heading text-2xl tracking-tight">Finovate</div>
          {/* Desktop capsule nav */}
          <nav className="hidden lg:flex items-center gap-2 rounded-full border border-accent/40 bg-black/90 text-white px-3 py-2 shadow-sm relative">
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
          {/* Mobile nav: hamburger + dropdown */}
          <div className="lg:hidden">
            <button
              type="button"
              aria-label="Open navigation"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex items-center justify-center rounded-full border border-black/10 bg-black/5 px-3 py-2"
            >
              <span className="sr-only">Menu</span>
              <div className="flex flex-col gap-[3px]">
                <span className="block h-[2px] w-5 bg-black" />
                <span className="block h-[2px] w-5 bg-black" />
                <span className="block h-[2px] w-5 bg-black" />
              </div>
            </button>
            {mobileOpen && (
              <div className="absolute right-4 left-4 top-16 z-50 rounded-xl border border-black/10 bg-white shadow-lg p-2">
                <a href="#hero" className="block rounded-md px-3 py-2 hover:bg-black/5">Home</a>
                <a href="#digest" className="block rounded-md px-3 py-2 hover:bg-black/5">50‑second Daily Digest</a>
                <a href="#analysis" className="block rounded-md px-3 py-2 hover:bg-black/5">AI Analysis</a>
                <a href="#articles" className="block rounded-md px-3 py-2 hover:bg-black/5">Articles</a>
                <div className="mt-2 border-t border-black/10" />
                <Link href="/signup" className="mt-2 block rounded-md px-3 py-2 bg-accent text-accent-foreground text-center">Login / Register</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hero content container: centered and responsive without absolute positioning on mobile */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative min-h-[70svh] md:min-h-[90svh]">
          {/* Threads only under the text area */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-full z-0 pointer-events-none">
            <Threads color={[1, 0.9, 0.6]} amplitude={0.9} distance={0.35} enableMouseInteraction={false} />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center pt-10 sm:pt-16 md:pt-24 pb-12">
          <motion.h1
            className="font-heading text-4xl sm:text-5xl md:text-7xl tracking-tight"
            {...fadeUp}
          >
            Make the markets make sense
          </motion.h1>

          <motion.p
            className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg max-w-xl sm:max-w-2xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.1 } }}
          >
            Get a 50‑second daily digest and crisp AI analysis on stocks and crypto.
          </motion.p>

          <motion.div
            className="mt-6 sm:mt-8"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.18 } }}
          >
            <Button asChild variant="accent">
              <Link href="/signup">Create your account</Link>
            </Button>
          </motion.div>

          <div className="mt-3 text-xs sm:text-[13px] text-neutral-600">
            You can also browse <a href="#articles" className="underline">latest articles</a>.
          </div>
          </div>
        </div>
      </div>
    </header>
  )
}
