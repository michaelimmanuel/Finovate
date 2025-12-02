import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export type NewsCardProps = {
  title: string
  summary: string
  date: string
  tag?: string
  href: string
  imageSrc?: string
  imageAlt?: string
}

export function NewsCard({ title, summary, date, tag, href, imageSrc, imageAlt }: NewsCardProps) {
  return (
    <Link href={href} className="block group">
      <Card className="h-full transition-colors group-hover:border-black">
        {imageSrc && (
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-lg">
            <Image
              src={imageSrc}
              alt={imageAlt || title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              priority={false}
            />
          </div>
        )}
        <CardHeader>
          <CardTitle className="font-heading text-xl flex items-center justify-between">
            <span>{title}</span>
            {tag && (
              <span className="ml-3 rounded-full border px-2 py-0.5 text-[11px] uppercase tracking-wide opacity-70">{tag}</span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm opacity-80 line-clamp-3">{summary}</p>
          <div className="mt-4 text-xs opacity-60">{date}</div>
        </CardContent>
      </Card>
    </Link>
  )
}
