import { WrappedViewer } from "@/components/digest/WrappedViewer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DigestPage() {
  const now = new Date()
  const dateStr = now.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })

  const items = [
    { title: "Markets", body: "Futures mixed; yields steady; dollar soft ahead of data." },
    { title: "Stocks", body: "AAPL edges higher on services strength; NVDA cools after record run." },
    { title: "Crypto", body: "BTC holds above key level as ETF inflows stabilize; ETH tracks risk." },
    { title: "Macro", body: "ISM signals cooling prices; labor prints later this week in focus." },
    { title: "One Big Idea", body: "Watch cash margins: cost discipline drives 2026 EPS upgrades." },
  ]

  return (
    <main className="bg-white text-black">
      {/* Wrapped-style immersive viewer */}
      <WrappedViewer />

      {/* Accessible text version */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-6 flex items-center gap-3">
          <span className="inline-block rounded-full border border-accent/50 bg-accent/10 px-3 py-1 text-[11px] font-semibold tracking-wide uppercase">Text version</span>
          <span className="text-xs opacity-70">{dateStr}</span>
        </div>
        <h2 className="font-heading text-2xl tracking-tight">Today’s market in under a minute</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {items.map((it) => (
            <div key={it.title} className="rounded-xl border p-6">
              <div className="font-heading text-xl mb-2">{it.title}</div>
              <p className="text-sm opacity-80">{it.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex items-center gap-3">
          <Button asChild variant="accent"><Link href="/signup">Create your account</Link></Button>
          <Link href="/" className="text-sm underline">Back to home</Link>
        </div>
      </section>
    </main>
  )
}
