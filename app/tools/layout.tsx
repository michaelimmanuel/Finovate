"use client";

import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
import ChatbotBox from "@/components/chatbottools/ChatbotBox";
import { BudgetProvider } from "@/components/budget/BudgetProvider";
import { GoalsLoansProvider } from "@/components/finance/GoalsLoansProvider";

export default function ToolsLayout({ children }) {
  const [open, setOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  return (
    <BudgetProvider>
      <GoalsLoansProvider>
        <div className="relative min-h-screen">
          {/* ===== POPUP SUBSCRIPTION ===== */}
          {showPopup && (
            <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="w-[320px] rounded-2xl bg-white shadow-2xl p-5 animate-in zoom-in-50">
                <h2 className="text-lg font-semibold mb-1">
                  Upgrade untuk Unlimited
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Kamu sudah mencapai batas 5 chat per hari.
                </p>
                <div className="border rounded-xl p-4 mb-4">
                  <p className="font-semibold">Finovate Premium</p>
                  <p className="text-xl font-bold text-primary">
                    Rp99.000 / bulan
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Unlimited Chat + Fitur AI lengkap
                  </p>
                </div>

                <button className="w-full py-2 rounded-md bg-primary text-white font-medium hover:bg-primary/90 mb-2">
                  Beli Sekarang
                </button>
                <button
                  onClick={() => setShowPopup(false)}
                  className="w-full py-2 rounded-md border text-sm text-muted-foreground hover:bg-muted/20"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          )}

          {/* ===== MOBILE CHAT PANEL ===== */}
          {open && (
            <div className="md:hidden w-full px-4 pt-4">
              <div className="w-full rounded-2xl border border-muted bg-background shadow-xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
                  <span className="font-semibold text-primary text-sm">
                    Finovate Chatbot
                  </span>
                  <button
                    onClick={() => setOpen(false)}
                    className="text-xs text-muted-foreground hover:text-primary"
                  >
                    Close
                  </button>
                </div>
                <div className="h-[300px]">
                  <ChatbotBox onLimitReached={() => setShowPopup(true)} />
                </div>
              </div>
            </div>
          )}

          {/* ===== PAGE CONTENT ===== */}
          <div className={cn("w-full", open && "md:pt-0 pt-2")}>{children}</div>

          {/* ===== DESKTOP CHAT FLOATING ===== */}
          <div
            className={cn(
              "hidden md:block fixed right-6 bottom-20 z-50 w-[320px] rounded-2xl border border-muted bg-background shadow-2xl overflow-hidden transition-all duration-300",
              open
                ? "translate-y-0 opacity-100 pointer-events-auto"
                : "translate-y-3 opacity-0 pointer-events-none"
            )}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
              <span className="font-semibold text-primary text-sm">
                Finovate Chatbot
              </span>
              <button
                onClick={() => setOpen(false)}
                className="text-xs text-muted-foreground hover:text-primary"
              >
                Close
              </button>
            </div>
            <div className="h-[580px]">
              <ChatbotBox onLimitReached={() => setShowPopup(true)} />
            </div>
          </div>

          {/* ===== BUTTON ===== */}
          <button
            className={cn(
              "fixed right-6 bottom-6 z-40 rounded-full bg-primary text-white shadow-lg px-4 py-3 hover:bg-primary/90 transition-all flex items-center gap-2",
              open && "bg-primary/80"
            )}
            onClick={() => setOpen((p) => !p)}
          >
            Chat
          </button>
        </div>
      </GoalsLoansProvider>
    </BudgetProvider>
  );
}
