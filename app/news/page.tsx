import { NewsCard } from "@/components/news/NewsCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewsIndex() {
  const latest = [
    {
      title: "Markets open mixed as yields steady",
      summary: "Equities tread water ahead of jobs data while the dollar eases; tech leadership narrows into close.",
      date: new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }),
      tag: "Markets",
      href: "/news/markets-open-mixed",
      imageSrc: "https://picsum.photos/seed/markets-open-mixed/1200/675",
      imageAlt: "Markets open mixed as yields steady",
    },
    {
      title: "AAPL edges higher on services margin",
      summary: "Service mix and App Store fees support gross margins; analysts eye subscription bundling for 2026.",
      date: new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }),
      tag: "Stocks",
      href: "/news/aapl-services-margin",
      imageSrc: "https://picsum.photos/seed/aapl-services-margin-latest/1200/675",
      imageAlt: "AAPL edges higher on services margin",
      sponsoredBrand: "Acme Research",
    },
    {
      title: "BTC holds above key level on steady ETF inflows",
      summary: "Demand from ETFs offsets miner selling as volatility cools; ETH tracks risk and gas fees normalize.",
      date: new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }),
      tag: "Crypto",
      href: "/news/btc-etf-inflows",
      imageSrc: "https://picsum.photos/seed/btc-etf-inflows-latest/1200/675",
      imageAlt: "BTC holds above key level on steady ETF inflows",
    },
    {
      title: "Energy transition capex accelerates into year-end",
      summary: "Utilities and industrials ramp spending guidance on grid hardening and storage; funding pipelines broaden.",
      date: new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }),
      tag: "Energy",
      href: "/news/energy-transition-capex",
      imageSrc: "https://picsum.photos/seed/energy-transition-capex/1200/675",
      imageAlt: "Energy transition capex accelerates",
      sponsoredBrand: "GridX Capital",
    },
  ]
  const mostRead = [
    {
      title: "AAPL edges higher on services margin",
      summary: "Service mix and App Store fees support gross margins.",
      date: new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }),
      tag: "Most Read",
      href: "/news/aapl-services-margin",
      imageSrc: "https://picsum.photos/seed/aapl-services-margin/400/300",
      imageAlt: "AAPL services margin",
      sponsoredBrand: "Acme Research",
    },
    {
      title: "BTC holds above key level on ETF demand",
      summary: "ETF flows steady as volatility cools; range holds.",
      date: new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }),
      tag: "Most Read",
      href: "/news/btc-etf-inflows",
      imageSrc: "https://picsum.photos/seed/btc-etf-inflows/400/300",
      imageAlt: "BTC holds above key level",
    },
    {
      title: "Cooling inflation keeps yields steady",
      summary: "Price data supports soft-landing hopes; curve little changed.",
      date: new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }),
      tag: "Most Read",
      href: "/news/cooling-inflation-yields-steady",
      imageSrc: "https://picsum.photos/seed/cooling-inflation-yields-steady/400/300",
      imageAlt: "Cooling inflation keeps yields steady",
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

      {/* Top Story separated */}
      <section className="mb-12">
        <Card className="overflow-hidden">
          <div className="relative w-full h-[280px] md:h-[360px] lg:h-[400px]">
            <img
              src="https://picsum.photos/seed/topstory/1600/900"
              alt="Top Story hero"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-white max-w-2xl">
              <div className="mb-2 inline-block rounded-full border border-white/40 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-wide">Top Story</div>
              <h2 className="font-heading text-2xl md:text-3xl leading-tight">
                Growth stocks lead early rotation as yields stabilize
              </h2>
              <p className="mt-3 text-sm md:text-base opacity-90">
                Tech and selective cyclicals catch a bid while rate-sensitive defensives lag; flows hint at incremental risk appetite.
              </p>
            </div>
          </div>
          <CardContent className="mt-4">
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-full border px-3 py-1">Markets</span>
              <span className="rounded-full border px-3 py-1">Rotation</span>
              <span className="rounded-full border px-3 py-1">Flows</span>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Main grid below top story */}
      <section className="grid gap-12 lg:grid-cols-12">
        {/* Latest column */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div>
            <div className="mb-5 flex items-center">
              <div className="border-l-4 border-accent mr-4 h-7" />
              <h3 className="font-heading text-2xl">Latest</h3>
            </div>
            <div className="grid gap-y-6 gap-x-10 md:grid-cols-2">
              {latest.map((it) => (
                <NewsCard key={it.href} {...it} />
              ))}
            </div>
          </div>
          <div>
            <div className="mb-5 flex items-center">
              <div className="border-l-4 border-accent mr-4 h-7" />
              <h3 className="font-heading text-2xl">In Focus</h3>
            </div>
            <div className="grid gap-y-6 gap-x-10 md:grid-cols-2">
              {latest.concat(mostRead).slice(0, 4).map((it) => (
                <NewsCard key={it.href + "-focus"} {...it} compact />
              ))}
            </div>
          </div>
        </div>
        {/* Sidebar */}
        <aside className="lg:col-span-4 flex flex-col gap-8">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center">
                <div className="border-l-4 border-accent mr-4 h-6" />
                <CardTitle className="font-heading text-2xl">Opinion</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <blockquote className="border-l-2 pl-3 text-xs md:text-sm">
                &ldquo;Quality plus disciplined cash deployment still compounds best in this tape.&rdquo;
              </blockquote>
              <div className="text-xs opacity-70">— Guest contributor</div>
              <a href="#" className="text-xs underline">Read column</a>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center">
                <div className="border-l-4 border-accent mr-4 h-6" />
                <CardTitle className="font-heading text-2xl">Most Read</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {mostRead.map((it) => (
                <NewsCard key={it.href} {...it} compact />
              ))}
            </CardContent>
          </Card>
        </aside>
      </section>
      <div className="mt-12 text-center text-sm opacity-70">More pagination & filters coming soon</div>
    </main>
  )
}
