"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Button } from "@/components/ui/button";

// Dummy news data
const dummyNews = [
  {
    title: "AI Revolutionizes Personal Finance",
    summary: "Artificial intelligence is transforming how individuals manage their budgets, savings, and investments.",
    source: "Finovate News",
    date: "2025-12-08",
  },
  {
    title: "Top 5 Budgeting Apps in 2025",
    summary: "A roundup of the best budgeting tools to help you stay on top of your finances this year.",
    source: "Finance Today",
    date: "2025-12-07",
  },
  {
    title: "How to Maximize Your Savings with Automation",
    summary: "Experts share tips on automating your savings to reach your financial goals faster.",
    source: "Money Matters",
    date: "2025-12-06",
  },
];

const bitcoinNews = [
  {
    title: "Bitcoin Surges Past $50,000 as Market Rallies",
    summary: "Bitcoin's price has soared above $50,000, driven by institutional investment and renewed retail interest.",
    source: "Reuters",
    date: "2025-12-08",
  },
  {
    title: "Elon Musk Tweets: 'Bitcoin to the Moon!'",
    summary: "Elon Musk's latest tweet has sent the crypto community into a frenzy, with #Bitcoin trending worldwide.",
    source: "@elonmusk (X)",
    date: "2025-12-08",
  },
  {
    title: "SEC Approves New Bitcoin ETF",
    summary: "The U.S. Securities and Exchange Commission has approved a new Bitcoin ETF, opening the door for more mainstream adoption.",
    source: "Bloomberg",
    date: "2025-12-07",
  },
  {
    title: "Crypto Analyst: 'Bitcoin Could Hit $100k'",
    summary: "Top analysts predict a bullish future for Bitcoin, citing strong fundamentals and growing demand.",
    source: "@cryptoman (X)",
    date: "2025-12-07",
  },
];

export default function NewsAggregatorPage() {
  const [search, setSearch] = useState("");
  const [news, setNews] = useState(dummyNews);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (search.trim().toLowerCase() === "bitcoin") {
      setNews(bitcoinNews);
    } else {
      setNews(dummyNews);
    }
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-primary">News Aggregator</h1>
      <form onSubmit={handleSearch} className="mb-8 flex gap-2">
        <input
          type="text"
          className="flex-1 rounded-md border border-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background"
          placeholder="Search news (e.g. bitcoin)"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <Button type="submit" variant="default">Search</Button>
      </form>
      <div className="space-y-6">
        {news.map((item, idx) => (
          <Card key={idx} className="w-full">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">{item.title}</CardTitle>
              <div className="text-xs text-muted-foreground mt-1">{item.source} • {item.date}</div>
            </CardHeader>
            <CardContent>
              <p className="text-base text-muted-foreground mb-2">{item.summary}</p>
              <Button variant="outline" size="sm" disabled>Read More</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
