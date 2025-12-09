"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type Slide = {
  id: string
  kicker?: string
  title: string
  body?: string
  theme: string // tailwind background classes
  textClass?: string // optional override for text color
}

const slides: Slide[] = [
  {
    id: "intro",
    kicker: "50‑second daily digest",
    title: "Today in under a minute",
    body: "Get a snapshot of today's markets, crypto, top movers, and one big idea in just 50 seconds.",
    theme: "bg-gradient-to-br from-[#FFE7A3] via-[#F6F1E7] to-white",
    textClass: "text-black",
  },
  {
    id: "markets",
    kicker: "Markets",
    title: "Stocks and indexes today",
    body: "S&P 500 up 0.5%; Dow steady; Nasdaq leads tech gains. Volatility remains moderate across global markets.",
    theme: "bg-gradient-to-br from-[#FFF3C4] via-[#FFDFA3] to-[#FFE7A3]",
    textClass: "text-black",
  },
  {
    id: "movers",
    kicker: "Top movers",
    title: "Winners & losers",
    body: "AAPL rises on strong service revenue; NVDA dips after recent record highs; energy stocks rebound slightly.",
    theme: "bg-gradient-to-br from-[#FCE7F3] via-[#E9D5FF] to-white",
    textClass: "text-black",
  },
  {
    id: "crypto",
    kicker: "Crypto",
    title: "BTC and ETH today",
    body: "BTC holds key support around $35k; ETF inflows stabilize the market. ETH tracks broader risk trends.",
    theme: "bg-gradient-to-br from-[#D1FAE5] via-[#A7F3D0] to-white",
    textClass: "text-black",
  },
  {
    id: "macro",
    kicker: "Macro",
    title: "Economic signals",
    body: "ISM eases; labor market data expected later this week. Inflation indicators show mixed signals.",
    theme: "bg-gradient-to-br from-[#DBEAFE] via-[#BFDBFE] to-white",
    textClass: "text-black",
  },
  {
    id: "idea",
    kicker: "One big idea",
    title: "Focus for investors",
    body: "Cost discipline and cash margins drive 2026 EPS upgrades across quality companies—key sectors to watch: tech and energy.",
    theme: "bg-gradient-to-br from-[#FFF7ED] via-[#FFEDD5] to-white",
    textClass: "text-black",
  },
]

export function WrappedViewer() {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [key, setKey] = useState(0) // restart progress animation for current segment

  const total = slides.length
  const msPerSlide = 10000 // 10s each → ~60s total including intro

  const containerRef = useRef<HTMLDivElement | null>(null)
  const timeoutRef = useRef<number | null>(null)

  const go = useCallback((dir: 1 | -1) => {
    setIndex((i) => {
      const next = Math.min(total - 1, Math.max(0, i + dir))
      return next
    })
  }, [])

  const playNext = useCallback(() => {
    if (!playing) return
    if (index < total - 1) {
      setIndex(index + 1)
    } else {
      setPlaying(false)
    }
  }, [index, playing])

  useEffect(() => {
    setKey((k) => k + 1)
    if (playing) {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
      timeoutRef.current = window.setTimeout(playNext, msPerSlide)
    }
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    }
  }, [index, playing, playNext])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1)
      if (e.key === "ArrowLeft") go(-1)
      if (e.key === " ") setPlaying((p) => !p)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [go])

  // basic swipe support
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    let startX = 0
    let startY = 0
    const onStart = (e: TouchEvent) => {
      const t = e.touches[0]
      startX = t.clientX
      startY = t.clientY
    }
    const onEnd = (e: TouchEvent) => {
      const t = e.changedTouches[0]
      const dx = t.clientX - startX
      const dy = t.clientY - startY
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 30) {
        if (dx < 0) go(1)
        else go(-1)
      }
    }
    el.addEventListener("touchstart", onStart, { passive: true })
    el.addEventListener("touchend", onEnd)
    return () => {
      el.removeEventListener("touchstart", onStart)
      el.removeEventListener("touchend", onEnd)
    }
  }, [go])

  const current = slides[index]

  return (
    <div ref={containerRef} className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Progress segments */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-20 flex gap-1 px-4 pt-4 sm:px-6">
        {slides.map((_, i) => (
          <div key={i} className="h-1 w-full rounded-full bg-black/10 overflow-hidden">
            <div
              key={`${key}-${i}`}
              className={cn("h-full bg-accent", i < index ? "w-full" : i === index ? "w-0" : "w-0")}
              style={i === index ? { transitionProperty: "width", transitionTimingFunction: "linear", transitionDuration: playing ? `${msPerSlide}ms` : "0ms", width: playing ? "100%" : "0%" } : undefined}
            />
          </div>
        ))}
      </div>

      {/* Slides */}
      <AnimatePresence initial={false} mode="wait">
        <motion.section
          key={current.id}
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 18 } }}
          exit={{ x: -60, opacity: 0, transition: { duration: 0.25 } }}
          className={cn("absolute inset-0 flex items-center justify-center p-6 sm:p-10", current.theme)}
          onClick={() => go(1)}
          role="button"
          aria-label="Next slide"
        >
          <div className={cn("mx-auto max-w-3xl text-center", current.textClass ?? "text-black")}
               onClick={(e) => e.stopPropagation()}>
            {current.kicker && (
              <div className="mb-4 flex justify-center">
                <span className="inline-block rounded-full border border-black/20 bg-white/40 px-3 py-1 text-[11px] font-semibold tracking-wide uppercase">
                  {current.kicker}
                </span>
              </div>
            )}
            <motion.h2 className="font-heading tracking-tight text-4xl sm:text-5xl md:text-6xl">
              {current.title}
            </motion.h2>
            {current.body && (
              <motion.p className="mt-4 text-sm sm:text-base md:text-lg opacity-80">
                {current.body}
              </motion.p>
            )}
          </div>
        </motion.section>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute bottom-4 left-0 right-0 z-30 flex items-center justify-between px-4 sm:px-6">
        <Button variant="outline" className="rounded-full bg-white/70 backdrop-blur" onClick={(e) => { e.stopPropagation(); go(-1) }}>
          <ChevronLeft className="size-4" />
        </Button>
        <Button variant="accent" className="rounded-full" onClick={(e) => { e.stopPropagation(); setPlaying((p) => !p) }}>
          {playing ? (<span className="inline-flex items-center gap-2"><Pause className="size-4" /> Pause</span>) : (<span className="inline-flex items-center gap-2"><Play className="size-4" /> Play</span>)}
        </Button>
        <Button variant="outline" className="rounded-full bg-white/70 backdrop-blur" onClick={(e) => { e.stopPropagation(); setIndex(0); setPlaying(false); setKey((k)=>k+1) }}>
          <RotateCcw className="size-4" />
        </Button>
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 text-xs opacity-70 bg-white/60 backdrop-blur rounded-full px-3 py-1">
        {index + 1} / {total}
      </div>
    </div>
  )
}
