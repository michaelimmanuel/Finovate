"use client"
import Link from "next/link"

const sections = [
  {
    title: "Financial",
    items: ["Markets", "Stocks", "Energy"]
  },
  {
    title: "Crypto",
    items: ["Crypto"]   // atau subcategories kalau ada
  }
]

export function NewsSidebar() {
  return (
    <aside className="w-64 border-r pr-6 py-10 hidden md:block">
      <nav className="space-y-8">
        {sections.map(section => (
          <div key={section.title}>
            <h4 className="font-semibold text-sm mb-2">{section.title}</h4>
            <ul className="space-y-1">
              {section.items.map(item => (
                <li key={item}>
                  <Link
                    href={`/news/${item.toLowerCase()}`}
                    className="block px-2 py-1 rounded hover:bg-accent/10"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
