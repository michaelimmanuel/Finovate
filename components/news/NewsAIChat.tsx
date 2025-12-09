"use client";

import { useState } from "react";
import { newsData, NewsCategory } from "@/components/news/newsData";

export function NewsAIChat({
  onCategoryDetected,
  onKeywordDetected,
}: {
  onCategoryDetected?: (c: NewsCategory | null) => void; // null = all
  onKeywordDetected?: (keyword: string | null) => void; // kata dari AI
}) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<
    { role: "user" | "ai"; text: string }[]
  >([]);
  const [input, setInput] = useState("");

  function handleSend() {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages((p) => [...p, { role: "user", text: userMsg }]);

    const lower = userMsg.toLowerCase();

    // ===== Keyword extraction sederhana =====
    const stopwords = ["ke", "di", "yang", "dan", "atau", "ini", "itu"];
    const words = (lower.match(/\b[a-z0-9]{2,}\b/g) || []).filter(
      (w) => !stopwords.includes(w)
    );
    let keyword: string | null = null;

    const allNews = Object.values(newsData).flat();
    for (let w of words) {
      const found = allNews.some((n) => n.title.toLowerCase().includes(w));
      if (found) {
        keyword = w;
        break;
      }
    }

    // ===== Category detection sederhana =====
    let tag: NewsCategory | null = null;
    if (lower.includes("crypto")) tag = "crypto";
    else if (lower.includes("market")) tag = "markets";
    else if (lower.includes("stock") || lower.includes("saham")) tag = "stocks";
    else if (lower.includes("finance")) tag = "finance";
    else if (lower.includes("economy")) tag = "economy";
    else if (lower.includes("banks")) tag = "banks";
    else if (
      lower.includes("all") ||
      lower.includes("latest") ||
      lower.includes("reset")
    )
      tag = null;

    onCategoryDetected?.(tag);

    // ===== Prepare AI reply =====
    let reply =
      "Maaf, saya kurang paham. Coba sebutkan kategori: crypto, markets, stocks, finance.";

    if (tag) {
      reply = `Oke! Menampilkan berita kategori "${tag}". Semoga membantu menemukan yang kamu cari.`;
      onCategoryDetected?.(tag);
    } else if (keyword) {
      const found = Object.values(newsData)
        .flat()
        .some((n) => n.title.toLowerCase().includes(keyword.toLowerCase()));

      if (found) {
        reply = `Berita yang mengandung kata "${keyword}" berhasil ditemukan! Lihat di bawah ya.`;
      } else {
        reply = `Hmm, sepertinya tidak ada berita dengan kata "${keyword}". Kamu bisa coba cari dengan kategori atau kata kunci lain.`;
      }

      onCategoryDetected?.(null);
      onKeywordDetected?.(keyword);
    } else if (lower.includes("all") || lower.includes("latest")) {
      reply =
        "Menampilkan semua berita terbaru. Kamu bisa juga mempersempit pencarian berdasarkan kategori atau kata kunci spesifik.";
      onCategoryDetected?.(null);
    }

    setMessages((p) => [...p, { role: "ai", text: reply }]);
    setInput("");
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-black text-white px-4 py-3 rounded-full shadow-lg hover:scale-105 transition"
      >
        💬 AI Chat
      </button>

      {/* Popup Chat Box */}
      {open && (
        <div className="fixed pt-4 bottom-18 right-6 w-80 bg-white rounded-xl shadow-xl border animate-in fade-in zoom-in duration-200">
          {/* Messages Area */}
          <div className="h-96 overflow-y-auto p-6 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={m.role === "user" ? "text-right" : "text-left"}
              >
                <span
                  className={`inline-block px-3 py-2 rounded-xl ${
                    m.role === "user"
                      ? "bg-black text-white"
                      : "bg-gray-100 text-black"
                  }`}
                >
                  {m.text}
                </span>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="border-t p-3 flex gap-2">
            <input
              className="border flex-1 px-3 py-2 rounded"
              placeholder="Tanya AI…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()} // Enter untuk send
            />
            <button
              onClick={handleSend}
              className="bg-black text-white px-4 rounded"
            >
              Send
            </button>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="text-center text-xs opacity-60 py-2 w-full hover:opacity-100"
          >
            Close
          </button>
        </div>
      )}
    </>
  );
}
