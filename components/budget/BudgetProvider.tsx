"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

export type IncomeEntry = {
    id: string;
    date: string;
    amount: number;
};

export type ExpenseEntry = {
    id: string;
    date: string;
    description: string;
    category: string;
    amount: number;
};

export type TabKey = "overview" | "input";

type BudgetContextValue = {
    incomeEntries: IncomeEntry[];
    expenseEntries: ExpenseEntry[];

    addIncome: (data: Omit<IncomeEntry, "id">) => void;
    addExpense: (data: Omit<ExpenseEntry, "id">) => void;

    updateExpense: (id: string, data: Omit<ExpenseEntry, "id">) => void;
    deleteExpense: (id: string) => void;

    // ✅ ini untuk pindah tab dari chatbot / komponen lain
    activeTab: TabKey;
    setActiveTab: React.Dispatch<React.SetStateAction<TabKey>>;
};

const BudgetContext = createContext<BudgetContextValue | null>(null);

function getMonthKey(dateStr: string) {
    return dateStr.slice(0, 7);
}

function getPrevMonthDate(
    currentMonthKey: string,
    minus: number,
    day: string
) {
    const [y, m] = currentMonthKey.split("-").map(Number);
    const d = new Date(y, m - 1 - minus, Number(day));
    return d.toISOString().slice(0, 10);
}

export function BudgetProvider({ children }: { children: React.ReactNode }) {
    const todayStr = new Date().toISOString().slice(0, 10);
    const currentMonthKey = getMonthKey(todayStr);

    // ✅ tab state global
    const [activeTab, setActiveTab] = useState<TabKey>("overview");

    // ===== dummy awal
    const [incomeEntries, setIncomeEntries] = useState<IncomeEntry[]>([
        // bulan ini
        { id: "i1", date: `${currentMonthKey}-01`, amount: 4000000 },
        { id: "i2", date: `${currentMonthKey}-15`, amount: 4500000 },

        // bulan lalu
        {
            id: "i_prev1",
            date: getPrevMonthDate(currentMonthKey, 1, "05"),
            amount: 4200000,
        },

        // 2 bulan lalu
        {
            id: "i_prev2",
            date: getPrevMonthDate(currentMonthKey, 2, "05"),
            amount: 4100000,
        },
    ]);

    const [expenseEntries, setExpenseEntries] = useState<ExpenseEntry[]>([
        // bulan ini
        {
            id: "e1",
            date: todayStr,
            description: "Lunch",
            category: "Food & Drink",
            amount: 45000,
        },
        {
            id: "e2",
            date: todayStr,
            description: "Ojek",
            category: "Transport",
            amount: 18000,
        },
        {
            id: "e3",
            date: `${currentMonthKey}-03`,
            description: "Groceries",
            category: "Shopping",
            amount: 220000,
        },

        // bulan lalu
        {
            id: "e_prev1",
            date: getPrevMonthDate(currentMonthKey, 1, "10"),
            description: "Internet",
            category: "Bills",
            amount: 350000,
        },
        {
            id: "e_prev2",
            date: getPrevMonthDate(currentMonthKey, 1, "18"),
            description: "Dinner",
            category: "Food & Drink",
            amount: 120000,
        },

        // 2 bulan lalu
        {
            id: "e_prev3",
            date: getPrevMonthDate(currentMonthKey, 2, "08"),
            description: "Shopping",
            category: "Shopping",
            amount: 500000,
        },
    ]);

    function addIncome(data: Omit<IncomeEntry, "id">) {
        setIncomeEntries((prev) => [
            { id: crypto.randomUUID(), ...data },
            ...prev,
        ]);
    }

    function addExpense(data: Omit<ExpenseEntry, "id">) {
        setExpenseEntries((prev) => [
            { id: crypto.randomUUID(), ...data },
            ...prev,
        ]);
    }

    function updateExpense(id: string, data: Omit<ExpenseEntry, "id">) {
        setExpenseEntries((prev) =>
            prev.map((e) => (e.id === id ? { id, ...data } : e))
        );
    }

    function deleteExpense(id: string) {
        setExpenseEntries((prev) => prev.filter((e) => e.id !== id));
    }

    const value = useMemo(
        () => ({
            incomeEntries,
            expenseEntries,
            addIncome,
            addExpense,
            updateExpense,
            deleteExpense,
            activeTab,
            setActiveTab,
        }),
        [incomeEntries, expenseEntries, activeTab]
    );

    return (
        <BudgetContext.Provider value={value}>
            {children}
        </BudgetContext.Provider>
    );
}

export function useBudget() {
    const ctx = useContext(BudgetContext);
    if (!ctx) throw new Error("useBudget must be used inside BudgetProvider");
    return ctx;
}
