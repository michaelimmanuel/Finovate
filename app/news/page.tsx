"use client";
import { NewsCard } from "@/components/news/NewsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NewsModal } from "./NewsModal";
import { useState } from "react";
import { newsData, NewsCategory } from "@/components/news/newsData";
import { NewsAIChat } from "@/components/news/NewsAIChat";

export default function NewsIndex() {
  const [categoryFilter, setCategoryFilter] = useState<null | NewsCategory>(
    null
  );

  function handleCategoryChange(tag: NewsCategory | null) {
    setCategoryFilter(tag);

    if (tag === null) {
      setSearchQuery("");
    }
  } 

  const [searchQuery, setSearchQuery] = useState("");
  const [aiKeyword, setAiKeyword] = useState("");

  const allNews = Object.values(newsData).flat();
  const sortedNews = allNews.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const filteredNews = sortedNews
    .filter((item) =>
      categoryFilter ? item.tag.toLowerCase() === categoryFilter : true
    )
    .filter((item) =>
      searchQuery || aiKeyword
        ? item.title
            .toLowerCase()
            .includes((searchQuery || aiKeyword).toLowerCase())
        : true
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const [modalNews, setModalNews] = useState<null | {
    title: string;
    summary: string;
    date: string;
    tag?: string;
    href: string;
    imageSrc?: string;
    imageAlt?: string;
    sponsoredBrand?: string;
  }>(null);

  const mostRead = [
    {
      title: "AAPL edges higher on services margin",
      summary: "Service mix and App Store fees support gross margins.",
      date: new Date().toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      tag: "Most Read",
      href: "/news/aapl-services-margin",
      imageSrc: "https://picsum.photos/seed/aapl-services-margin/400/300",
      imageAlt: "AAPL services margin",
      sponsoredBrand: "Acme Research",
    },
    {
      title: "BTC holds above key level on ETF demand",
      summary: "ETF flows steady as volatility cools; range holds.",
      date: new Date().toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      tag: "Most Read",
      href: "/news/btc-etf-inflows",
      imageSrc: "https://picsum.photos/seed/btc-etf-inflows/400/300",
      imageAlt: "BTC holds above key level",
    },
    {
      title: "Cooling inflation keeps yields steady",
      summary: "Price data supports soft-landing hopes; curve little changed.",
      date: new Date().toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      tag: "Most Read",
      href: "/news/cooling-inflation-yields-steady",
      imageSrc:
        "https://picsum.photos/seed/cooling-inflation-yields-steady/400/300",
      imageAlt: "Cooling inflation keeps yields steady",
    },
  ];

  return (
    <main className="mx-auto max-w-7xl px-6 py-14">
      <header className="mb-8">
        <div className="mb-3 flex items-center gap-3 text-xs opacity-70">
          <span className="inline-block rounded-full border border-accent/50 bg-accent/10 px-3 py-1 text-[11px] font-semibold tracking-wide uppercase text-black">
            News
          </span>
          <span>
            {new Date().toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl tracking-tight">
          Latest news and market notes
        </h1>
        <div className="mt-4 flex flex-wrap gap-2 text-md ">
          {[
            "All",
            "Markets",
            "Stocks",
            "Crypto",
            "Economy",
            "Finance",
            "Banks",
          ].map((cat) => (
            <span
              key={cat}
              onClick={() => {
                setCategoryFilter(
                  cat === "All" ? null : (cat.toLowerCase() as NewsCategory)
                );
                setSearchQuery("");
              }}
              className={`cursor-pointer rounded-full border px-3 py-1 transition ${
                categoryFilter === cat.toLowerCase() ||
                (cat === "All" && !categoryFilter)
                  ? "bg-accent/20 border-accent"
                  : "border-gray-300"
              }`}
            >
              {cat}
            </span>
          ))}
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
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-white max-w-2xl">
              <div className="mb-2 inline-block rounded-full border border-white/40 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-wide">
                Top Story
              </div>
              <h2 className="font-heading text-2xl md:text-3xl leading-tight">
                Growth stocks lead early rotation as yields stabilize
              </h2>
              <p className="mt-3 text-sm md:text-base opacity-90">
                Tech and selective cyclicals catch a bid while rate-sensitive
                defensives lag; flows hint at incremental risk appetite.
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

      <div className="mt-4 mb-6">
        <input
          type="text"
          placeholder="Search news..."
          className="border px-3 py-2 rounded-full w-full md:w-2/3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Main grid below top story */}
      <section className="flex-row md:flex gap-12">
        {/* LATEST SECTION */}
        <div className="w-full">
          <div className="mb-5 flex items-center">
            <div className="border-l-4 border-accent mr-4 h-7" />
            <h3 className="font-heading text-2xl">
              {categoryFilter ? categoryFilter.toUpperCase() : "Latest"}
            </h3>
          </div>

          <div className="grid gap-y-6 gap-x-10 md:grid-cols-2">
            {filteredNews.map((it) => (
              <div
                key={it.href}
                onClick={() => setModalNews(it)}
                className="cursor-pointer"
              >
                <NewsCard {...it} />
              </div>
            ))}
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
                &ldquo;Quality plus disciplined cash deployment still compounds
                best in this tape.&rdquo;
              </blockquote>
              <div className="text-xs opacity-70">— Guest contributor</div>
              <a href="#" className="text-xs underline">
                Read column
              </a>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center">
                <div className="border-l-4 border-accent mr-4 h-6" />
                <CardTitle className="font-heading text-2xl">
                  Most Read
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {mostRead.map((it) => (
                <div
                  key={it.href}
                  onClick={() => setModalNews(it)}
                  className="cursor-pointer"
                >
                  <NewsCard {...it} compact />
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>
      </section>
      <div className="mt-12 text-center text-sm opacity-70">
        More pagination & filters coming soon
      </div>
      {/* News Modal */}
      <NewsModal modalNews={modalNews} onClose={() => setModalNews(null)} />

      <NewsAIChat
        onCategoryDetected={handleCategoryChange}
        onKeywordDetected={(k) => setSearchQuery(k || "")}
      />
    </main>
  );
}
