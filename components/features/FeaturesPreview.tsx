"use client";

import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

// ✅ data fitur utama kamu
const featureSlides = [
  {
    title: "Saving Goals",
    subtitle: "Rencana tabungan jadi jelas & terukur.",
    text:
      "Bikin goal, atur target date atau kontribusi per bulan, dan track progress sampai tercapai.",
    image: "/features/saving-goals.png",
    badge: "Core Feature",
  },
  {
    title: "Budget Tracking",
    subtitle: "Catat pengeluaran & pemasukan otomatis.",
    text:
      "Input harian, kategori otomatis dari deskripsi, dan lihat ringkasannya langsung.",
    image: "/features/budget-tracking.png",
    badge: "Core Feature",
  },
  {
    title: "Installments / Loans",
    subtitle: "Simulasi cicilan + DP + bunga.",
    text:
      "Hitung cicilan per bulan, total bunga, dan lihat chart pembayaran secara detail.",
    image: "/features/loans.png",
    badge: "Core Feature",
  },
  {
    title: "Chatbot AI",
    subtitle: "Input finance pakai bahasa biasa.",
    text:
      "Cukup ketik: 'Cicilan HP 12jt DP 2jt bunga 0% 12 bulan' dan sistem otomatis catat + hitung.",
    image: "/features/chatbot-ai.png",
    badge: "AI",
  },
  {
    title: "Today’s Market in Under a Minute",
    subtitle: "Ringkasan market cepat & gampang.",
    text:
      "AI rangkum kondisi market hari ini dalam 1 menit biar kamu tetap update tanpa ribet.",
    image: "/features/todays-market.png",
    badge: "AI",
  },
  {
    title: "Community Discussion",
    subtitle: "Diskusi & belajar bareng komunitas.",
    text:
      "Tanya jawab, sharing strategi, dan dapet insight dari user lain.",
    image: "/features/community.png",
    badge: "Community",
  },
];

function FeatureCard({
  title,
  subtitle,
  text,
  image,
  badge,
}: {
  title: string;
  subtitle: string;
  text: string;
  image: string;
  badge: string;
}) {
  return (
    <Card className="rounded-2xl border border-muted bg-background shadow-sm h-full overflow-hidden">
      {/* ✅ IMAGE PREVIEW */}
      <div className="relative w-full h-[170px] bg-muted/30">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 85vw, 33vw"
        />
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            <CardDescription className="text-xs">
              {subtitle}
            </CardDescription>
          </div>

          <span className="text-[10px] px-2 py-0.5 rounded-full border border-slate-200 bg-slate-50 text-slate-600">
            {badge}
          </span>
        </div>
      </CardHeader>

      <CardContent className="text-sm text-muted-foreground leading-relaxed">
        {text}
      </CardContent>
    </Card>
  );
}

export default function FeaturesPreview() {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Features Preview</h2>
        <p className="text-xs text-muted-foreground">
          Semua fitur utama dalam satu tempat
        </p>
      </div>

      {/* ✅ DESKTOP GRID */}
      <div className="hidden md:grid grid-cols-3 gap-3">
        {featureSlides.map((f) => (
          <FeatureCard key={f.title} {...f} />
        ))}
      </div>

      {/* ✅ MOBILE SLIDER */}
      <div className="md:hidden -mx-2 px-2">
        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2">
          {featureSlides.map((f) => (
            <div key={f.title} className="snap-start shrink-0 w-[85%] pr-1">
              <FeatureCard {...f} />
            </div>
          ))}
        </div>

        {/* dots indicator simple */}
        <div className="flex justify-center gap-1.5 mt-1">
          {featureSlides.map((_, i) => (
            <div key={i} className="h-1.5 w-1.5 rounded-full bg-muted" />
          ))}
        </div>
      </div>
    </section>
  );
}
