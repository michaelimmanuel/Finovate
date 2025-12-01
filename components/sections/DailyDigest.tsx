"use client"

import { motion } from "framer-motion"

export function DailyDigest() {
  return (
    <section id="digest" className="bg-white text-black">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-8">
          <span className="inline-block rounded-full border border-accent/50 bg-accent/10 px-3 py-1 text-[11px] font-semibold tracking-wide uppercase text-black">
            50‑second daily digest
          </span>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: "Markets", body: "What moved and why — in one sentence." },
            { title: "Movers", body: "Top gainers/losers with a plain‑English reason." },
            { title: "One Big Idea", body: "A single takeaway to build compounding knowledge." },
          ].map((b, i) => (
            <motion.div key={b.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }} className="rounded-xl border p-6">
              <div className="font-heading text-xl mb-2">{b.title}</div>
              <p className="text-sm opacity-80">{b.body}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-8">
          <a href="#subscribe" className="underline">Read today’s digest</a>
        </div>
      </div>
    </section>
  )
}
