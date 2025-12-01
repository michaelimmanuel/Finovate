"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const samples = [
  { kind: "Stock", symbol: "AAPL", summary: "iPhone mix shifts, Services margin tailwinds, buybacks steady.", risk: "Regulatory scrutiny; China demand variability.", sentiment: "Moderately positive" },
  { kind: "Crypto", symbol: "BTC", summary: "Risk-on flows, ETF demand steady, miner selling cools.", risk: "Macro volatility; regulatory headlines.", sentiment: "Neutral to positive" },
]

export function AIAnalysis() {
  return (
    <section className="bg-white text-black">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-4 text-xs tracking-wide uppercase opacity-70">AI analysis</div>
        <div className="mb-6 flex flex-wrap gap-2 text-sm opacity-80">
          <span className="rounded-full border px-3 py-1">AAPL</span>
          <span className="rounded-full border px-3 py-1">NVDA</span>
          <span className="rounded-full border px-3 py-1">BTC</span>
          <span className="rounded-full border px-3 py-1">ETH</span>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {samples.map((it, i) => (
            <motion.div key={it.symbol} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{it.kind}: {it.symbol}</span>
                    <span className="text-xs opacity-60">sample</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div><span className="opacity-60">Summary: </span>{it.summary}</div>
                  <div><span className="opacity-60">Risks: </span>{it.risk}</div>
                  <div><span className="opacity-60">Sentiment: </span>{it.sentiment}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="mt-8">
          <a href="#subscribe" className="underline">See sample analysis</a>
        </div>
      </div>
    </section>
  )
}
