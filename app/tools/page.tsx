"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ToolsLandingPage() {
  return (
    <main className="max-w-4xl mx-auto p-8 flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="text-4xl font-bold mb-4 text-primary">Finovate AI Tools</h1>
      <p className="text-lg text-muted-foreground mb-8 text-center max-w-2xl">
        Supercharge your personal finance journey with our suite of AI-powered tools. Track your budget, grow your savings, and get smart recommendations—all in one place.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <div className="rounded-2xl border border-muted bg-background p-6 flex flex-col items-start shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2 text-primary">Budget Tracker</h2>
          <p className="text-muted-foreground mb-4">Monitor your daily expenses and income, visualize trends, and receive actionable insights to optimize your spending.</p>
          <Button asChild variant="default">
            <Link href="/tools/budget-tracker">Open Budget Tracker</Link>
          </Button>
        </div>
        <div className="rounded-2xl border border-muted bg-background p-6 flex flex-col items-start shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2 text-primary">Savings Tracker</h2>
          <p className="text-muted-foreground mb-4">Track your monthly savings, set goals, and get AI-driven recommendations to help you grow your wealth.</p>
          <Button asChild variant="default">
            <Link href="/tools/savings-tracker">Open Savings Tracker</Link>
          </Button>
        </div>
      </div>
      <div className="mt-12 text-center text-muted-foreground text-sm">
        More AI tools coming soon. Stay tuned!
      </div>
    </main>
  );
}
