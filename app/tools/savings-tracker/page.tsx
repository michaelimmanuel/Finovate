"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  ReferenceLine,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  useGoalsLoans,
  GoalEntry,
  LoanEntry,
  GoalSavingEntry,
} from "@/components/finance/GoalsLoansProvider";
import { useRouter } from "next/navigation";

type TabKey = "goals" | "loans";

// ✅ helper biar aman dari NaN / Infinity
function isFiniteNumber(x: any): x is number {
  return typeof x === "number" && Number.isFinite(x);
}

function formatIDR(n: number) {
  if (!isFiniteNumber(n)) return "Rp0";
  return n.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
}

function monthsBetween(from: Date, to: Date) {
  const diff =
    (to.getFullYear() - from.getFullYear()) * 12 +
    (to.getMonth() - from.getMonth());
  return diff;
}
function addMonths(d: Date, m: number) {
  const x = new Date(d);
  x.setMonth(x.getMonth() + m);
  return x;
}

// ==== base monthly payment (standard amort)
function calcMonthlyPayment(
  principal: number,
  annualRatePct: number,
  tenorMonths: number
) {
  const r = annualRatePct / 100 / 12;
  if (r === 0) return principal / tenorMonths;
  return (principal * r) / (1 - Math.pow(1 + r, -tenorMonths));
}

// ==== floating hybrid model
function getRateForMonth(loan: LoanEntry, monthIndex: number) {
  if (loan.scheme === "fixed") return loan.annualRate;

  const fixedYears = loan.fixedYears ?? 3;
  const floatStepPct = loan.floatStepPct ?? 0.5;
  const floatStepYears = loan.floatStepYears ?? 2;
  const floatCapPct = loan.floatCapPct ?? 3;

  const fixedMonths = fixedYears * 12;
  if (monthIndex < fixedMonths) return loan.annualRate;

  const floatMonth = monthIndex - fixedMonths;
  const stepMonths = floatStepYears * 12;
  const stepCount = Math.floor(floatMonth / stepMonths);

  const totalUp = Math.min(floatCapPct, stepCount * floatStepPct);
  return loan.annualRate + totalUp;
}

function buildAmortization(loan: LoanEntry) {
  const extra = loan.extraPaymentMonthly || 0;

  let bal = loan.principal;
  let month = 0;
  let totalInterest = 0;

  const rows: {
    m: number;
    rate: number;
    interest: number;
    principalPaid: number;
    balance: number;
  }[] = [];

  while (bal > 0 && month < loan.tenorMonths + 1200) {
    const rateNow = getRateForMonth(loan, month);
    const basePayNow = calcMonthlyPayment(
      bal,
      rateNow,
      Math.max(1, loan.tenorMonths - month)
    );
    const pay = basePayNow + extra;

    const r = rateNow / 100 / 12;
    const interest = bal * r;
    let principalPaid = pay - interest;
    if (principalPaid < 0) principalPaid = 0;
    if (principalPaid > bal) principalPaid = bal;

    bal -= principalPaid;
    totalInterest += interest;

    rows.push({
      m: month + 1,
      rate: rateNow,
      interest,
      principalPaid,
      balance: bal,
    });

    month++;
  }

  const firstPay = rows.length ? rows[0].interest + rows[0].principalPaid : 0;
  return {
    basePayFirstMonth: firstPay,
    totalInterest,
    monthsToFinish: rows.length,
    rows,
  };
}

// ==== Goals analysis (✅ UPDATED biar gak crash kalau data invalid)
function analyzeGoals(goals: GoalEntry[]) {
  if (goals.length === 0) {
    return "Belum ada goals. Tambah goal dulu supaya sistem bisa hitung plan kamu.";
  }

  const today = new Date();
  const insights: string[] = [];

  goals.forEach((g) => {
    // ✅ validasi angka dulu
    const t = g.targetAmount;
    const c = g.currentBalance;
    const mc = g.monthlyContribution;

    if (!isFiniteNumber(t) || !isFiniteNumber(c)) {
      insights.push(
        `Goal "${g.name}" datanya belum valid (target/saldo). Coba edit ulang goal ini.`
      );
      return;
    }

    const remaining = t - c;

    if (!isFiniteNumber(remaining)) {
      insights.push(
        `Goal "${g.name}" datanya belum valid (remaining NaN). Coba edit ulang goal ini.`
      );
      return;
    }

    if (remaining <= 0) {
      insights.push(`Goal "${g.name}" sudah tercapai.`);
      return;
    }

    if (g.targetDate) {
      const td = new Date(g.targetDate);

      // ✅ handle invalid targetDate
      if (Number.isNaN(td.getTime())) {
        insights.push(`Goal "${g.name}" punya target date yang tidak valid.`);
        return;
      }

      const monthsLeftRaw = monthsBetween(today, td);
      const monthsLeft = isFiniteNumber(monthsLeftRaw)
        ? Math.max(1, monthsLeftRaw)
        : 1;

      const needPerMonth = Math.ceil(remaining / monthsLeft);

      insights.push(
        `Goal "${g.name}" butuh sekitar ${formatIDR(
          needPerMonth
        )}/bulan supaya tercapai sebelum ${g.targetDate}.`
      );
      return;
    }

    if (isFiniteNumber(mc) && mc > 0) {
      const monthsNeedRaw = remaining / mc;

      // ✅ kalau hasilnya invalid, jangan lanjut
      if (!isFiniteNumber(monthsNeedRaw)) {
        insights.push(
          `Goal "${g.name}" belum bisa dihitung karena kontribusi/remaining invalid.`
        );
        return;
      }

      const monthsNeed = Math.ceil(monthsNeedRaw);
      const eta = addMonths(today, monthsNeed);

      // ✅ handle invalid eta
      if (Number.isNaN(eta.getTime())) {
        insights.push(
          `Goal "${g.name}" belum bisa dihitung ETA-nya (date invalid).`
        );
        return;
      }

      insights.push(
        `Goal "${g.name}" dengan kontribusi ${formatIDR(
          mc
        )}/bulan estimasi selesai di ${eta.toISOString().slice(0, 7)}.`
      );
      return;
    }

    insights.push(
      `Goal "${g.name}" belum punya target date atau kontribusi bulanan.`
    );
  });

  return insights.join(" ");
}

export default function SavingsTrackerPage() {
  const router = useRouter();
  const {
    goals,
    loans,
    savings,
    addGoal,
    addLoan,
    addSavingToGoal,
    deleteSaving,
  } = useGoalsLoans();

  const [activeTab, setActiveTab] = useState<TabKey>("goals");

  useEffect(() => {
    function syncFromHash() {
      const h = window.location.hash.replace("#", "");
      if (h === "loans") setActiveTab("loans");
      if (h === "goals") setActiveTab("goals");
    }
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  function goTab(tab: TabKey) {
    setActiveTab(tab);
    router.replace(`/tools/savings-tracker#${tab}`);
  }

  const [goalForm, setGoalForm] = useState({
    name: "",
    targetAmount: "",
    targetDate: "",
    monthlyContribution: "",
    currentBalance: "0",
    priority: "medium" as GoalEntry["priority"],
  });

  const [loanForm, setLoanForm] = useState({
    name: "",
    assetPrice: "",
    downPayment: "",
    principal: "",
    annualRate: "",
    tenorMonths: "",
    startDate: new Date().toISOString().slice(0, 10),
    scheme: "fixed" as LoanEntry["scheme"],
    fixedYears: "3",
    floatStepPct: "0.5",
    floatStepYears: "2",
    floatCapPct: "3",
    extraPaymentMonthly: "0",
  });

  const [savingDraft, setSavingDraft] = useState<Record<string, string>>({});
  const [savingNoteDraft, setSavingNoteDraft] = useState<
    Record<string, string>
  >({});

  function submitGoal(e: React.FormEvent) {
    e.preventDefault();
    if (!goalForm.name || !goalForm.targetAmount) return;

    addGoal({
      name: goalForm.name,
      targetAmount: Number(goalForm.targetAmount),
      targetDate: goalForm.targetDate || undefined,
      monthlyContribution: goalForm.monthlyContribution
        ? Number(goalForm.monthlyContribution)
        : undefined,
      currentBalance: Number(goalForm.currentBalance || 0),
      priority: goalForm.priority,
    });

    setGoalForm({
      name: "",
      targetAmount: "",
      targetDate: "",
      monthlyContribution: "",
      currentBalance: "0",
      priority: "medium",
    });

    goTab("goals");
  }

  function submitLoan(e: React.FormEvent) {
    e.preventDefault();
    if (
      !loanForm.name ||
      !loanForm.annualRate ||
      !loanForm.tenorMonths ||
      (!loanForm.principal && !loanForm.assetPrice)
    )
      return;

    const assetPriceNum = loanForm.assetPrice
      ? Number(loanForm.assetPrice)
      : undefined;
    const dpNum = loanForm.downPayment ? Number(loanForm.downPayment) : 0;

    const principalNum = assetPriceNum
      ? Math.max(0, assetPriceNum - dpNum)
      : Number(loanForm.principal);

    addLoan({
      name: loanForm.name,
      assetPrice: assetPriceNum,
      downPayment: dpNum,
      principal: principalNum,
      annualRate: Number(loanForm.annualRate),
      tenorMonths: Number(loanForm.tenorMonths),
      startDate: loanForm.startDate,
      scheme: loanForm.scheme,
      fixedYears:
        loanForm.scheme === "floating"
          ? Number(loanForm.fixedYears || 3)
          : undefined,
      floatStepPct:
        loanForm.scheme === "floating"
          ? Number(loanForm.floatStepPct || 0.5)
          : undefined,
      floatStepYears:
        loanForm.scheme === "floating"
          ? Number(loanForm.floatStepYears || 2)
          : undefined,
      floatCapPct:
        loanForm.scheme === "floating"
          ? Number(loanForm.floatCapPct || 3)
          : undefined,
      extraPaymentMonthly: Number(loanForm.extraPaymentMonthly || 0),
    });

    setLoanForm({
      name: "",
      assetPrice: "",
      downPayment: "",
      principal: "",
      annualRate: "",
      tenorMonths: "",
      startDate: new Date().toISOString().slice(0, 10),
      scheme: "fixed",
      fixedYears: "3",
      floatStepPct: "0.5",
      floatStepYears: "2",
      floatCapPct: "3",
      extraPaymentMonthly: "0",
    });

    goTab("loans");
  }

  const goalsChartData = useMemo(() => {
    return goals.map((g) => ({
      name: g.name,
      saved: isFiniteNumber(g.currentBalance) ? g.currentBalance : 0,
      remaining:
        isFiniteNumber(g.targetAmount) && isFiniteNumber(g.currentBalance)
          ? Math.max(0, g.targetAmount - g.currentBalance)
          : 0,
    }));
  }, [goals]);

  const goalsAIText = analyzeGoals(goals);

  const savingsByGoal = useMemo(() => {
    const m = new Map<string, GoalSavingEntry[]>();
    savings.forEach((s) => {
      if (!m.has(s.goalId)) m.set(s.goalId, []);
      m.get(s.goalId)!.push(s);
    });
    return m;
  }, [savings]);

  const [showDisclaimer, setShowDisclaimer] = useState(true);

  return (
    <main className="max-w-7xl mx-auto p-6 space-y-6">
      {showDisclaimer && (
        <div className="w-full bg-red-100 text-red-700 px-4 py-3 rounded-xl flex justify-between items-start border border-red-200">
          <div className="text-sm leading-relaxed">
            ⚠️ <span className="font-medium">Disclaimer:</span>
            Analisis AI bisa tidak 100% akurat. Harap verifikasi kembali sebelum
            mengambil keputusan finansial.
          </div>

          <button
            onClick={() => setShowDisclaimer(false)}
            className="ml-4 text-red-500 hover:text-red-700 hover:cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Goals & Loans</h1>
        <p className="text-muted-foreground">
          Saving plan and Installments/Loans.
        </p>
      </div>

      <div className="flex gap-2">
        <TabButton
          active={activeTab === "goals"}
          onClick={() => goTab("goals")}
        >
          Saving Goals
        </TabButton>
        <TabButton
          active={activeTab === "loans"}
          onClick={() => goTab("loans")}
        >
          Installments / Loans
        </TabButton>
      </div>

      {activeTab === "goals" && (
        <>
          {goals.length === 0 ? (
            <Card className="rounded-2xl">
              <CardContent className="py-10 text-center text-muted-foreground">
                Belum ada goals. Tambahin dulu lewat form atau chatbot 👍
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Overview Chart */}
              <Card className="rounded-2xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Goals Overview</CardTitle>
                  <CardDescription>Target vs saved</CardDescription>
                </CardHeader>
                <CardContent className="h-[33vh] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={goalsChartData}
                      margin={{ left: 12, right: 12 }}
                    >
                      <CartesianGrid
                        vertical={false}
                        strokeDasharray="3 3"
                        stroke="#e5e7eb"
                      />
                      <XAxis
                        dataKey="name"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        fontSize={12}
                      />
                      <Tooltip formatter={(v: any) => formatIDR(Number(v))} />
                      <Bar
                        dataKey="saved"
                        fill="#22c55e"
                        radius={[8, 8, 0, 0]}
                      />
                      <Bar
                        dataKey="remaining"
                        fill="#ef4444"
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* AI analysis */}
              <Card className="rounded-2xl">
                <CardContent className="py-6 flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-lg">
                    🤖
                  </div>
                  <div>
                    <div className="font-semibold mb-1">AI Analysis</div>
                    <div className="text-sm text-muted-foreground leading-relaxed">
                      {goalsAIText}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Goals List + Add Saving */}
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg">Goals List</CardTitle>
                  <CardDescription>
                    Input saving harian/bulanan di tiap goal
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {goals.map((g) => {
                    const remaining =
                      isFiniteNumber(g.targetAmount) &&
                      isFiniteNumber(g.currentBalance)
                        ? g.targetAmount - g.currentBalance
                        : 0;

                    const pct =
                      isFiniteNumber(g.targetAmount) && g.targetAmount > 0
                        ? Math.min(
                            100,
                            Math.round(
                              (g.currentBalance / g.targetAmount) * 100
                            )
                          )
                        : 0;

                    const savesList = savingsByGoal.get(g.id) || [];

                    return (
                      <div
                        key={g.id}
                        className="rounded-xl border border-muted p-3 space-y-3"
                      >
                        {/* header */}
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{g.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {g.priority}
                          </div>
                        </div>

                        {/* progress */}
                        <div className="text-sm">
                          {formatIDR(g.currentBalance)} /{" "}
                          {formatIDR(g.targetAmount)} ({pct}%)
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Remaining: {formatIDR(Math.max(0, remaining))}
                        </div>

                        {/* ✅ Add Saving row */}
                        <div className="flex flex-col md:flex-row gap-2 items-stretch md:items-center">
                          <Input
                            type="number"
                            placeholder="Tambah saving (IDR)"
                            value={savingDraft[g.id] || ""}
                            onChange={(e) =>
                              setSavingDraft((p) => ({
                                ...p,
                                [g.id]: e.target.value,
                              }))
                            }
                          />
                          <Input
                            placeholder="Catatan (opsional)"
                            value={savingNoteDraft[g.id] || ""}
                            onChange={(e) =>
                              setSavingNoteDraft((p) => ({
                                ...p,
                                [g.id]: e.target.value,
                              }))
                            }
                          />
                          <Button
                            type="button"
                            className="rounded-full px-5"
                            onClick={() => {
                              const amt = Number(savingDraft[g.id] || 0);
                              if (!amt) return;
                              addSavingToGoal(
                                g.id,
                                amt,
                                undefined,
                                savingNoteDraft[g.id]
                              );
                              setSavingDraft((p) => ({ ...p, [g.id]: "" }));
                              setSavingNoteDraft((p) => ({
                                ...p,
                                [g.id]: "",
                              }));
                            }}
                          >
                            + Add Saving
                          </Button>
                        </div>

                        {/* ✅ Recent Savings */}
                        {savesList.length > 0 && (
                          <div className="pt-2 border-t border-muted">
                            <div className="text-xs font-semibold mb-2">
                              Recent savings
                            </div>
                            <div className="space-y-1">
                              {savesList.slice(0, 5).map((s) => (
                                <div
                                  key={s.id}
                                  className="flex items-center justify-between text-xs text-muted-foreground"
                                >
                                  <div>
                                    {s.date} • {formatIDR(s.amount)}
                                    {s.note ? ` • ${s.note}` : ""}
                                  </div>
                                  <button
                                    className="text-red-500 hover:underline"
                                    onClick={() => deleteSaving(s.id)}
                                  >
                                    remove
                                  </button>
                                </div>
                              ))}
                              {savesList.length > 5 && (
                                <div className="text-[11px] text-muted-foreground">
                                  +{savesList.length - 5} more…
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </>
          )}

          {/* Add Goal Form */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">Add New Goal</CardTitle>
              <CardDescription>
                Isi salah satu: target date atau kontribusi/bulan.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={submitGoal}
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
              >
                <Input
                  placeholder="Goal name"
                  value={goalForm.name}
                  onChange={(e) =>
                    setGoalForm((f) => ({ ...f, name: e.target.value }))
                  }
                />
                <Input
                  type="number"
                  placeholder="Target amount (IDR)"
                  value={goalForm.targetAmount}
                  onChange={(e) =>
                    setGoalForm((f) => ({
                      ...f,
                      targetAmount: e.target.value,
                    }))
                  }
                />
                <Input
                  type="date"
                  placeholder="Target date"
                  value={goalForm.targetDate}
                  onChange={(e) =>
                    setGoalForm((f) => ({ ...f, targetDate: e.target.value }))
                  }
                />
                <Input
                  type="number"
                  placeholder="Monthly contribution (IDR)"
                  value={goalForm.monthlyContribution}
                  onChange={(e) =>
                    setGoalForm((f) => ({
                      ...f,
                      monthlyContribution: e.target.value,
                    }))
                  }
                />
                <Input
                  type="number"
                  placeholder="Current balance"
                  value={goalForm.currentBalance}
                  onChange={(e) =>
                    setGoalForm((f) => ({
                      ...f,
                      currentBalance: e.target.value,
                    }))
                  }
                />
                <select
                  className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={goalForm.priority}
                  onChange={(e) =>
                    setGoalForm((f) => ({
                      ...f,
                      priority: e.target.value as any,
                    }))
                  }
                >
                  <option value="high">High priority</option>
                  <option value="medium">Medium priority</option>
                  <option value="low">Low priority</option>
                </select>

                <div className="md:col-span-2">
                  <Button type="submit" className="rounded-full px-8">
                    Save Goal
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </>
      )}

      {/* ================== LOANS TAB ================== */}
      {activeTab === "loans" && (
        <>
          {loans.length === 0 ? (
            <Card className="rounded-2xl">
              <CardContent className="py-10 text-center text-muted-foreground">
                Belum ada loan/cicilan. Tambahin dulu lewat form atau chatbot 👍
              </CardContent>
            </Card>
          ) : (
            <>
              {loans.map((l) => {
                const amort = buildAmortization(l);
                const maxMonths = Math.min(amort.rows.length, l.tenorMonths);
                const chart = amort.rows.slice(0, maxMonths).map((r) => ({
                  label: `M${r.m}`,
                  m: r.m,
                  interest: r.interest,
                  principalPaid: r.principalPaid,
                }));

                const remainingPrincipal = amort.rows.length
                  ? amort.rows[amort.rows.length - 1].balance
                  : l.principal;

                const yearsLeft = (amort.monthsToFinish / 12).toFixed(1);
                const fixedMonths =
                  l.scheme === "floating" ? (l.fixedYears ?? 3) * 12 : null;

                return (
                  <Card key={l.id} className="rounded-2xl">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{l.name}</CardTitle>
                      <CardDescription>
                        {l.scheme} • Start {l.startDate} • Tenor {l.tenorMonths}{" "}
                        bulan
                        {l.scheme === "floating" && fixedMonths
                          ? ` • Fixed ${
                              fixedMonths / 12
                            } th → Floating mulai M${fixedMonths + 1}`
                          : ""}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      {(l.assetPrice || l.downPayment) && (
                        <div className="text-sm text-muted-foreground">
                          {l.assetPrice
                            ? `Harga aset: ${formatIDR(l.assetPrice)}`
                            : ""}
                          {l.downPayment
                            ? ` • DP: ${formatIDR(l.downPayment)}`
                            : ""}
                          {" • "}
                          Pokok pinjaman: {formatIDR(l.principal)}
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <MiniStat
                          label="Cicilan bulan 1 (est.)"
                          value={formatIDR(amort.basePayFirstMonth)}
                        />
                        <MiniStat
                          label="Total bunga (est.)"
                          value={formatIDR(amort.totalInterest)}
                        />
                        <MiniStat
                          label="Sisa pokok"
                          value={formatIDR(remainingPrincipal)}
                        />
                      </div>

                      <div className="text-sm text-muted-foreground">
                        Extra payment simulasi:{" "}
                        {formatIDR(l.extraPaymentMonthly)}/bulan → estimasi
                        lunas {yearsLeft} tahun.
                      </div>

                      <div className="h-[28vh] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={chart}
                            margin={{ left: 12, right: 12 }}
                          >
                            <CartesianGrid
                              vertical={false}
                              strokeDasharray="3 3"
                              stroke="#e5e7eb"
                            />
                            <XAxis
                              dataKey="label"
                              tickLine={false}
                              axisLine={false}
                              tickMargin={8}
                              fontSize={12}
                            />
                            <Tooltip
                              formatter={(v: any) => formatIDR(Number(v))}
                            />
                            <Area
                              type="monotone"
                              dataKey="principalPaid"
                              stroke="#22c55e"
                              fill="#22c55e33"
                            />
                            <Area
                              type="monotone"
                              dataKey="interest"
                              stroke="#ef4444"
                              fill="#ef444433"
                            />

                            {l.scheme === "floating" && fixedMonths && (
                              <ReferenceLine
                                x={`M${fixedMonths}`}
                                stroke="#0ea5e9"
                                strokeDasharray="6 3"
                                label={{
                                  value: "Floating start",
                                  position: "top",
                                  fontSize: 11,
                                }}
                              />
                            )}
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </>
          )}

          {/* Add Loan Form */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">
                Add New Installment / Loan
              </CardTitle>
              <CardDescription>
                Isi data pokok cicilan kamu. Bisa isi harga+DP atau langsung
                principal.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={submitLoan}
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
              >
                <Input
                  placeholder="Loan name (KPR / Mobil / dll)"
                  value={loanForm.name}
                  onChange={(e) =>
                    setLoanForm((f) => ({ ...f, name: e.target.value }))
                  }
                />

                <Input
                  type="number"
                  placeholder="Harga aset (opsional)"
                  value={loanForm.assetPrice}
                  onChange={(e) =>
                    setLoanForm((f) => ({ ...f, assetPrice: e.target.value }))
                  }
                />
                <Input
                  type="number"
                  placeholder="DP / Uang muka (opsional)"
                  value={loanForm.downPayment}
                  onChange={(e) =>
                    setLoanForm((f) => ({ ...f, downPayment: e.target.value }))
                  }
                />

                <Input
                  type="number"
                  placeholder="Principal / pokok pinjaman (IDR)"
                  value={loanForm.principal}
                  onChange={(e) =>
                    setLoanForm((f) => ({ ...f, principal: e.target.value }))
                  }
                />
                <Input
                  type="number"
                  placeholder="Annual rate %"
                  step="0.01"
                  value={loanForm.annualRate}
                  onChange={(e) =>
                    setLoanForm((f) => ({ ...f, annualRate: e.target.value }))
                  }
                />
                <Input
                  type="number"
                  placeholder="Tenor (months)"
                  value={loanForm.tenorMonths}
                  onChange={(e) =>
                    setLoanForm((f) => ({ ...f, tenorMonths: e.target.value }))
                  }
                />
                <Input
                  type="date"
                  value={loanForm.startDate}
                  onChange={(e) =>
                    setLoanForm((f) => ({ ...f, startDate: e.target.value }))
                  }
                />

                <select
                  className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={loanForm.scheme}
                  onChange={(e) =>
                    setLoanForm((f) => ({
                      ...f,
                      scheme: e.target.value as any,
                    }))
                  }
                >
                  <option value="fixed">Fixed</option>
                  <option value="floating">Floating</option>
                </select>

                <Input
                  type="number"
                  placeholder="Fixed years (default 3)"
                  value={loanForm.fixedYears}
                  onChange={(e) =>
                    setLoanForm((f) => ({ ...f, fixedYears: e.target.value }))
                  }
                />
                <Input
                  type="number"
                  step="0.1"
                  placeholder="Floating step % (default 0.5)"
                  value={loanForm.floatStepPct}
                  onChange={(e) =>
                    setLoanForm((f) => ({ ...f, floatStepPct: e.target.value }))
                  }
                />
                <Input
                  type="number"
                  placeholder="Step every X years (default 2)"
                  value={loanForm.floatStepYears}
                  onChange={(e) =>
                    setLoanForm((f) => ({
                      ...f,
                      floatStepYears: e.target.value,
                    }))
                  }
                />
                <Input
                  type="number"
                  step="0.1"
                  placeholder="Max total increase % (default 3)"
                  value={loanForm.floatCapPct}
                  onChange={(e) =>
                    setLoanForm((f) => ({ ...f, floatCapPct: e.target.value }))
                  }
                />

                <Input
                  type="number"
                  placeholder="Extra payment / month (optional)"
                  value={loanForm.extraPaymentMonthly}
                  onChange={(e) =>
                    setLoanForm((f) => ({
                      ...f,
                      extraPaymentMonthly: e.target.value,
                    }))
                  }
                />

                <div className="md:col-span-2">
                  <Button type="submit" className="rounded-full px-8">
                    Save Loan
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
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

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-muted p-3 bg-background">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  );
}
