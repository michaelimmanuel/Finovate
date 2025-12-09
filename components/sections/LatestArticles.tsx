"use client";

import { motion } from "framer-motion";
import { newsData } from "@/components/news/newsData";

interface NewsItem {
  title: string;
  summary: string;
  date: string;
  tag: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  sponsoredBrand?: string;
}

const allNews: NewsItem[] = Object.values(newsData).flat();
const sortedNews = allNews.sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

export function LatestArticles() {
  return (
    <section id="articles" className="bg-white text-black">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-6 text-xs tracking-wide uppercase opacity-70">
          Latest articles
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {sortedNews.slice(0, 6).map((a, i) => (
            <motion.a
              key={a.href}
              href={a.href}
              className="block rounded-xl border p-6 hover:bg-neutral-50"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
            >
              <div className="flex flex-wrap mb-2 text-xs opacity-60 items-center gap-2">
                {a.sponsoredBrand && (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full uppercase tracking-wide">
                    Sponsored by {a.sponsoredBrand}
                  </span>
                )}
                <span>
                  {a.tag} • {a.date}
                </span>
              </div>
              <h3 className="font-heading text-xl">{a.title}</h3>
              <p className="mt-1 text-sm opacity-80">{a.summary}</p>
            </motion.a>
          ))}
        </div>

        <div className="mt-8">
          <a href="/news" className="underline">
            All articles
          </a>
        </div>
      </div>
    </section>
  );
}
