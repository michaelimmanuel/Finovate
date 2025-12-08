"use client"


import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis, Tooltip, ResponsiveContainer } from "recharts"
import { useState } from "react"

// Dummy savings data for the current year
const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]
const savingsData = months.map((month, i) => ({
  month,
  amount: 2_000_000 + Math.floor(Math.random() * 2_000_000) + i * 500_000,
  fill: "#22c55e" // Tailwind green-500
}))

export default function SavingsTrackerPage() {
  // Fake month selection
  const [selectedMonth] = useState("December 2025")
  return (
    <main className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Savings Tracker</h1>
      <div className="mb-12 w-full">
        <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold">Savings Tracker</CardTitle>
          <div className="flex items-center gap-2">
            <label htmlFor="month-select" className="text-sm text-muted-foreground">Month:</label>
            <select
              id="month-select"
              className="rounded-md border border-input bg-background px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              value={selectedMonth}
              disabled
              data-slot="month-select"
            >
              <option value="December 2025">2025</option>
            </select>
          </div>
        </CardHeader>
        <CardContent className="h-[33vh] w-full flex flex-col items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={savingsData} margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
              <Tooltip
                cursor={{ fill: "#22c55e22" }}
                formatter={value => value.toLocaleString("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 })}
              />
              <Bar
                dataKey="amount"
                fill="#22c55e"
                radius={[8, 8, 0, 0]}
                activeBar={({ ...props }) => (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke="#16a34a"
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                )}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          {/* Fake AI Analysis Section */}
          <div className="mt-2 rounded-lg bg-muted/50 p-4 flex items-start gap-3 border border-muted">
            <span className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary w-8 h-8 font-bold text-lg">🤖</span>
            <div>
              <div className="font-semibold mb-1 text-sm text-primary">AI Analysis</div>
              <div className="text-sm text-muted-foreground">
                Your savings are growing steadily! Consider setting a monthly savings goal and automating transfers to maximize your financial growth.
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
        {/* Detailed Analysis Section */}
        <section className="w-full mx-auto mt-8">
          <div className="rounded-2xl bg-background p-8 shadow-lg">
            <h2 className="font-bold text-2xl mb-4 text-primary">Detailed Savings Analysis & Recommendations</h2>
            <ul className="list-disc pl-6 space-y-3 text-base text-muted-foreground mb-6">
              <li><span className="font-semibold text-primary">Consistent Growth:</span> Your savings have increased steadily throughout the year, reflecting strong financial discipline and a commitment to your goals.</li>
              <li><span className="font-semibold text-primary">Monthly Contributions:</span> Regular monthly contributions are key to your progress. Maintaining or increasing these contributions will accelerate your savings growth.</li>
              <li><span className="font-semibold text-primary">Interest & Returns:</span> Consider placing your savings in high-yield accounts or low-risk investments to maximize returns while keeping your funds accessible.</li>
              <li><span className="font-semibold text-primary">Goal Setting:</span> Setting specific, measurable savings goals (e.g., emergency fund, travel, or major purchases) can help you stay motivated and track your progress more effectively.</li>
              <li><span className="font-semibold text-primary">Review & Adjust:</span> Periodically review your savings plan and adjust your monthly targets as your income or expenses change.</li>
            </ul>
            <div className="text-lg text-primary font-bold mb-2">Actionable Recommendations:</div>
            <ol className="list-decimal pl-6 space-y-2 text-base">
              <li>Increase your monthly savings amount by 10% if your budget allows.</li>
              <li>Automate transfers to your savings account right after each payday.</li>
              <li>Explore safe investment vehicles to grow your savings further.</li>
              <li>Set a clear goal for your emergency fund and track your progress monthly.</li>
              <li>Celebrate milestones to stay motivated on your savings journey.</li>
            </ol>
          </div>
        </section>
      </div>
    </main>
  )
}
