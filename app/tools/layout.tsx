"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const toolsNav = [
  { label: "AI Tools Home", href: "/tools" },
  { label: "Budget Tracker", href: "/tools/budget-tracker" },
  { label: "Savings Tracker", href: "/tools/savings-tracker" },
  { label: "News Aggregator", href: "/tools/news-aggregator" },
];

export default function ToolsLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div className="relative min-h-screen">
      {/* Left Sidebar Navigation - overlays content */}
      <aside
        className={cn(
          "hidden md:flex flex-col fixed top-0 left-0 h-full border-r border-primary/30 bg-muted/10 py-8 px-4 gap-2 z-40 transition-all duration-300",
          sidebarOpen ? "w-56" : "w-0 px-0 overflow-hidden border-r-0"
        )}
        aria-label="Sidebar navigation"
      >
        {/* Hamburger button always visible at left edge when sidebar is closed */}
        {!sidebarOpen && (
          <button
            className="fixed left-2 top-6 z-50 bg-background border border-muted rounded p-2 shadow hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/30"
            aria-label="Show sidebar"
            onClick={() => setSidebarOpen(true)}
            tabIndex={0}
          >
            <span className="inline-block w-6 h-6">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
            </span>
          </button>
        )}
        <div className={cn("flex items-center justify-between mb-6", !sidebarOpen && "mb-0")}> 
          {sidebarOpen && <span className="font-heading text-xl font-bold text-primary">Finovate Tools</span>}
          {sidebarOpen && (
            <button
              className="ml-auto text-muted-foreground hover:text-primary rounded p-1 focus:outline-none focus:ring-2 focus:ring-primary/30"
              aria-label="Hide sidebar"
              onClick={() => setSidebarOpen(false)}
              tabIndex={0}
            >
              <span className="inline-block w-6 h-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M15 18l-6-6 6-6" /></svg>
              </span>
            </button>
          )}
        </div>
        {sidebarOpen && (
          <nav className="flex flex-col gap-1 border-t border-muted pt-4">
            {toolsNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-base font-medium hover:bg-primary/10 hover:text-primary transition",
                  typeof window !== "undefined" && window.location.pathname === item.href && "bg-primary/10 text-primary"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </aside>
      <div className="w-full">{children}</div>
      {/* Chatbot Sidebar Toggle Button */}
      <button
        className={cn(
          "fixed right-6 bottom-6 z-40 rounded-full bg-primary text-white shadow-lg p-4 hover:bg-primary/90 transition-all",
          open && "bg-primary/80"
        )}
        aria-label="Open chatbot"
        onClick={() => setOpen((v) => !v)}
      >
        💬
      </button>
      {/* Chatbot Sidebar */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-[350px] max-w-full bg-white border-l border-muted shadow-2xl z-50 flex flex-col transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-muted bg-muted/50">
          <span className="font-semibold text-primary">Finovate Chatbot</span>
          <button
            className="text-muted-foreground hover:text-primary"
            aria-label="Close chatbot"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {/* Fake chat messages */}
          <div className="flex flex-col gap-2">
            <div className="self-end bg-primary text-white rounded-lg px-3 py-2 max-w-[80%]">Hi, I need help with my budget.</div>
            <div className="self-start bg-muted rounded-lg px-3 py-2 max-w-[80%]">Sure! I can help you analyze your expenses or set savings goals. What would you like to do?</div>
            <div className="self-end bg-primary text-white rounded-lg px-3 py-2 max-w-[80%]">How can I save more each month?</div>
            <div className="self-start bg-muted rounded-lg px-3 py-2 max-w-[80%]">Try setting a fixed savings target and automate transfers. Would you like some tips?</div>
          </div>
        </div>
        <form className="p-4 border-t border-muted flex gap-2">
          <input
            type="text"
            className="flex-1 rounded-md border border-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background"
            placeholder="Type your message..."
            disabled
          />
          <button
            type="submit"
            className="rounded-md bg-primary text-white px-4 py-2 text-sm font-medium shadow hover:bg-primary/90"
            disabled
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
