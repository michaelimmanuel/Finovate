import Link from "next/link"

export default function NewsDetail({ params }: { params: { slug?: string } }) {
  const title =
    typeof params.slug === "string"
      ? params.slug.replace(/[-_]/g, " ").replace(/\b\w/g, (m) => m.toUpperCase())
      : "";
  const date = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })

  return (
    <main className="mx-auto max-w-3xl px-6 py-14">
      <div className="mb-3 text-xs opacity-70">
        <Link href="/news" className="underline">News</Link> • {date}
      </div>
      <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl tracking-tight">{title}</h1>
      <div className="mt-6 space-y-4 text-sm opacity-90">
        <p>Intro paragraph placeholder. This is where the story summary and key context will live.</p>
        <p>Body paragraph with more detail to be added during implementation. We will replace placeholders with real content and structure.</p>
        <p>Final takeaway and linkouts. Implementation will add rich media, quotes, and related items.</p>
      </div>
    </main>
  )
}
