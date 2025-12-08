"use client";


import React, { useState } from "react";
import { BudgetAreaChart } from "@/components/ui/budget-area-chart";


const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const daysInMonth = new Date(year, month + 1, 0).getDate();

const dummyExpenses = Array.from({ length: daysInMonth }, (_, i) => {
  const date = new Date(year, month, i + 1);
  return {
    date: date.toISOString().slice(0, 10),
    description: ["Belanja", "Transportasi", "Makan", "Utilitas", "Lainnya"][Math.floor(Math.random() * 5)],
    amount: (Math.floor(Math.random() * 200_000) + 20_000), // IDR
  };
});

export default function BudgetTrackerPage() {
  const [income, setIncome] = useState(3000);
  const [expenses, setExpenses] = useState(dummyExpenses);
  const [expenseInput, setExpenseInput] = useState({ date: "", description: "", amount: "" });

  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const remaining = income - totalExpenses;

  // Format as IDR
  const formatIDR = (amount: number) => amount.toLocaleString("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 });

  function addExpense(e: React.FormEvent) {
    e.preventDefault();
    if (!expenseInput.date || !expenseInput.description || !expenseInput.amount) return;
    setExpenses([...expenses, { ...expenseInput, amount: Number(expenseInput.amount) }]);
    setExpenseInput({ date: "", description: "", amount: "" });
  }


  return (
    <main className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Budget Tracker</h1>
      <div className="mb-12 w-full">
        <BudgetAreaChart />
            {/* Detailed Analysis Section */}
        <section className="w-full  mx-auto mt-8">
        <div className="rounded-2xl  bg-background p-8 shadow-lg">
            <h2 className="font-bold text-2xl mb-4 text-primary">Detailed Budget Analysis & Recommendations</h2>
            <ul className="list-disc pl-6 space-y-3 text-base text-muted-foreground mb-6">
            <li><span className="font-semibold text-primary">Income Growth:</span> Your income has shown a consistent upward trend this month. This positive growth provides an excellent opportunity to allocate more funds toward savings or investments.</li>
            <li><span className="font-semibold text-primary">Expense Stability:</span> Your daily expenses remain stable, indicating good control over discretionary spending. However, review recurring expenses to identify any potential savings.</li>
            <li><span className="font-semibold text-primary">Savings Rate:</span> Consider setting a target to save at least 20% of your monthly income. Automating transfers to a dedicated savings account can help you achieve this goal effortlessly.</li>
            <li><span className="font-semibold text-primary">Emergency Fund:</span> If you haven't already, build an emergency fund covering 3-6 months of living expenses. This will provide financial security in case of unexpected events.</li>
            <li><span className="font-semibold text-primary">Budget Review:</span> Regularly review your budget and adjust categories as your financial situation evolves. Use insights from your tracker to make informed decisions.</li>
            </ul>
            <div className="text-lg text-primary font-bold mb-2">Actionable Recommendations:</div>
            <ol className="list-decimal pl-6 space-y-2 text-base">
            <li>Increase your monthly savings by 5-10% to take advantage of rising income.</li>
            <li>Audit your subscriptions and recurring payments for possible reductions.</li>
            <li>Set a monthly spending cap for non-essential categories.</li>
            <li>Track your progress weekly to stay motivated and accountable.</li>
            <li>Explore investment options suitable for your risk profile to grow your wealth.</li>
            </ol>
        </div>
        </section>
      </div>
     
    </main>
  );
}
