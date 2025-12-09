"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useBudget } from "@/components/budget/BudgetProvider";
import { useGoalsLoans } from "@/components/finance/GoalsLoansProvider";
import { useRouter } from "next/navigation";

type Msg = { id: string; role: "user" | "bot"; text: string };

// ===== Budget keywords
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  "Food & Drink": ["coffee", "kopi", "makan", "food", "drink", "snack", "jajan"],
  Transport: ["ojek", "grab", "gojek", "bensin", "transport"],
  Shopping: ["shopping", "belanja", "market", "groceries", "sembako"],
  Bills: ["internet", "listrik", "air", "tagihan", "bills"],
  Entertainment: ["movie", "netflix", "game", "entertainment", "bioskop"],
};

function inferCategory(desc: string) {
  const lower = desc.toLowerCase();
  for (const [cat, kws] of Object.entries(CATEGORY_KEYWORDS)) {
    if (kws.some((k) => lower.includes(k))) return cat;
  }
  return "Other";
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

// ambil angka pertama "15000" / "1.500.000"
function parseAmountRaw(text: string) {
  const lower = text.toLowerCase();
  const m = lower.match(/(\d[\d\.]*)/);
  if (!m) return null;
  const n = Number(m[1].replace(/\./g, ""));
  return Number.isNaN(n) ? null : n;
}

// parse angka kalau ada satuan (rb/ribu/juta/miliar)
function parseSmartNumber(text: string) {
  const lower = text.toLowerCase();

  const juta = lower.match(/(\d+(?:[\.,]\d+)?)\s*juta/);
  if (juta) return Math.round(Number(juta[1].replace(",", ".")) * 1_000_000);

  const miliar = lower.match(/(\d+(?:[\.,]\d+)?)\s*(miliar|milyar)/);
  if (miliar)
    return Math.round(Number(miliar[1].replace(",", ".")) * 1_000_000_000);

  const ribu = lower.match(/(\d+(?:[\.,]\d+)?)\s*(rb|ribu)/);
  if (ribu) return Math.round(Number(ribu[1].replace(",", ".")) * 1_000);

  return parseAmountRaw(text);
}

// ===== Loan math fixed annuity
function calcMonthlyPayment(
  principal: number,
  annualRatePct: number,
  tenorMonths: number
) {
  const r = annualRatePct / 100 / 12;
  if (r === 0) return principal / tenorMonths;
  return (principal * r) / (1 - Math.pow(1 + r, -tenorMonths));
}

// ===== Command parsers
function parseBudgetCommand(text: string) {
  const lower = text.toLowerCase();
  const amount = parseAmountRaw(text);
  if (!amount) return null;

  if (lower.includes("expense") || lower.includes("expenses")) {
    let description =
      text.split(/for|description/i)[1]?.trim() || "Expense";
    description = description.replace(/category\s+.*/i, "").trim();

    let category = inferCategory(description);

    const catMatch = lower.match(/category\s+([a-z&\s]+)/i);
    if (catMatch) {
      const wanted = catMatch[1].trim();
      if (wanted.includes("food")) category = "Food & Drink";
      else if (wanted.includes("transport")) category = "Transport";
      else if (wanted.includes("shopping")) category = "Shopping";
      else if (wanted.includes("bill")) category = "Bills";
      else if (wanted.includes("entertain")) category = "Entertainment";
      else category = "Other";
    }

    return {
      type: "expense" as const,
      date: todayStr(),
      description,
      category,
      amount,
    };
  }

  if (
    lower.includes("income") ||
    lower.includes("gaji") ||
    lower.includes("salary")
  ) {
    return {
      type: "income" as const,
      date: todayStr(),
      amount,
    };
  }

  return null;
}

function parseGoalCommand(text: string) {
  const lower = text.toLowerCase();

  if (
    !(
      lower.includes("goal") ||
      lower.includes("saving") ||
      lower.includes("save") ||
      lower.includes("tabung")
    )
  ) {
    return null;
  }

  const amount = parseSmartNumber(text);
  if (!amount) return null;

  const name =
    text
      .replace(/goal|saving goal|saving|save|tabung/gi, "")
      .replace(/by\s+\d{4}-\d{2}-\d{2}/i, "")
      .replace(/monthly\s+\d[\d\.]*/i, "")
      .trim() || "Goal";

  const dateMatch = lower.match(/by\s+(\d{4}-\d{2}-\d{2})/i);
  const monthlyMatch = lower.match(/monthly\s+(\d[\d\.]*)/i);

  const targetDate = dateMatch ? dateMatch[1] : undefined;
  const monthlyContribution = monthlyMatch
    ? Number(monthlyMatch[1].replace(/\./g, ""))
    : undefined;

  return {
    type: "goal" as const,
    name,
    targetAmount: amount,
    targetDate,
    monthlyContribution,
    currentBalance: 0,
    priority: "medium" as const,
  };
}

// ===== Infer loan name dari konteks (mobil/hp/dll balik lagi)
function inferLoanName(text: string) {
  const lower = text.toLowerCase();

  if (/(kpr|rumah|mortgage)/i.test(lower)) return "KPR Rumah";

  if (
    /(mobil|car|avanza|xpander|brio|wuling|toyota|honda|daihatsu|suzuki)/i.test(
      lower
    )
  )
    return "Cicilan Mobil";

  if (/(motor|bike|vespa|nmax|pcx|vario|beat)/i.test(lower))
    return "Cicilan Motor";

  if (
    /(hp|handphone|iphone|android|samsung|xiaomi|oppo|vivo|realme)/i.test(lower)
  )
    return "Cicilan HP";

  if (/(laptop|macbook|notebook|asus|acer|lenovo|dell|hp)/i.test(lower))
    return "Cicilan Laptop";

  if (/(pendidikan|education|kuliah|sekolah)/i.test(lower))
    return "Cicilan Pendidikan";

  if (/(kredit|loan|cicilan|installment)/i.test(lower)) return "Loan";

  return "Loan";
}

/**
 * ✅ UPDATED parseLoanCommand:
 * 1) annualRate boleh 0%
 * 2) support DP + asset price
 */
function parseLoanCommand(text: string) {
  const lower = text.toLowerCase();
  if (
    !(
      lower.includes("loan") ||
      lower.includes("cicilan") ||
      lower.includes("kpr") ||
      lower.includes("installment") ||
      lower.includes("rumah") ||
      lower.includes("mobil") ||
      lower.includes("motor") ||
      lower.includes("hp") ||
      lower.includes("laptop")
    )
  ) {
    return null;
  }

  // detect kalau user eksplisit mau catat/save
  const saveExplicit = /(save|add|catat|masukin|input|tambah loan|simpen)/i.test(
    lower
  );

  // ===== asset price / harga barang total (opsional)
  // contoh: "harga 500 juta" / "price 12 juta" / "total 30 juta"
  const assetMatch =
    lower.match(/(?:harga|price|total)\s+(\d+(?:[\.,]\d+)?)\s*(rb|ribu|juta|miliar|milyar)?/i);
  const assetPrice = assetMatch ? parseSmartNumber(assetMatch[0]) : null;

  // ===== DP (opsional)
  // contoh: "dp 2 juta" / "down payment 10 juta" / "uang muka 5 juta"
  const dpMatch =
    lower.match(/(?:dp|down payment|uang muka)\s+(\d+(?:[\.,]\d+)?)\s*(rb|ribu|juta|miliar|milyar)?/i);
  const downPayment = dpMatch ? parseSmartNumber(dpMatch[0]) : 0;

  // ===== principal
  // 1) kalau user tulis "principal xxx"
  // 2) kalau gak ada, ambil angka smart number pertama
  // 3) kalau ada assetPrice + DP, principal = assetPrice - DP
  const principalMatch = lower.match(/principal\s+(\d[\d\.]*)/i);
  let principal =
    principalMatch
      ? Number(principalMatch[1].replace(/\./g, ""))
      : parseSmartNumber(text);

  if (assetPrice && assetPrice > 0) {
    principal = Math.max(0, assetPrice - (downPayment || 0));
  }

  // ===== rate
  const rateMatch =
    lower.match(/rate\s+(\d+(\.\d+)?)/i) ||
    lower.match(/bunga\s+(\d+(\.\d+)?)/i) ||
    lower.match(/(\d+(\.\d+)?)\s*%/);

  const annualRate = rateMatch ? Number(rateMatch[1]) : null;

  // ===== tenor (bulan / tahun)
  let tenorMonths: number | null = null;

  const tenorMatch = lower.match(/tenor\s+(\d+)/i);
  if (tenorMatch) tenorMonths = Number(tenorMatch[1]);

  const yearsMatch = lower.match(/(\d+)\s*tahun/i);
  if (yearsMatch) tenorMonths = Number(yearsMatch[1]) * 12;

  const monthsMatch = lower.match(/(\d+)\s*bulan/i);
  if (monthsMatch) tenorMonths = Number(monthsMatch[1]);

  // ===== extra payment opsional
  const extraMatch =
    lower.match(/extra\s+(\d[\d\.]*)/i) ||
    lower.match(
      /tambah\s+(\d+(?:[\.,]\d+)?)\s*(rb|ribu|juta|miliar|milyar)?/i
    );

  let extraPaymentMonthly = 0;
  if (extraMatch) {
    extraPaymentMonthly = parseSmartNumber(extraMatch[0]) || 0;
  }

  // ✅ FIX 0% bug: cek null/undefined, bukan falsy
  if (principal == null || annualRate == null || tenorMonths == null) return null;

  // ===== scheme detection
  let scheme: "fixed" | "floating" = "fixed";
  if (lower.includes("floating")) scheme = "floating";
  if (lower.includes("fixed")) scheme = "fixed";

  // default KPR Indo: fixed 3 tahun lalu floating (boleh di-override)
  const fixedYearsMatch = lower.match(/fix(?:ed)?\s*(\d+)\s*tahun/i);
  const fixedYears = fixedYearsMatch ? Number(fixedYearsMatch[1]) : 3;

  // ===== name:
  const inferredName = inferLoanName(text);

  // Ambil bagian depan sebelum keyword teknis.
  const namePart = text.split(
    /principal|rate|bunga|tenor|tahun|bulan|extra|tambah|%|harga|price|total|dp|down payment|uang muka/i
  )[0];

  let cleanedName = namePart
    .replace(
      /kalau gue|kalo gue|gue|aku|saya|misal|simulasi|hitung|berapa|loan|cicilan|installment/gi,
      ""
    )
    .trim();

  // kalau cleanedName cuma keyword doang → pakai inferredName
  const kwOnly = /^(kpr|rumah|mobil|motor|pendidikan|hp|laptop)$/i.test(
    cleanedName
  );

  if (cleanedName.length < 3 || /\d/.test(cleanedName) || kwOnly) {
    cleanedName = "";
  }

  const name = cleanedName || inferredName;

  return {
    type: "loan" as const,
    name,
    assetPrice: assetPrice || undefined,
    downPayment: downPayment || 0,
    principal,
    annualRate,
    tenorMonths,
    startDate: todayStr(),
    scheme,
    fixedYears,
    extraPaymentMonthly,
    simulateOnly: !saveExplicit,
    saveExplicit,
  };
}

export default function ChatbotBox() {
  const router = useRouter();
  const { addExpense, addIncome, setActiveTab } = useBudget();
  const { addGoal, addLoan } = useGoalsLoans();

  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "b1",
      role: "bot",
      text:
        "Hi! Kamu bisa input Budget / Goals / Loans lewat sini.\n\n" +
        "Budget:\n" +
        "• My expenses today 15000 for coffee\n" +
        "• Income today 2000000 salary\n\n" +
        "Goals:\n" +
        "• Goal DP Rumah 80 juta by 2027-12-01\n" +
        "• Saving goal Emergency Fund 15 juta monthly 1 juta\n\n" +
        "Loans:\n" +
        "• Loan KPR Rumah principal 450000000 rate 8.5 tenor 240\n" +
        "• Kalau gue KPR 450 juta, bunga 8.5%, 20 tahun, cicilannya berapa?\n" +
        "• Cicilan mobil 150 juta bunga 9% 5 tahun\n" +
        "• Cicilan HP 12 juta DP 2 juta bunga 0% 12 bulan\n" +
        "• KPR rumah harga 500 juta DP 100 juta bunga 8% 20 tahun",
    },
  ]);

  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  function replyBot(userText: string) {
    // ================== BUDGET ==================
    const budgetCmd = parseBudgetCommand(userText);
    if (budgetCmd) {
      if (budgetCmd.type === "expense") {
        addExpense({
          date: budgetCmd.date,
          description: budgetCmd.description,
          category: budgetCmd.category,
          amount: budgetCmd.amount,
        });
        setActiveTab("overview");
        router.push("/tools/budget-tracker");
        return `✅ Expense masuk: ${budgetCmd.description} (${budgetCmd.category}) Rp${budgetCmd.amount.toLocaleString(
          "id-ID"
        )}`;
      }

      if (budgetCmd.type === "income") {
        addIncome({
          date: budgetCmd.date,
          amount: budgetCmd.amount,
        });
        setActiveTab("overview");
        router.push("/tools/budget-tracker");
        return `✅ Income masuk: Rp${budgetCmd.amount.toLocaleString(
          "id-ID"
        )} (${budgetCmd.date})`;
      }
    }

    // ================== LOANS ==================
    const loanCmd = parseLoanCommand(userText);
    if (loanCmd) {
      const basePay = calcMonthlyPayment(
        loanCmd.principal,
        loanCmd.annualRate,
        loanCmd.tenorMonths
      );

      // ✅ selalu simpan biar chart kebentuk
      addLoan({
        name: loanCmd.name,
        assetPrice: loanCmd.assetPrice,
        downPayment: loanCmd.downPayment,
        principal: loanCmd.principal,
        annualRate: loanCmd.annualRate,
        tenorMonths: loanCmd.tenorMonths,
        startDate: loanCmd.startDate,
        scheme: loanCmd.scheme,
        fixedYears:
          loanCmd.scheme === "floating" ? loanCmd.fixedYears : undefined,
        floatStepPct: loanCmd.scheme === "floating" ? 0.5 : undefined,
        floatStepYears: loanCmd.scheme === "floating" ? 2 : undefined,
        floatCapPct: loanCmd.scheme === "floating" ? 3 : undefined,
        extraPaymentMonthly: loanCmd.extraPaymentMonthly || 0,
      });

      // ====== HASH NAVIGATION YANG KEBAL ======
      const target = "/tools/savings-tracker#loans";
      if (typeof window !== "undefined") {
        const path = window.location.pathname.replace(/\/$/, "");
        if (path === "/tools/savings-tracker") {
          window.location.hash = "loans";
        } else {
          router.push(target);
        }
      } else {
        router.push(target);
      }

      const years = (loanCmd.tenorMonths / 12).toFixed(0);

      return (
        `✅ Simulasi & dicatat ya: ${loanCmd.name}\n` +
        (loanCmd.assetPrice
          ? `Harga aset: Rp${loanCmd.assetPrice.toLocaleString("id-ID")}\n`
          : "") +
        (loanCmd.downPayment
          ? `DP: Rp${loanCmd.downPayment.toLocaleString("id-ID")}\n`
          : "") +
        `Pokok pinjaman: Rp${loanCmd.principal.toLocaleString("id-ID")}\n` +
        `Bunga awal: ${loanCmd.annualRate}%/tahun\n` +
        `Tenor: ${years} tahun (${loanCmd.tenorMonths} bulan)\n` +
        `Cicilan normal bulan 1 (est): Rp${Math.round(basePay).toLocaleString(
          "id-ID"
        )}/bulan\n` +
        (loanCmd.extraPaymentMonthly
          ? `Extra opsional bulan ini: Rp${loanCmd.extraPaymentMonthly.toLocaleString(
              "id-ID"
            )} (simulasi kalau rutin).\n`
          : "") +
        `Detailnya aku tampilkan di tab Installments/Loans.`
      );
    }

    // ================== GOALS ==================
    const goalCmd = parseGoalCommand(userText);
    if (goalCmd) {
    addGoal(goalCmd);

    // ✅ HASH NAVIGATION YANG KEBAL (sama kayak loans)
    const target = "/tools/savings-tracker#goals";
    if (typeof window !== "undefined") {
        const path = window.location.pathname.replace(/\/$/, "");
        if (path === "/tools/savings-tracker") {
        window.location.hash = "goals";
        } else {
        router.push(target);
        }
    } else {
        router.push(target);
    }

    const mode = goalCmd.targetDate
        ? `Target date ${goalCmd.targetDate}`
        : goalCmd.monthlyContribution
        ? `Kontribusi Rp${goalCmd.monthlyContribution.toLocaleString(
            "id-ID"
        )}/bulan`
        : "Belum ada target date / kontribusi bulanan";

    return `✅ Goal masuk: ${goalCmd.name}\nTarget Rp${goalCmd.targetAmount.toLocaleString(
        "id-ID"
    )} • ${mode}`;
    }

    // ================== FALLBACK ==================
    return (
      "Aku belum nangkep maksudnya.\n\n" +
      "Coba salah satu contoh ini:\n" +
      "• My expenses today 15000 for coffee\n" +
      "• Income today 2000000 salary\n" +
      "• Goal DP Rumah 80 juta by 2027-12-01\n" +
      "• Saving goal Emergency Fund 15 juta monthly 1 juta\n" +
      "• Loan KPR Rumah principal 450000000 rate 8.5 tenor 240\n" +
      "• Cicilan mobil 150 juta bunga 9% 5 tahun\n" +
      "• Cicilan HP 12 juta DP 2 juta bunga 0% 12 bulan\n" +
      "• KPR rumah harga 500 juta DP 100 juta bunga 8% 20 tahun"
    );
  }

  function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const botMsg: Msg = {
        id: crypto.randomUUID(),
        role: "bot",
        text: replyBot(text),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 250);
  }

  return (
    <div className="flex flex-col h-full">
      <div
        ref={listRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 bg-background"
      >
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              "max-w-[80%] rounded-2xl px-3 py-2 text-sm whitespace-pre-line shadow-sm",
              m.role === "user"
                ? "ml-auto bg-primary text-primary-foreground"
                : "mr-auto bg-muted text-foreground"
            )}
          >
            {m.text}
          </div>
        ))}
      </div>

      <form
        onSubmit={sendMessage}
        className="p-3 border-t border-muted flex gap-2 bg-white"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 rounded-md border border-input px-3 py-2 text-sm focus:ring-2 focus:ring-primary/30"
        />
        <button
          type="submit"
          className="rounded-md bg-primary text-white px-4 py-2 text-sm font-medium shadow hover:bg-primary/90"
        >
          Send
        </button>
      </form>
    </div>
  );
}
