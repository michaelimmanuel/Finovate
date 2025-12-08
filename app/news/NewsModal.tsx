"use client";

import { Modal } from "@/components/ui/modal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { newsData } from "@/components/news/newsData";

export function NewsModal({
  modalNews,
  onClose,
}: {
  modalNews: any;
  onClose: () => void;
}) {
  if (!modalNews) return null;

  const relatedNews = modalNews.tag
    ? Object.values(newsData)
        .flat()
        .filter((n) => n.tag === modalNews.tag && n.href !== modalNews.href)
        .slice(0, 6)
    : [];

  // Sidebar dummy content
  const opinion = [
    {
      title: "Market discipline still matters",
      summary: "Quality plus disciplined cash deployment still compounds best.",
    },
  ];

  const mostRead = Object.values(newsData).flat().slice(0, 3);

  const content = modalNews.content || [modalNews.summary];

  return (
    <Modal open={!!modalNews} onClose={onClose}>
      <div className="h-full w-[85vw] max-w-7xl mx-auto py-12 grid lg:grid-cols-12 gap-10">
        {/* Main content */}
        <div className="lg:col-span-8 space-y-6 overflow-y-auto max-h-[90vh] pr-4">
          {/* Header */}
          <h2 className="font-heading text-3xl">{modalNews.title}</h2>
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground items-center">
            {modalNews.sponsoredBrand && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full uppercase tracking-wide">
                Sponsored by {modalNews.sponsoredBrand}
              </span>
            )}
            <span>{modalNews.date}</span>
            {modalNews.tag && (
              <span className="uppercase">{modalNews.tag}</span>
            )}
            <span>• John Doe</span>
          </div>

          {/* Image */}
          {modalNews.imageSrc && (
            <img
              src={modalNews.imageSrc}
              alt={modalNews.imageAlt || modalNews.title}
              className="w-full max-h-[400px] object-cover rounded-lg"
            />
          )}

          {/* Article content */}
          <div className="space-y-4">
            {Array.isArray(modalNews.content) ? (
              modalNews.content.map((p: string, i: number) => (
                <p key={i}>{p}</p>
              ))
            ) : (
              <p>{modalNews.summary}</p>
            )}
          </div>

          {/* Related news */}
          {relatedNews.length > 0 && (
            <div className="mt-6">
              <h3 className="font-heading text-xl mb-4">Related news</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedNews.map((n) => (
                  <a
                    key={n.href}
                    href={n.href}
                    className="flex flex-col border rounded-lg p-3 hover:shadow-md transition transform hover:-translate-y-1"
                  >
                    {n.imageSrc && (
                      <img
                        src={n.imageSrc}
                        alt={n.imageAlt || n.title}
                        className="h-30 w-full object-cover rounded-md mb-2"
                      />
                    )}
                    <span className="text-[10px] text-muted-foreground">
                      {n.date}
                    </span>
                    <h4 className="font-semibold text-sm line-clamp-2">
                      {n.title}
                    </h4>
                    {n.tag && (
                      <span className="text-[10px] uppercase mt-1 text-gray-500">
                        {n.tag}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar kanan */}
        <aside className="lg:col-span-4 flex flex-col gap-8">
          {/* Opinion */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center">
                <div className="border-l-4 border-accent mr-4 h-6" />
                <CardTitle className="font-heading text-2xl">Opinion</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              {opinion.map((o, i) => (
                <div key={i}>
                  <blockquote className="border-l-2 pl-3 text-xs md:text-sm">
                    &ldquo;{o.summary}&rdquo;
                  </blockquote>
                  <div className="text-xs opacity-70">— Guest contributor</div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Most Read */}
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
                <div key={it.href} className="cursor-pointer">
                  <div className="border rounded-lg p-2 flex gap-2 hover:shadow-md transition">
                    {it.imageSrc && (
                      <img
                        src={it.imageSrc}
                        alt={it.imageAlt || it.title}
                        className="h-12 w-16 object-cover rounded-md"
                      />
                    )}
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm line-clamp-2">
                        {it.title}
                      </h4>
                      <span className="text-[10px] text-muted-foreground">
                        {it.date}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>
      </div>
    </Modal>
  );
}
