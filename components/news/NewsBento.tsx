import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function NewsBento() {
  return (
    <section className="mt-10">
      <div className="grid grid-cols-1 md:grid-cols-6 auto-rows-[140px] md:auto-rows-[170px] gap-4">
        {/* Latest Crypto News */}
        <Card className="h-full col-span-1 md:col-span-3 md:col-start-1 md:row-start-1 md:row-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-heading text-xl">Latest Crypto News</CardTitle>
            <span className="rounded-full border px-2 py-0.5 text-[11px] uppercase tracking-wide opacity-70">Crypto</span>
          </CardHeader>
          <CardContent className="text-sm opacity-80 space-y-3">
            <ul className="space-y-2">
              <li>
                <Link href="#" className="underline">BTC holds as ETF inflows steady</Link>
              </li>
              <li>
                <Link href="#" className="underline">ETH tracks risk; gas fees normalize</Link>
              </li>
              <li>
                <Link href="#" className="underline">Stablecoin volumes pick up on remittances</Link>
              </li>
            </ul>
            <div className="pt-2 text-xs">
              <Link href="#" className="underline">View all crypto</Link>
            </div>
          </CardContent>
        </Card>

        {/* Featured Stories (taller hero) */}
        <Card className="h-full col-span-1 md:col-span-3 md:col-start-4 md:row-start-1 md:row-span-3">
          <CardHeader>
            <CardTitle className="font-heading text-xl">Featured Stories</CardTitle>
          </CardHeader>
          <CardContent className="text-sm opacity-80 space-y-3">
            <div>
              <Link href="#" className="underline">Cash margins and the 2026 upgrade cycle</Link>
              <p className="mt-1 opacity-70">Why cost discipline plus pricing power drives durable EPS.</p>
            </div>
            <div>
              <Link href="#" className="underline">Semis after the supercycle</Link>
              <p className="mt-1 opacity-70">Datacenter, edge, and what’s next for AI capex.</p>
            </div>
            <div>
              <Link href="#" className="underline">The new playbook for FX</Link>
              <p className="mt-1 opacity-70">Dollar dynamics and how to think about hedging.</p>
            </div>
          </CardContent>
        </Card>

        {/* Opinion from expert */}
        <Card className="h-full col-span-1 md:col-span-2 md:col-start-1 md:row-start-3 md:row-span-2">
          <CardHeader>
            <CardTitle className="font-heading text-xl">Opinion from expert</CardTitle>
          </CardHeader>
          <CardContent className="text-sm opacity-80 space-y-2">
            <blockquote className="border-l-2 pl-3">
              "In this tape, quality with cash discipline compounds — the market is rewarding visibility over stories."
            </blockquote>
            <div className="text-xs opacity-70">— Guest contributor</div>
            <div className="pt-2 text-xs">
              <Link href="#" className="underline">Read the column</Link>
            </div>
          </CardContent>
        </Card>

        {/* Most read */}
        <Card className="h-full col-span-1 md:col-span-1 md:col-start-3 md:row-start-3 md:row-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-heading text-xl">Most read</CardTitle>
            <span className="rounded-full border px-2 py-0.5 text-[11px] uppercase tracking-wide opacity-70">Today</span>
          </CardHeader>
          <CardContent className="text-sm opacity-80">
            <ol className="list-decimal pl-5 space-y-1">
              <li><Link href="#" className="underline">AAPL edges higher on services margin</Link></li>
              <li><Link href="#" className="underline">BTC holds above key level on ETF demand</Link></li>
              <li><Link href="#" className="underline">Cooling inflation keeps yields steady</Link></li>
              <li><Link href="#" className="underline">Semis after the supercycle</Link></li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
