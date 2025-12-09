"use client";

import React, { useEffect, useState } from "react";
import FeaturesPreview from "@/components/features/FeaturesPreview";
import { cn } from "@/lib/utils";

export default function FeaturesOnboardingModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // ✅ 1) cek login (placeholder)
    // GANTI ini sesuai auth kamu:
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("token") // misal kamu simpen token disini
        : null;

    const isLoggedIn = !!token;

    // ✅ 2) cek apakah user pernah close modal sebelumnya
    const dismissed =
      typeof window !== "undefined"
        ? localStorage.getItem("features_onboarding_dismissed")
        : null;

    if (!isLoggedIn && !dismissed) {
      setOpen(true);
    }
  }, []);

  function closeModal() {
    setOpen(false);
  }

  function dontShowAgain() {
    localStorage.setItem("features_onboarding_dismissed", "1");
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeModal}
      />

      {/* modal box */}
      <div
        className={cn(
          "relative z-10 w-[92%] max-w-6xl rounded-2xl bg-white shadow-2xl border border-muted",
          "max-h-[85vh] overflow-y-auto"
        )}
      >
        {/* header */}
        <div className="sticky top-0 bg-white border-b px-5 py-4 flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold">
              Welcome to Finovate 👋
            </div>
            <div className="text-sm text-muted-foreground">
              Ini fitur utama yang bisa kamu pakai
            </div>
          </div>

          <button
            onClick={closeModal}
            className="text-sm text-muted-foreground hover:text-primary"
          >
            Close
          </button>
        </div>

        {/* body */}
        <div className="px-5 py-5">
          <FeaturesPreview />
        </div>

        {/* footer */}
        <div className="border-t px-5 py-4 flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
          <button
            onClick={dontShowAgain}
            className="text-xs text-muted-foreground hover:text-primary"
          >
            Don’t show this again
          </button>

          <div className="flex gap-2">
            <button
              onClick={closeModal}
              className="rounded-full px-4 py-2 text-sm border border-muted hover:bg-muted"
            >
              Explore dulu
            </button>
            <a
              href="/login"
              className="rounded-full px-4 py-2 text-sm bg-primary text-white hover:bg-primary/90 text-center"
            >
              Login / Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
