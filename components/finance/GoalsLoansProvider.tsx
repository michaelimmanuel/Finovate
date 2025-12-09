"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

export type GoalEntry = {
  id: string;
  name: string;
  targetAmount: number;
  targetDate?: string;
  monthlyContribution?: number;
  currentBalance: number;
  priority: "high" | "medium" | "low";
  createdAt: string;
};

export type GoalSavingEntry = {
  id: string;
  goalId: string;
  amount: number;
  date: string; // YYYY-MM-DD
  note?: string;
};

export type LoanEntry = {
  id: string;
  name: string;

  // ✅ NEW: DP support
  assetPrice?: number;    
  downPayment?: number;   
  principal: number;       

  annualRate: number;
  tenorMonths: number;
  startDate: string;
  scheme: "fixed" | "floating";

  fixedYears?: number;
  floatStepPct?: number;
  floatStepYears?: number;
  floatCapPct?: number;

  extraPaymentMonthly: number;
};

type GoalsLoansContextValue = {
  goals: GoalEntry[];
  loans: LoanEntry[];
  savings: GoalSavingEntry[];

  addGoal: (data: Omit<GoalEntry, "id" | "createdAt">) => void;
  updateGoal: (id: string, data: Omit<GoalEntry, "id" | "createdAt">) => void;
  deleteGoal: (id: string) => void;

  addLoan: (data: Omit<LoanEntry, "id">) => void;
  updateLoan: (id: string, data: Omit<LoanEntry, "id">) => void;
  deleteLoan: (id: string) => void;

  addSavingToGoal: (
    goalId: string,
    amount: number,
    date?: string,
    note?: string
  ) => void;
  deleteSaving: (savingId: string) => void;
};

const GoalsLoansContext = createContext<GoalsLoansContextValue | null>(null);

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export function GoalsLoansProvider({ children }: { children: React.ReactNode }) {
  const [goals, setGoals] = useState<GoalEntry[]>([]);
  const [loans, setLoans] = useState<LoanEntry[]>([]);
  const [savings, setSavings] = useState<GoalSavingEntry[]>([]);

  function addGoal(data: Omit<GoalEntry, "id" | "createdAt">) {
    setGoals((prev) => [
      { id: crypto.randomUUID(), createdAt: todayStr(), ...data },
      ...prev,
    ]);
  }

  function updateGoal(id: string, data: Omit<GoalEntry, "id" | "createdAt">) {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, ...data } : g))
    );
  }

  function deleteGoal(id: string) {
    setGoals((prev) => prev.filter((g) => g.id !== id));
    setSavings((prev) => prev.filter((s) => s.goalId !== id));
  }

  function addLoan(data: Omit<LoanEntry, "id">) {
    setLoans((prev) => [{ id: crypto.randomUUID(), ...data }, ...prev]);
  }

  function updateLoan(id: string, data: Omit<LoanEntry, "id">) {
    setLoans((prev) =>
      prev.map((l) => (l.id === id ? { id, ...data } : l))
    );
  }

  function deleteLoan(id: string) {
    setLoans((prev) => prev.filter((l) => l.id !== id));
  }

  // ✅ add saving transaction + update currentBalance
  function addSavingToGoal(
    goalId: string,
    amount: number,
    date?: string,
    note?: string
  ) {
    if (!amount || amount <= 0) return;

    const entry: GoalSavingEntry = {
      id: crypto.randomUUID(),
      goalId,
      amount,
      date: date || todayStr(),
      note,
    };

    setSavings((prev) => [entry, ...prev]);

    setGoals((prev) =>
      prev.map((g) =>
        g.id === goalId
          ? { ...g, currentBalance: (g.currentBalance || 0) + amount }
          : g
      )
    );
  }

  function deleteSaving(savingId: string) {
    const target = savings.find((s) => s.id === savingId);
    if (!target) return;

    setSavings((prev) => prev.filter((s) => s.id !== savingId));

    setGoals((prev) =>
      prev.map((g) =>
        g.id === target.goalId
          ? {
              ...g,
              currentBalance: Math.max(0, g.currentBalance - target.amount),
            }
          : g
      )
    );
  }

  const value = useMemo(
    () => ({
      goals,
      loans,
      savings,
      addGoal,
      updateGoal,
      deleteGoal,
      addLoan,
      updateLoan,
      deleteLoan,
      addSavingToGoal,
      deleteSaving,
    }),
    [goals, loans, savings]
  );

  return (
    <GoalsLoansContext.Provider value={value}>
      {children}
    </GoalsLoansContext.Provider>
  );
}

export function useGoalsLoans() {
  const ctx = useContext(GoalsLoansContext);
  if (!ctx)
    throw new Error("useGoalsLoans must be used inside GoalsLoansProvider");
  return ctx;
}
