"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

// Dummy recommended users
const recommendedUsers = [
  { name: "Wilia", starred: false },
  { name: "Arden", starred: true },
  { name: "Mikha", starred: false },
  { name: "Zeno", starred: false },
];

// Dummy finance text
const financeTexts = [
  "Smart budgeting tips to stabilize your monthly spending.",
  "Why financial planning is essential for long-term security.",
  "Beginner-friendly investment strategies for 2025.",
  "Managing emergency funds the right way.",
  "How to build wealth slowly but consistently.",
];

export default function PeopleDetailPage() {
  const { username } = useParams(); // ← FIX
  const decoded = decodeURIComponent(username);
  // ← Aman

  const [followed, setFollowed] = useState(false);

  const posts = useMemo(() => {
    const titles = [
      "Cara Mengatur Budget Bulanan Biar Gak Boncos",
      "Kenapa Investasi Reksadana Cocok Untuk Pemula?",
      "Tips Bangun Dana Darurat di Tahun 2025",
      "Strategi Investasi Jangka Panjang Biar Stabil",
      "Cara Bikin Keuangan Lebih Terstruktur Tanpa Ribet",
    ];

    const contents = [
      "Banyak orang bocor halus karena gak sadar pengeluaran kecil. Mulai dari catat pengeluaran harian, tentukan batas kategori, dan pakai metode 50/30/20 biar lebih rapi.",
      "Reksadana cocok buat pemula karena low risk, gak perlu mikir analisa saham sendiri, dan bisa mulai dari nominal kecil. Cocok banget buat mulai bangun portofolio.",
      "Dana darurat idealnya 3–6 bulan pengeluaran. Mulai sisihkan 5–10% income per bulan dan simpan di instrumen likuid seperti deposito atau e-wallet bunga tinggi.",
      "Investasi jangka panjang fokus ke konsistensi. Pilih instrumen stabil seperti blue-chip atau indeks, hindari panic sell, dan perkuat mental selama market turun.",
      "Kalau merasa uang sering hilang entah ke mana, coba pakai auto-transfer ke tabungan, bagi pendapatan per kategori, dan hindari impulsive buying dengan aturan 24 jam.",
    ];

    const categories = ["BUDGET", "SAHAM", "INVEST", "FINANCE"];

    return Array.from({ length: 5 }, (_, i) => ({
      id: i,
      author: decoded,
      title: titles[i % titles.length],
      content: contents[i % contents.length],
      time: "3 hours ago",
      category: categories[i % categories.length],
      like: Math.floor(Math.random() * 50),
      dislike: Math.floor(Math.random() * 10),
      comment: Math.floor(Math.random() * 15),
    }));
  }, [decoded]);

  return (
    <div className="flex gap-10 p-10">
      {/* LEFT SIDEBAR */}
      <div className="w-48 border-r pr-5">
        <h2 className="font-bold mb-4 text-lg">RECOMMENDED PEOPLE</h2>

        <div className="flex flex-col gap-3">
          {recommendedUsers.map((u) => (
            <Link
              href={`/people/${encodeURIComponent(u.name)}`}
              key={u.name}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-5 h-5 rounded-full bg-gray-300" />
              <span className="text-sm group-hover:text-yellow-600">
                {u.name}
              </span>
              {u.starred && <span className="text-yellow-500 text-xs">★</span>}
            </Link>
          ))}
        </div>
      </div>

      {/* MIDDLE — POSTS */}
      <div className="flex-1">
        {posts.map((p) => (
          <div key={p.id} className="mb-10 pb-6 border-b">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-gray-300 rounded-full" />
              <span className="font-semibold">{decoded}</span>
              <span className="text-xs text-gray-500">| {p.time}</span>
            </div>

            <p className="font-bold text-sm mb-2">{p.title}</p>
            <p className="text-sm text-gray-700 mb-3">{p.content}</p>

            <div className="w-full h-48 bg-gray-300 rounded-md mb-3" />

            <div className="flex items-center gap-4 text-xs text-gray-700 mb-2">
              <span>👍 {p.like}</span>
              <span>👎 {p.dislike}</span>
              <span>💬 {p.comment}</span>
            </div>

            <span className="px-4 py-1 bg-blue-100 text-blue-600 text-xs rounded">
              {p.category}
            </span>
          </div>
        ))}
      </div>

      {/* RIGHT SIDEBAR — ABOUT */}
      <div className="w-64 pl-5 border-l">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-gray-300 rounded-full" />
            <span className="font-semibold">{decoded}</span>
          </div>

          <button
            onClick={() => setFollowed((prev) => !prev)}
            className={`px-4 py-1 rounded-full text-xs border ${
              followed
                ? "bg-white text-yellow-600 border-yellow-500"
                : "bg-yellow-500 text-white border-yellow-500"
            }`}
          >
            {followed ? "Followed" : "Follow"}
          </button>
        </div>

        <h3 className="font-bold mb-2">ABOUT</h3>
        <p className="text-sm text-gray-600 mb-4">
          Lorem ipsum dolor sit amet, ametconsectetur adipiscing elit. Lorem
          ipsum dolor sit amet, ametconsectetur adipiscing elit.
        </p>

        <div className="flex flex-col gap-2 text-sm">
          <div>📝 12 Financial</div>
          <div>📊 12 Budgeting</div>
          <div>📚 12 Other topics</div>
        </div>
      </div>
    </div>
  );
}
