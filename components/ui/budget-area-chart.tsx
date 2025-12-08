"use client"

import { Area, AreaChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

// Generate per-day dummy data for the current month
const today = new Date()
const year = today.getFullYear()
const month = today.getMonth()
const daysInMonth = new Date(year, month + 1, 0).getDate()
const chartData = Array.from({ length: daysInMonth }, (_, i) => {
  const date = new Date(year, month, i + 1);
  return {
    day: date.getDate(),
    label: date.toLocaleDateString("id-ID", { day: "2-digit", month: "short" }),
    expenses: Math.floor(Math.random() * 200_000) + 20_000,
    income: Math.floor(Math.random() * 300_000) + 250_000,
  }
})

export function BudgetAreaChart() {
  // Fake month options
  const months = [
    { label: "December 2025", value: "2025-12" },
    { label: "November 2025", value: "2025-11" },
    { label: "October 2025", value: "2025-10" },
  ];
  // Fake selected month (static for now)
  const selectedMonth = months[0].value;
  return (
    <>
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Budget Overview</CardTitle>
        <div className="flex items-center gap-2">
          <label htmlFor="month-select" className="text-sm text-muted-foreground">Month:</label>
          <select
            id="month-select"
            className="rounded-md border border-input bg-background px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            value={selectedMonth}
            disabled
            data-slot="month-select"
          >
            {months.map((m) => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </div>
      </CardHeader>
      <CardContent className="h-[33vh] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
            <defs>
              <linearGradient id="fillExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.7} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.7} />
                <stop offset="95%" stopColor="#fbbf24" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
            <Tooltip
              contentStyle={{ background: "white", border: "1px solid #fbbf24", borderRadius: 8, fontSize: 13 }}
              labelFormatter={label => `Tanggal: ${label}`}
              formatter={value => value.toLocaleString("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 })}
            />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#fbbf24"
              fill="url(#fillIncome)"
              fillOpacity={0.7}
              strokeWidth={3}
              dot={{ r: 3, stroke: "#fff", strokeWidth: 1 }}
              activeDot={{ r: 6, stroke: "#fbbf24", strokeWidth: 2, fill: "#fff" }}
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#ef4444"
              fill="url(#fillExpenses)"
              fillOpacity={0.7}
              strokeWidth={3}
              dot={{ r: 3, stroke: "#fff", strokeWidth: 1 }}
              activeDot={{ r: 6, stroke: "#ef4444", strokeWidth: 2, fill: "#fff" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <div className="flex items-center gap-6 mb-2">
          <span className="flex items-center gap-2">
            <span className="inline-block w-4 h-1.5 rounded bg-[#fbbf24]" />
            <span className="text-xs text-muted-foreground">Income</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-block w-4 h-1.5 rounded bg-[#ef4444]" />
            <span className="text-xs text-muted-foreground">Expense</span>
          </span>
        </div>
        {/* Fake AI Analysis Section */}
        <div className="mt-2 rounded-lg bg-muted/50 p-4 flex items-start gap-3 border border-muted">
          <span className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary w-8 h-8 font-bold text-lg">🤖</span>
          <div>
            <div className="font-semibold mb-1 text-sm text-primary">AI Analysis</div>
            <div className="text-sm text-muted-foreground">
              Based on your recent spending and income trends, your expenses are stable and your income is showing a positive increase. Keep up the good work! Consider saving a portion of your income for future needs.
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>

    </>
  )
}
