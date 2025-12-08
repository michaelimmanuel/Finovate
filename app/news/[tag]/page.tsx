import { newsData, NewsCategory } from "@/components/news/newsData"
import { NewsSidebar } from "@/components/news/NewsSidebar"
import { NewsCard } from "@/components/news/NewsCard"

export default function NewsTagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag).toLowerCase() as NewsCategory;

  const list = newsData[tag] ?? [];

  return (
    <main className="max-w-7xl mx-auto flex">
      <NewsSidebar />

      <section className="flex-1 px-6 py-10">
        <h1 className="font-heading text-3xl mb-6 capitalize">
          {tag} News
        </h1>

        {list.length === 0 ? (
          <p>No articles found.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {list.map((item, i) => (
              <NewsCard key={i} {...item} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
