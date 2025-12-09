import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type NewsCardProps = {
  title: string;
  summary: string;
  date: string;
  tag?: string;
  href: string;
  imageSrc?: string;
  imageAlt?: string;
  compact?: boolean;
  sponsoredBrand?: string;
};

export function NewsCard({
  title,
  summary,
  date,
  tag,
  imageSrc,
  imageAlt,
  compact,
  sponsoredBrand,
}: NewsCardProps) {
  return (
    <Card
      className={
        "relative h-full overflow-hidden rounded-xl border transition-all duration-300 will-change-transform " +
        (imageSrc ? "pt-0 gap-0 " : " ") +
        (compact ? "" : "") +
        "hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20"
      }
      tabIndex={0}
    >
      {imageSrc && (
        <div
          className={
            "relative w-full overflow-hidden " +
            (compact ? "aspect-[4/3]" : "aspect-[16/9]")
          }
        >
          <Image
            src={imageSrc}
            alt={imageAlt || title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out hover:scale-[1.05] hover:brightness-[1.07]"
            priority={false}
          />

          {sponsoredBrand && !compact && (
            <div className="absolute top-4 left-4 bg-emerald-50/90 text-emerald-700 text-[10px] font-medium px-2 py-1 rounded-md border border-emerald-100">
              Sponsored by {sponsoredBrand}
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
        </div>
      )}

      <CardHeader
        className={(compact ? "py-2" : "") + (imageSrc ? " pt-4" : "")}
      >
        <CardTitle
          className={
            (compact
              ? "font-heading text-base leading-snug tracking-[0.03em]"
              : "font-heading text-xl tracking-[0.03em]") +
            " flex items-center justify-between transition-colors duration-300 hover:text-black"
          }
        >
          <span className={compact ? "line-clamp-2" : undefined}>{title}</span>
          {tag && (
            <span
              className={
                "ml-3 rounded-full border px-2 py-0.5 text-[14px] uppercase tracking-wide opacity-70 " +
                (compact ? "" : "")
              }
            >
              {tag}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className={compact ? "pt-0" : imageSrc ? "pt-2" : undefined}>
        <p
          className={
            (compact ? "text-xs opacity-70 " : "text-sm opacity-80 ") +
            "line-clamp-3 transition-colors duration-300 hover:opacity-90"
          }
        >
          {summary}
        </p>
        <div
          className={
            compact ? "mt-2 text-[10px] opacity-50" : "mt-4 text-xs opacity-60"
          }
        >
          {date}
        </div>
      </CardContent>
    </Card>
  );
}
