"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause } from "lucide-react"

type Props = {
  durationSec?: number
}

export function DigestPlayer({ durationSec = 50 }: Props) {
  const [playing, setPlaying] = useState(false)
  const [elapsed, setElapsed] = useState(0) // seconds
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)
  const carryRef = useRef(0)

  useEffect(() => {
    function tick(ts: number) {
      if (startRef.current == null) startRef.current = ts
      const delta = (ts - startRef.current) / 1000
      const nextElapsed = Math.min(durationSec, carryRef.current + delta)
      setElapsed(nextElapsed)
      if (nextElapsed < durationSec) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        // auto stop at end
        setPlaying(false)
      }
    }
    if (playing) {
      rafRef.current = requestAnimationFrame(tick)
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [playing, durationSec])

  const toggle = () => {
    if (playing) {
      // pause
      carryRef.current = elapsed
      startRef.current = null
      setPlaying(false)
    } else {
      // play/resume
      startRef.current = null
      setPlaying(true)
    }
  }

  const reset = () => {
    carryRef.current = 0
    startRef.current = null
    setElapsed(0)
    setPlaying(false)
  }

  const progress = Math.min(1, elapsed / durationSec)

  const fmt = (s: number) => {
    const mm = Math.floor(s / 60)
    const ss = Math.floor(s % 60)
    return `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex items-center gap-3">
        <Button variant="accent" onClick={toggle} className="rounded-full px-4">
          {playing ? (
            <span className="inline-flex items-center gap-2"><Pause className="size-4" /> Pause</span>
          ) : (
            <span className="inline-flex items-center gap-2"><Play className="size-4" /> Play</span>
          )}
        </Button>
        <button onClick={reset} className="text-sm underline opacity-70 hover:opacity-100">Reset</button>
        <div className="ml-auto text-xs tabular-nums opacity-70">{fmt(elapsed)} / {fmt(durationSec)}</div>
      </div>
      <div className="mt-3 h-2 w-full rounded-full bg-black/10 overflow-hidden">
        <div className="h-full bg-accent" style={{ width: `${progress * 100}%` }} />
      </div>
    </div>
  )
}
