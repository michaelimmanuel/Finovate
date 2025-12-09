"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image"; // ✅ NEW: untuk avatar profile
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NavBar() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // ✅ NEW: profile dropdown state + ref
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const target = e.target as Node;

      // --- close tools dropdown if click outside ---
      const clickedTools =
        menuRef.current?.contains(target) ||
        buttonRef.current?.contains(target);

      if (!clickedTools) setToolsOpen(false);

      // --- close profile dropdown if click outside ---
      const clickedProfile = profileRef.current?.contains(target);
      if (!clickedProfile) setProfileOpen(false);
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setToolsOpen(false);
        setProfileOpen(false);
        setMobileOpen(false);
      }
    }

    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="relative z-100 mx-auto max-w-7xl px-4 sm:px-6 py-4 sm:py-6">
      <div className="flex items-center justify-between text-sm">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/finovatelogo.png"
            alt="Finovate Logo"
            width={160}
            height={40}
            priority
            className="object-contain hover:opacity-80 transition"
          />
        </Link>

        {/* Desktop capsule nav */}
        <nav className="hidden lg:flex items-center gap-2 rounded-full border border-accent/40 bg-black/90 text-white px-3 py-2 shadow-sm relative">
          <Link
            href="/"
            className="rounded-full px-3 py-1 hover:text-accent transition-colors"
          >
            Home
          </Link>

          <span className="opacity-50">•</span>

          <a
            href="/discussion"
            className="rounded-full px-3 py-1 hover:text-accent transition-colors"
          >
            Discussion
          </a>

          <span className="opacity-50">•</span>

          {/* TOOLS DROPDOWN (punya kamu, tetap) */}
          <div className="relative">
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={toolsOpen}
              onClick={() => setToolsOpen((v) => !v)}
              ref={buttonRef}
              className="rounded-full px-3 py-1 hover:text-accent transition-colors inline-flex items-center gap-1"
            >
              Tools <ChevronDown className="size-4" />
            </button>

            {toolsOpen && (
              <div
                role="menu"
                ref={menuRef}
                className="absolute top-full left-0 z-50 mt-2 min-w-[220px] rounded-xl border border-accent/40 bg-black/90 text-white shadow-md p-2 flex flex-col"
              >
                <a
                  role="menuitem"
                  href="/digest"
                  className="rounded-md px-3 py-2 hover:bg-white hover:text-black transition-colors"
                >
                  Daily Digest
                </a>
                <a
                  role="menuitem"
                  href="/tools/budget-tracker"
                  className="rounded-md px-3 py-2 hover:bg-white hover:text-black transition-colors"
                >
                  Budget Tracker
                </a>
                <a
                  role="menuitem"
                  href="/tools/savings-tracker"
                  className="rounded-md px-3 py-2 hover:bg-white hover:text-black transition-colors"
                >
                  Goals and Loans
                </a>
                <a
                  role="menuitem"
                  href="#analysis"
                  className="rounded-md px-3 py-2 hover:bg-white hover:text-black transition-colors"
                >
                  AI Analysis
                </a>
              </div>
            )}
          </div>

          <span className="opacity-50">•</span>

          <a
            href="/news"
            className="rounded-full px-3 py-1 hover:text-accent transition-colors"
          >
            News
          </a>

          {/* AUTH BUTTON (punya kamu, tetap) */}
          <span className="ml-2 mr-1 h-5 w-px bg-accent/40" />
          <Button
            asChild
            variant="accent"
            className="rounded-full px-4 py-1 text-sm"
          >
            <Link href="/signup">Login / Register</Link>
          </Button>

          {/* ✅ PROFILE DROPDOWN (diambil dari code yang kamu mau) */}
          <div className="relative ml-3" ref={profileRef}>
            <button
              className="rounded-full border border-accent/40 bg-white/10 p-1 flex items-center justify-center hover:ring-2 hover:ring-accent transition"
              onClick={() => setProfileOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={profileOpen}
            >
              <img
                src="https://api.dicebear.com/7.x/lorelei/svg?seed=guest"
                width={32}
                height={32}
                alt="Profile"
                className="rounded-full"
              />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 min-w-[160px] rounded-xl border border-accent/40 bg-white text-black shadow-md p-2 flex flex-col">
                <Link
                  href="/profile"
                  className="rounded-md px-3 py-2 hover:bg-accent/10"
                >
                  Profile
                </Link>
                <button className="rounded-md px-3 py-2 text-left hover:bg-accent/10">
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile nav: hamburger + dropdown (punya kamu, tetap) */}
        <div className="lg:hidden">
          <button
            type="button"
            aria-label="Open navigation"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-full border border-black/10 bg-black/5 px-3 py-2"
          >
            <span className="sr-only">Menu</span>
            <div className="flex flex-col gap-[3px]">
              <span className="block h-[2px] w-5 bg-black" />
              <span className="block h-[2px] w-5 bg-black" />
              <span className="block h-[2px] w-5 bg-black" />
            </div>
          </button>

          {mobileOpen && (
            <div className="absolute right-4 left-4 top-16 z-50 rounded-xl border border-black/10 bg-white shadow-lg p-2">
              <a
                href="#hero"
                className="block rounded-md px-3 py-2 hover:bg-black/5"
              >
                Home
              </a>
              <a
                href="/discussion"
                className="block rounded-md px-3 py-2 hover:bg-black/5"
              >
                Discussion
              </a>
              <a
                href="/digest"
                className="block rounded-md px-3 py-2 hover:bg-black/5"
              >
                Daily Digest
              </a>
              <a
                href="/tools/budget-tracker"
                className="block rounded-md px-3 py-2 hover:bg-black/5"
              >
                Budget Tracker
              </a>
              <a
                href="/tools/savings-tracker"
                className="block rounded-md px-3 py-2 hover:bg-black/5"
              >
                Goals and Loans
              </a>
              <a
                href="#analysis"
                className="block rounded-md px-3 py-2 hover:bg-black/5"
              >
                AI Analysis
              </a>
              <a
                href="/news"
                className="block rounded-md px-3 py-2 hover:bg-black/5"
              >
                News
              </a>

              {/* (opsional) profile link di mobile, biar konsisten */}
              <a
                href="/profile"
                className="block rounded-md px-3 py-2 hover:bg-black/5"
              >
                Profile
              </a>

              <div className="mt-2 border-t border-black/10" />
              <Link
                href="/signup"
                className="mt-2 block rounded-md px-3 py-2 bg-accent text-accent-foreground text-center"
              >
                Login / Register
              </Link>
                <div className="flex items-center gap-2 mt-3">
                  <img src="https://api.dicebear.com/7.x/lorelei/svg?seed=guest" alt="Profile" className="w-8 h-8 rounded-full object-cover" />
                  <Link href="/profile" className="rounded-md px-3 py-2 hover:bg-accent/10 transition-colors">Profile</Link>
                  <button className="rounded-md px-3 py-2 text-left hover:bg-accent/10 transition-colors">Logout</button>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
