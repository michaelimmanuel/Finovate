"use client"

import { motion } from "framer-motion"

const articles = Array.from({ length: 6 }).map((_, i) => ({
  title: `Article title ${i + 1}`,
  dek: "One‑line summary goes here in plain English.",
  tag: i % 2 ? "Markets" : "Concepts",
  read: `${4 + ((i % 3) + 1)} min read`,
}))

export function LatestArticles() {
  return (
    <section id="articles" className="bg-white text-black">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-6 text-xs tracking-wide uppercase opacity-70">Latest articles</div>
        <div className="grid gap-6 md:grid-cols-3">
          {articles.map((a, i) => (
            <motion.a key={a.title} href="#" className="block rounded-xl border p-6 hover:bg-neutral-50"
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.04 }}
            >
              <div className="mb-2 text-xs opacity-60">{a.tag} • {a.read}</div>
              <h3 className="font-heading text-xl">{a.title}</h3>
              <p className="mt-1 text-sm opacity-80">{a.dek}</p>
            </motion.a>
          ))}
        </div>
        <div className="mt-8">
          <a href="#" className="underline">All articles</a>
        </div>
      </div>
    </section>
  )
}
