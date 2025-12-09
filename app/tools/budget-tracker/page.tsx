"use client";

import React, { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBudget } from "@/components/budget/BudgetProvider";

type TabKey = "overview" | "input";

const categories = [
  "Food & Drink",
  "Transport",
  "Shopping",
  "Bills",
  "Entertainment",
  "Other",
];

function formatIDR(n: number) {
  return n.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
}

function buildAIInsight({
  monthlyIncome,
  monthlyExpenses,
  remaining,
  chartData,
}: {
  monthlyIncome: number;
  monthlyExpenses: number;
  remaining: number;
  chartData: { date: string; income: number; expenses: number }[];
}) {
  const expenseRatio =
    monthlyIncome > 0 ? monthlyExpenses / monthlyIncome : 0;

  const last7 = chartData.slice(-7);
  const prev7 = chartData.slice(-14, -7);

  const sum = (arr: typeof last7) =>
    arr.reduce((s, d) => s + d.expenses, 0);

  const last7Expenses = sum(last7);
  const prev7Expenses = sum(prev7);

  const trendUp =
    prev7.length > 0 && last7Expenses > prev7Expenses * 1.1;
  const trendDown =
    prev7.length > 0 && last7Expenses < prev7Expenses * 0.9;

  let headline = "AI Analysis";
  let text = "";

  if (monthlyIncome === 0) {
    text =
      "You haven't added any income this month. Add income entries to get more accurate insights.";
  } else if (expenseRatio < 0.5) {
    text =
      "Great job! Your expenses are well controlled and below 50% of your income. You have strong room to save or invest.";
  } else if (expenseRatio < 0.8) {
    text =
      "Your spending is healthy and still within a safe range. Keep tracking daily expenses to maintain consistency.";
  } else {
    text =
      "Your expenses are quite high relative to income. Consider setting a daily cap or reviewing recurring bills.";
  }

  if (trendUp) {
    text +=
      " In the last 7 days, spending has increased noticeably. Watch for impulse purchases this week.";
  } else if (trendDown) {
    text +=
      " Nice! Spending in the last 7 days is trending down compared to the previous week.";
  } else if (prev7.length > 0) {
    text +=
      " Spending trend in the last week is stable — good consistency.";
  }

  if (remaining < 0) {
    text +=
      " You're currently overspending this month. Try cutting 1–2 non-essential categories.";
  } else {
    const saveTarget = Math.round(monthlyIncome * 0.2);
    text += ` Suggested monthly saving target: ${formatIDR(saveTarget)}.`;
  }

  return { headline, text };
}

function getMonthKey(dateStr: string) {
  return dateStr.slice(0, 7);
}

export default function BudgetTrackerPage() {
  const {
    incomeEntries,
    expenseEntries,
    addIncome,
    addExpense,
    updateExpense,
    deleteExpense,
  } = useBudget();

  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  const todayStr = new Date().toISOString().slice(0, 10);
  const currentMonthKey = getMonthKey(todayStr);

  // ====== INPUT FORMS
  const [incomeForm, setIncomeForm] = useState({
    date: todayStr,
    amount: "",
  });

  const [expenseForm, setExpenseForm] = useState({
    date: todayStr,
    description: "",
    category: categories[0],
    amount: "",
  });

  // ====== EDIT STATE
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    date: "",
    description: "",
    category: categories[0],
    amount: "",
  });

  // ====== FILTER DATA BULAN INI
  const incomesThisMonth = useMemo(
    () => incomeEntries.filter((i) => getMonthKey(i.date) === currentMonthKey),
    [incomeEntries, currentMonthKey]
  );

  const expensesThisMonth = useMemo(
    () => expenseEntries.filter((e) => getMonthKey(e.date) === currentMonthKey),
    [expenseEntries, currentMonthKey]
  );

  // ====== TOTALS
  const monthlyIncome = useMemo(
    () => incomesThisMonth.reduce((sum, i) => sum + i.amount, 0),
    [incomesThisMonth]
  );

  const monthlyExpenses = useMemo(
    () => expensesThisMonth.reduce((sum, e) => sum + e.amount, 0),
    [expensesThisMonth]
  );

  const remaining = monthlyIncome - monthlyExpenses;

  // ====== CHART DATA (agregasi per hari)
  const chartData = useMemo(() => {
    const dayMap = new Map<
      string,
      { label: string; income: number; expenses: number }
    >();

    function ensureDay(dateStr: string) {
      if (!dayMap.has(dateStr)) {
        const d = new Date(dateStr);
        const label = d.toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
        });
        dayMap.set(dateStr, { label, income: 0, expenses: 0 });
      }
    }

    incomesThisMonth.forEach((i) => {
      ensureDay(i.date);
      dayMap.get(i.date)!.income += i.amount;
    });

    expensesThisMonth.forEach((e) => {
      ensureDay(e.date);
      dayMap.get(e.date)!.expenses += e.amount;
    });

    return [...dayMap.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, v]) => ({ date, ...v }));
  }, [incomesThisMonth, expensesThisMonth]);

  // ====== MONTHLY CHART DATA (last 3 months)
  const monthlyChartData = useMemo(() => {
    const monthMap = new Map<
      string,
      { month: string; income: number; expenses: number }
    >();

    incomeEntries.forEach((i) => {
      const m = getMonthKey(i.date);
      if (!monthMap.has(m))
        monthMap.set(m, { month: m, income: 0, expenses: 0 });
      monthMap.get(m)!.income += i.amount;
    });

    expenseEntries.forEach((e) => {
      const m = getMonthKey(e.date);
      if (!monthMap.has(m))
        monthMap.set(m, { month: m, income: 0, expenses: 0 });
      monthMap.get(m)!.expenses += e.amount;
    });

    return [...monthMap.values()]
      .sort((a, b) => a.month.localeCompare(b.month))
      .slice(-3)
      .map((x) => ({
        ...x,
        monthLabel: new Date(x.month + "-01").toLocaleDateString("id-ID", {
          month: "short",
          year: "numeric",
        }),
      }));
  }, [incomeEntries, expenseEntries]);

  // ====== ACTIONS (pakai provider)
  function onAddIncome(e: React.FormEvent) {
    e.preventDefault();
    if (!incomeForm.date || !incomeForm.amount) return;

    addIncome({
      date: incomeForm.date,
      amount: Number(incomeForm.amount),
    });

    setIncomeForm({ date: todayStr, amount: "" });
    setActiveTab("overview");
  }

  function onAddExpense(e: React.FormEvent) {
    e.preventDefault();
    if (!expenseForm.date || !expenseForm.description || !expenseForm.amount)
      return;

    addExpense({
      date: expenseForm.date,
      description: expenseForm.description,
      category: expenseForm.category,
      amount: Number(expenseForm.amount),
    });

    setExpenseForm({
      date: todayStr,
      description: "",
      category: categories[0],
      amount: "",
    });
    setActiveTab("overview");
  }

  function startEdit(ex: any) {
    setEditingId(ex.id);
    setEditForm({
      date: ex.date,
      description: ex.description,
      category: ex.category,
      amount: String(ex.amount),
    });
  }

  function saveEdit(id: string) {
    updateExpense(id, {
      date: editForm.date,
      description: editForm.description,
      category: editForm.category,
      amount: Number(editForm.amount),
    });
    setEditingId(null);
  }

  function cancelEdit() {
    setEditingId(null);
  }

  function handleDelete(id: string) {
    deleteExpense(id);
  }

  return (
    <main className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Budget Tracker</h1>
        <p className="text-muted-foreground">
          Data kamu update realtime. Tambah expenses/income → chart langsung berubah.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <TabButton
          active={activeTab === "overview"}
          onClick={() => setActiveTab("overview")}
        >
          Budget Overview
        </TabButton>
        <TabButton
          active={activeTab === "input"}
          onClick={() => setActiveTab("input")}
        >
          Input Budget
        </TabButton>
      </div>

      {activeTab === "overview" ? (
        <>
          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardDescription>Monthly Income</CardDescription>
                <CardTitle className="text-lg">
                  {formatIDR(monthlyIncome)}
                </CardTitle>
              </CardHeader>
            </Card>

            <Card className="rounded-2xl">
              <CardHeader>
                <CardDescription>Total Expenses</CardDescription>
                <CardTitle className="text-lg">
                  {formatIDR(monthlyExpenses)}
                </CardTitle>
              </CardHeader>
            </Card>

            <Card className="rounded-2xl">
              <CardHeader>
                <CardDescription>Remaining</CardDescription>
                <CardTitle
                  className={`text-lg ${remaining < 0 ? "text-destructive" : "text-primary"
                    }`}
                >
                  {formatIDR(remaining)}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Daily Chart */}
          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Spending Trend</CardTitle>
              <CardDescription>
                Income vs Expenses per day (bulan ini)
              </CardDescription>
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
                  <XAxis
                    dataKey="label"
                    interval={0}
                    padding={{ left: 10, right: 10 }}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    fontSize={12}
                  />
                  <Tooltip
                    contentStyle={{ background: "white", border: "1px solid #fbbf24", borderRadius: 8, fontSize: 13 }}
                    labelFormatter={(label) => `Tanggal: ${label}`}
                    formatter={(value: any) => formatIDR(Number(value))}
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
          </Card>

          {/* AI Analysis Card */}
          {(() => {
            const ai = buildAIInsight({
              monthlyIncome,
              monthlyExpenses,
              remaining,
              chartData,
            });
            return (
              <Card className="rounded-2xl">
                <CardContent className="py-6 flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-lg">
                    🤖
                  </div>
                  <div>
                    <div className="font-semibold mb-1">{ai.headline}</div>
                    <div className="text-sm text-muted-foreground leading-relaxed">
                      {ai.text}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })()}

          {/* Expense History */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">Expense History</CardTitle>
              <CardDescription>Latest entries first</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {expensesThisMonth.length === 0 && (
                <div className="text-sm text-muted-foreground">
                  No expenses yet. Add one from “Input Budget”.
                </div>
              )}

              {expensesThisMonth.map((ex) => {
                const isEditing = editingId === ex.id;

                return (
                  <div
                    key={ex.id}
                    className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 rounded-xl border border-muted p-3 bg-background"
                  >
                    {!isEditing ? (
                      <div className="flex-1">
                        <div className="font-medium">
                          {ex.description}
                          <span className="ml-2 text-xs text-muted-foreground">
                            • {ex.category}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {ex.date}
                        </div>
                      </div>
                    ) : (
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-2">
                        <Input
                          type="date"
                          value={editForm.date}
                          onChange={(e) =>
                            setEditForm((f) => ({ ...f, date: e.target.value }))
                          }
                        />
                        <Input
                          placeholder="Description"
                          value={editForm.description}
                          onChange={(e) =>
                            setEditForm((f) => ({
                              ...f,
                              description: e.target.value,
                            }))
                          }
                        />
                        <select
                          className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                          value={editForm.category}
                          onChange={(e) =>
                            setEditForm((f) => ({
                              ...f,
                              category: e.target.value,
                            }))
                          }
                        >
                          {categories.map((c) => (
                            <option key={c}>{c}</option>
                          ))}
                        </select>
                        <Input
                          type="number"
                          placeholder="Amount"
                          value={editForm.amount}
                          onChange={(e) =>
                            setEditForm((f) => ({
                              ...f,
                              amount: e.target.value,
                            }))
                          }
                        />
                      </div>
                    )}

                    {!isEditing ? (
                      <div className="flex items-center gap-3">
                        <div className="font-semibold">
                          {formatIDR(ex.amount)}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => startEdit(ex)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(ex.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Button size="sm" onClick={() => saveEdit(ex.id)}>
                          Save
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={cancelEdit}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Monthly Overview */}
          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Monthly Overview</CardTitle>
              <CardDescription>
                Income vs Expenses (last 3 months)
              </CardDescription>
            </CardHeader>

            <CardContent className="h-[28vh] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyChartData} margin={{ left: 12, right: 12 }}>
                  <defs>
                    <linearGradient id="fillExpM" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.7} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="fillIncM" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.7} />
                      <stop offset="95%" stopColor="#fbbf24" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="monthLabel"
                    interval={0}
                    padding={{ left: 13, right: 13 }}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    fontSize={12}
                  />
                  <Tooltip
                    contentStyle={{ background: "white", border: "1px solid #fbbf24", borderRadius: 8, fontSize: 13 }}
                    formatter={(value: any) => formatIDR(Number(value))}
                  />

                  <Area
                    type="monotone"
                    dataKey="income"
                    stroke="#fbbf24"
                    fill="url(#fillIncM)"
                    fillOpacity={0.7}
                    strokeWidth={3}
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    stroke="#ef4444"
                    fill="url(#fillExpM)"
                    fillOpacity={0.7}
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Detailed Budget Analysis & Recommendations */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">
                Detailed Budget Analysis & Recommendations
              </CardTitle>
              <CardDescription>
                Insight based on your income and spending pattern
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 text-muted-foreground">
              <ul className="list-disc pl-6 space-y-3 text-base">
                <li>
                  <span className="font-semibold text-primary">Income Growth:</span>{" "}
                  Your income has shown a consistent upward trend this month. This positive growth provides an excellent
                  opportunity to allocate more funds toward savings or investments.
                </li>
                <li>
                  <span className="font-semibold text-primary">Expense Stability:</span>{" "}
                  Your daily expenses remain stable, indicating good control over discretionary spending. However,
                  review recurring expenses to identify any potential savings.
                </li>
                <li>
                  <span className="font-semibold text-primary">Savings Rate:</span>{" "}
                  Consider setting a target to save at least 20% of your monthly income. Automating transfers to a
                  dedicated savings account can help you achieve this goal effortlessly.
                </li>
                <li>
                  <span className="font-semibold text-primary">Emergency Fund:</span>{" "}
                  If you haven't already, build an emergency fund covering 3–6 months of living expenses to provide
                  security in case of unexpected events.
                </li>
                <li>
                  <span className="font-semibold text-primary">Budget Review:</span>{" "}
                  Regularly review your budget and adjust categories as your financial situation evolves.
                </li>
              </ul>

              <div className="pt-2">
                <div className="text-lg text-primary font-bold mb-2">
                  Actionable Recommendations:
                </div>
                <ol className="list-decimal pl-6 space-y-2 text-base">
                  <li>Increase your monthly savings by 5–10% to take advantage of rising income.</li>
                  <li>Audit subscriptions and recurring payments for possible reductions.</li>
                  <li>Set a monthly spending cap for non-essential categories.</li>
                  <li>Track your progress weekly to stay motivated.</li>
                  <li>Explore investments suitable for your risk profile.</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          {/* INPUT TAB */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Income Form */}
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg">Input Daily Income</CardTitle>
                <CardDescription>
                  Kamu bisa input income kapan pun (mis. gajian, freelance, dll)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={onAddIncome} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-sm text-muted-foreground">Date</label>
                    <Input
                      type="date"
                      value={incomeForm.date}
                      onChange={(e) =>
                        setIncomeForm((f) => ({ ...f, date: e.target.value }))
                      }
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm text-muted-foreground">
                      Amount (IDR)
                    </label>
                    <Input
                      type="number"
                      placeholder="e.g. 500000"
                      value={incomeForm.amount}
                      onChange={(e) =>
                        setIncomeForm((f) => ({ ...f, amount: e.target.value }))
                      }
                    />
                  </div>

                  <Button className="rounded-full px-8" type="submit">
                    Save Income
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Expense Form */}
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg">Add New Expense</CardTitle>
                <CardDescription>
                  Satu hari bisa input berkali-kali, nanti kejumlah otomatis.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={onAddExpense} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-sm text-muted-foreground">Date</label>
                    <Input
                      type="date"
                      value={expenseForm.date}
                      onChange={(e) =>
                        setExpenseForm((f) => ({ ...f, date: e.target.value }))
                      }
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm text-muted-foreground">
                      Description
                    </label>
                    <Input
                      placeholder="e.g. Coffee, Lunch, Grab"
                      value={expenseForm.description}
                      onChange={(e) =>
                        setExpenseForm((f) => ({
                          ...f,
                          description: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm text-muted-foreground">
                      Category
                    </label>
                    <select
                      className="rounded-md border border-input bg-background px-3 py-2 text-sm w-full"
                      value={expenseForm.category}
                      onChange={(e) =>
                        setExpenseForm((f) => ({
                          ...f,
                          category: e.target.value,
                        }))
                      }
                    >
                      {categories.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm text-muted-foreground">
                      Amount (IDR)
                    </label>
                    <Input
                      type="number"
                      placeholder="e.g. 25000"
                      value={expenseForm.amount}
                      onChange={(e) =>
                        setExpenseForm((f) => ({
                          ...f,
                          amount: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <Button className="rounded-full px-8" type="submit">
                    Save Expense
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </main>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "px-4 py-2 rounded-full text-sm font-medium transition",
        active
          ? "bg-primary text-primary-foreground shadow"
          : "bg-muted/60 text-muted-foreground hover:bg-muted",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
