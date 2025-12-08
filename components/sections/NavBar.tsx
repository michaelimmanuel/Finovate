"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function NavBar() {
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
      if (e.key === "Escape") {
        setToolsOpen(false)
        setMobileOpen(false)
      }
    }
    document.addEventListener("click", onDocClick)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("click", onDocClick)
      document.removeEventListener("keydown", onKey)
    }
  }, [])

  return (
    <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-4 sm:py-6">
      <div className="flex items-center justify-between text-sm">
        <div className="font-heading text-2xl tracking-tight">Finovate</div>
        {/* Desktop capsule nav */}
        <nav className="hidden lg:flex items-center gap-2 rounded-full border border-accent/40 bg-black/90 text-white px-3 py-2 shadow-sm relative">
          <a href="#hero" className="rounded-full px-3 py-1 hover:text-accent transition-colors">Home</a>
          <span className="opacity-50">•</span>
          <a href="/discussion" className="rounded-full px-3 py-1 hover:text-accent transition-colors">Discussion</a>
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
                  <a role="menuitem" href="/digest" className="rounded-md px-3 py-2 hover:bg-white hover:text-black transition-colors">Daily Digest</a>
                  <a role="menuitem" href="/tools/budget-tracker" className="rounded-md px-3 py-2 hover:bg-white hover:text-black transition-colors">Budget Tracker</a>
                  <a role="menuitem" href="/tools/savings-tracker" className="rounded-md px-3 py-2 hover:bg-white hover:text-black transition-colors">Savings Tracker</a>
                <a role="menuitem" href="#analysis" className="rounded-md px-3 py-2 hover:bg-white hover:text-black transition-colors">AI Analysis</a>
              </div>
            )}
          </div>
          <span className="opacity-50">•</span>
          <a href="/news" className="rounded-full px-3 py-1 hover:text-accent transition-colors">News</a>
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
              <a href="/discussion" className="block rounded-md px-3 py-2 hover:bg-black/5">Discussion</a>
              <a href="/digest" className="block rounded-md px-3 py-2 hover:bg-black/5">Daily Digest</a>
              <a href="/tools/budget-tracker" className="block rounded-md px-3 py-2 hover:bg-black/5">Budget Tracker</a>
              <a href="/tools/savings-tracker" className="block rounded-md px-3 py-2 hover:bg-black/5">Savings Tracker</a>
              <a href="#analysis" className="block rounded-md px-3 py-2 hover:bg-black/5">AI Analysis</a>
              <a href="/news" className="block rounded-md px-3 py-2 hover:bg-black/5">News</a>
              <div className="mt-2 border-t border-black/10" />
              <Link href="/signup" className="mt-2 block rounded-md px-3 py-2 bg-accent text-accent-foreground text-center">Login / Register</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
