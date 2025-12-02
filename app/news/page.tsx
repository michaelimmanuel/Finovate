import { NewsCard } from "@/components/news/NewsCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewsIndex() {
  const items = [
    {
      title: "Markets open mixed as yields steady",
      summary: "Equities tread water ahead of jobs data while the dollar eases; tech leadership narrows into close.",
      date: new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }),
      tag: "Markets",
      href: "/news/markets-open-mixed",
    },
    {
      title: "AAPL edges higher on services margin",
      summary: "Service mix and App Store fees support gross margins; analysts eye subscription bundling for 2026.",
      date: new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }),
      tag: "Stocks",
      href: "/news/aapl-services-margin",
    },
    {
      title: "BTC holds above key level on steady ETF inflows",
      summary: "Demand from ETFs offsets miner selling as volatility cools; ETH tracks risk and gas fees normalize.",
      date: new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }),
      tag: "Crypto",
      href: "/news/btc-etf-inflows",
    },
  ]

  return (
    <main className="mx-auto max-w-7xl px-6 py-14">
      <header className="mb-8">
        <div className="mb-3 flex items-center gap-3 text-xs opacity-70">
          <span className="inline-block rounded-full border border-accent/50 bg-accent/10 px-3 py-1 text-[11px] font-semibold tracking-wide uppercase text-black">News</span>
          <span>{new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl tracking-tight">Latest news and market notes</h1>
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full border px-3 py-1">All</span>
          <span className="rounded-full border px-3 py-1">Markets</span>
          <span className="rounded-full border px-3 py-1">Stocks</span>
          <span className="rounded-full border px-3 py-1">Crypto</span>
        </div>
      </header>

      {/* News feature sections */}
      <section className="mb-10">
        <div className="mb-3 flex items-center gap-3">
          <span className="inline-block rounded-full border border-accent/50 bg-accent/10 px-3 py-1 text-[11px] font-semibold tracking-wide uppercase text-black">Latest Crypto News</span>
          <span className="text-xs opacity-70">Today</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "BTC holds as ETF inflows steady",
              summary: "Demand offsets miner selling; realized vol cools as range holds.",
              date: new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }),
              tag: "Crypto",
              href: "/news/btc-etf-inflows",
              imageSrc: "https://picsum.photos/seed/btc-etf-inflows/1200/675",
              imageAlt: "BTC holds as ETF inflows steady",
            },
            {
              title: "ETH tracks risk; gas fees normalize",
              summary: "Fees drift lower as on-chain activity stabilizes across L2s.",
              date: new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }),
              tag: "Crypto",
              href: "/news/eth-gas-fees",
              imageSrc: "https://picsum.photos/seed/eth-gas-fees/1200/675",
              imageAlt: "ETH tracks risk; gas fees normalize",
            },
            {
              title: "Stablecoin volumes pick up on remittances",
              summary: "Payment corridors see steady growth; spreads remain tight.",
              date: new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }),
              tag: "Crypto",
              href: "/news/stablecoin-volumes",
              imageSrc: "https://picsum.photos/seed/stablecoin-volumes/1200/675",
              imageAlt: "Stablecoin volumes pick up on remittances",
            },
          ].map((it) => (
            <NewsCard key={it.href} {...it} />
          ))}
        </div>
      </section>

      <section className="mb-10">
        <div className="mb-3 flex items-center gap-3">
          <span className="inline-block rounded-full border border-accent/50 bg-accent/10 px-3 py-1 text-[11px] font-semibold tracking-wide uppercase text-black">Featured Stories</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Cash margins and the 2026 upgrade cycle",
              summary: "Why cost discipline plus pricing power drives durable EPS.",
              date: new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }),
              tag: "Feature",
              href: "/news/cash-margins-2026",
              imageSrc: "https://picsum.photos/seed/cash-margins-2026/1200/675",
              imageAlt: "Cash margins and the 2026 upgrade cycle",
            },
            {
              title: "Semis after the supercycle",
              summary: "Datacenter, edge, and what’s next for AI capex.",
              date: new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }),
              tag: "Feature",
              href: "/news/semis-after-supercycle",
              imageSrc: "https://picsum.photos/seed/semis-after-supercycle/1200/675",
              imageAlt: "Semis after the supercycle",
            },
            {
              title: "The new playbook for FX",
              summary: "Dollar dynamics and how to think about hedging.",
              date: new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }),
              tag: "Feature",
              href: "/news/fx-playbook",
              imageSrc: "https://picsum.photos/seed/fx-playbook/1200/675",
              imageAlt: "The new playbook for FX",
            },
          ].map((it) => (
            <NewsCard key={it.href} {...it} />
          ))}
        </div>
      </section>

      <section className="mb-10">
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-2xl">Opinion from expert</CardTitle>
          </CardHeader>
          <CardContent className="text-sm opacity-80 space-y-2">
            <blockquote className="border-l-2 pl-3">
              &ldquo;In this tape, quality with cash discipline compounds — the market is rewarding visibility over stories.&rdquo;
            </blockquote>
            <div className="text-xs opacity-70">— Guest contributor</div>
            <div className="pt-2 text-xs"><a className="underline" href="#">Read the column</a></div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-10">
        <div className="mb-3 flex items-center gap-3">
          <span className="inline-block rounded-full border border-accent/50 bg-accent/10 px-3 py-1 text-[11px] font-semibold tracking-wide uppercase text-black">Most read</span>
          <span className="text-xs opacity-70">Today</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "AAPL edges higher on services margin",
              summary: "Service mix and App Store fees support gross margins.",
              date: new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }),
              tag: "Most Read",
              href: "/news/aapl-services-margin",
              imageSrc: "https://picsum.photos/seed/aapl-services-margin/1200/675",
              imageAlt: "AAPL edges higher on services margin",
            },
            {
              title: "BTC holds above key level on ETF demand",
              summary: "ETF flows steady as volatility cools; range holds.",
              date: new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }),
              tag: "Most Read",
              href: "/news/btc-etf-inflows",
              imageSrc: "https://picsum.photos/seed/mostread-btc-etf-inflows/1200/675",
              imageAlt: "BTC holds above key level on ETF demand",
            },
            {
              title: "Cooling inflation keeps yields steady",
              summary: "Price data supports soft-landing hopes; curve little changed.",
              date: new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }),
              tag: "Most Read",
              href: "/news/cooling-inflation-yields-steady",
              imageSrc: "https://picsum.photos/seed/cooling-inflation-yields-steady/1200/675",
              imageAlt: "Cooling inflation keeps yields steady",
            },
          ].map((it) => (
            <NewsCard key={it.href} {...it} />
          ))}
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <NewsCard
            key={it.href}
            {...it}
            imageSrc={`https://picsum.photos/seed/${encodeURIComponent(it.href)}/1200/675`}
            imageAlt={it.title}
          />
        ))}
      </div>

      <div className="mt-10 text-center text-sm opacity-70">Pagination coming soon</div>
    </main>
  )
}
