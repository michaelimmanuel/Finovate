"use client";

import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
import ChatbotBox from "@/components/chatbottools/ChatbotBox";
import { BudgetProvider } from "@/components/budget/BudgetProvider";
import { GoalsLoansProvider } from "@/components/finance/GoalsLoansProvider";

export default function ToolsLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <BudgetProvider>
      <GoalsLoansProvider>
        <div className="relative min-h-screen">
          {/* ===== MOBILE TOP PANEL (push content down) ===== */}
          {open && (
            <div className="md:hidden w-full px-4 pt-4">
              <div className="w-full rounded-2xl border border-muted bg-background shadow-xl overflow-hidden">
                {/* header */}
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

                {/* body */}
                <div className="h-[300px]">
                  <ChatbotBox />
                </div>
              </div>
            </div>
          )}

          {/* ===== PAGE CONTENT ===== */}
          <div className={cn("w-full", open && "md:pt-0 pt-2")}>
            {children}
          </div>

          {/* ===== DESKTOP FLOATING PANEL ===== */}
          <div
            className={cn(
              "hidden md:block fixed right-6 bottom-20 z-50 w-[320px] rounded-2xl border border-muted bg-background shadow-2xl overflow-hidden transition-all duration-300",
              open
                ? "translate-y-0 opacity-100 pointer-events-auto"
                : "translate-y-3 opacity-0 pointer-events-none"
            )}
          >
            {/* header */}
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

            {/* fixed height biar ga makin tinggi */}
            <div className="h-[580px]">
              <ChatbotBox />
            </div>
          </div>

          {/* ===== FLOATING BUTTON ===== */}
          <button
            className={cn(
              "fixed right-6 bottom-6 z-40 rounded-full bg-primary text-white shadow-lg px-4 py-3 hover:bg-primary/90 transition-all flex items-center gap-2",
              open && "bg-primary/80"
            )}
            aria-label="Open chatbot"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="text-lg">💬</span>
            <span className="text-sm font-medium">AI Chat</span>
          </button>
        </div>
      </GoalsLoansProvider>
    </BudgetProvider>
  );
}
