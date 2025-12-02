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
  compact?: boolean
  sponsoredBrand?: string
}

export function NewsCard({ title, summary, date, tag, href, imageSrc, imageAlt, compact, sponsoredBrand }: NewsCardProps) {
  return (
    <Link href={href} className="block group">
      <Card className={"h-full transition-colors group-hover:border-black " + (compact ? "pt-2" : "")}>
        {imageSrc && (
          <div className={"relative w-full overflow-hidden " + (compact ? "aspect-[4/3] rounded-md" : "aspect-[16/9] rounded-t-lg") }>
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
        <CardHeader className={compact ? "py-2" : undefined}>
          <CardTitle className={(compact ? "font-heading text-base leading-snug tracking-[0.03em]" : "font-heading text-xl tracking-[0.03em]") + " flex items-center justify-between"}>
            <span className={compact ? "line-clamp-2" : undefined}>{title}</span>
            {tag && (
              <span className={"ml-3 rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wide opacity-70 " + (compact ? "" : "")}>{tag}</span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className={compact ? "pt-0" : undefined}>
          <p className={(compact ? "text-xs opacity-70 line-clamp-3" : "text-sm opacity-80 line-clamp-3")}>{summary}</p>
          <div className={compact ? "mt-2 text-[10px] opacity-50" : "mt-4 text-xs opacity-60"}>{date}</div>
          {sponsoredBrand && (
            <div className={"mt-2 text-[10px] tracking-wide uppercase " + (compact ? "opacity-60" : "opacity-50")}
                 aria-label={`Sponsored by ${sponsoredBrand}`}>Sponsored by {sponsoredBrand}</div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
