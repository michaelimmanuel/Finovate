"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Play } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { WrappedViewer } from "@/components/digest/WrappedViewer"

export function DailyDigest() {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<"viewer" | "text">("viewer")
  const overlayRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    if (open) document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <section id="digest" className="bg-white text-black">
      <div className="mx-auto max-w-7xl px-6 py-20">
        {/* Kicker: compact timestamp */}
        <div className="mb-3 flex items-center gap-3 text-xs opacity-70">
          <span className="inline-block rounded-full border border-accent/50 bg-accent/10 px-3 py-1 text-[11px] font-semibold tracking-wide uppercase text-black">Daily digest</span>
          <span>{new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}</span>
          <span>• 0:50</span>
        </div>
        <div className="mb-8">
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Markets",
              body: "Futures mixed; 10Y steady; dollar softer ahead of prints.",
              lines: [
                "Equities: US flat, EU mild green, Asia mixed",
                "Rates: Long end holds; front end drifts",
                "FX: DXY eases; EUR firmer on PMI rebound",
              ],
            },
            {
              title: "Movers",
              body: "AAPL +0.6% on Services margin; NVDA −1.2% cooling post‑run.",
              lines: [
                "AAPL: App Store fees, cloud mix improve GMs",
                "NVDA: Profit‑taking; datacenter backlog intact",
                "TSLA: Range headlines, delivery cadence steady",
              ],
            },
            {
              title: "One Big Idea",
              body: "Watch cash margins: cost discipline = 2026 EPS upgrades.",
              lines: [
                "Lean opex + pricing power → durable FCF",
                "Quality compounders rerate on visibility",
                "Screen: net cash, >20% ROIC, stable ASPs",
              ],
            },
          ].map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-xl">{b.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm opacity-80">{b.body}</p>
                  <ul className="text-sm opacity-80 list-disc pl-5 space-y-1">
                    {b.lines.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 flex items-center gap-3">
          <Button variant="accent" className="rounded-full px-5 py-2 text-sm inline-flex items-center gap-2" onClick={() => setOpen(true)}>
            <Play className="size-4" /> Read today’s digest
          </Button>
          <span className="text-xs opacity-70">50 seconds • Markets, movers, one idea</span>
        </div>

        {open && (
          <div
            ref={overlayRef}
            className="fixed inset-0 z-[100] bg-white"
            role="dialog"
            aria-modal="true"
          >
            {/* Top bar with close */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b">
              <div className="flex items-center gap-4">
                <div className="text-xs opacity-70">Today • 0:50</div>
                {/* Tabs */}
                <div className="flex items-center gap-1 text-xs">
                  <button
                    type="button"
                    className={`rounded-full px-3 py-1 border ${tab === "viewer" ? "bg-black text-white" : "bg-white"}`}
                    onClick={() => setTab("viewer")}
                  >
                    Viewer
                  </button>
                  <button
                    type="button"
                    className={`rounded-full px-3 py-1 border ${tab === "text" ? "bg-black text-white" : "bg-white"}`}
                    onClick={() => setTab("text")}
                  >
                    Text
                  </button>
                </div>
              </div>
              <button
                type="button"
                aria-label="Close"
                className="rounded-full border px-3 py-1 text-sm hover:bg-black/5"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>

            {/* Viewer/Text with animated transition */}
            <AnimatePresence mode="wait">
              {tab === "viewer" ? (
                <motion.div
                  key="viewer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0, transition: { duration: 0.25 } }}
                  exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                  className="relative"
                >
                  <WrappedViewer />
                </motion.div>
              ) : (
                <motion.section
                  key="text"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0, transition: { duration: 0.25 } }}
                  exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                  className="mx-auto max-w-7xl px-6 py-10"
                >
                  <h2 className="font-heading text-2xl tracking-tight">Today’s market in under a minute</h2>
                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    {[
                      { title: "Markets", body: "Futures mixed; 10Y steady; dollar softer ahead of prints." },
                      { title: "Stocks", body: "AAPL edges higher on services; NVDA cools after record run." },
                      { title: "Crypto", body: "BTC holds above key level; ETH tracks broader risk." },
                      { title: "Macro", body: "ISM signals cooling prices; labor prints later this week." },
                      { title: "One Big Idea", body: "Watch cash margins: cost discipline drives 2026 EPS upgrades." },
                    ].map((it) => (
                      <div key={it.title} className="rounded-xl border p-6">
                        <div className="font-heading text-xl mb-2">{it.title}</div>
                        <p className="text-sm opacity-80">{it.body}</p>
                      </div>
                    ))}
                  </div>
                </motion.section>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  )
}
