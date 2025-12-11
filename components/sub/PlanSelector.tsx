"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type PlanOption = {
  label: string;        // ex: "1 bulan"
  months: number;       // ex: 1, 3, 6, 12
  price: number;        // ex: 99000
  icon?: string;        // optional png
};

interface PlanSelectorProps {
  value: PlanOption | null;
  onChange: (p: PlanOption) => void;
}

const PLAN_OPTIONS: PlanOption[] = [
  { label: "1 Bulan", months: 1, price: 99000, icon: "/onboard/sub1.png" },
  { label: "3 Bulan", months: 3, price: 297000, icon: "/onboard/sub2.png" },
  { label: "6 Bulan", months: 6, price: 594000, icon: "/onboard/sub3.png" },
  { label: "12 Bulan", months: 12, price: 1188000, icon: "/onboard/sub4.png" },
];

export function PlanSelector({ value, onChange }: PlanSelectorProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {PLAN_OPTIONS.map((opt) => {
        const isSelected = value?.label === opt.label;

        return (
          <button
            key={opt.label}
            onClick={() => onChange(opt)}
            className={cn(
              "flex items-center justify-between p-4 rounded-xl border transition-all w-full text-left",
              isSelected
                ? "bg-[var(--accent)/10] border-accent"
                : "bg-white border-gray-300 hover:border-gray-500"
            )}
          >
            <div className="flex items-center gap-4">
              {/* ICON PNG */}
              <div className="w-10 h-10 flex items-center justify-center">
                {opt.icon ? (
                  <Image
                    src={opt.icon}
                    alt={opt.label}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gray-300 rounded-full" />
                )}
              </div>

              <div className="flex flex-col">
                <span
                  className={cn(
                    "text-base font-medium",
                    isSelected ? "text-accent" : "text-neutral-700"
                  )}
                >
                  {opt.label}
                </span>

                <span
                  className={cn(
                    "text-sm",
                    isSelected ? "text-accent" : "text-neutral-500"
                  )}
                >
                  Total Rp {opt.price.toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            <ChevronRight
              className={cn(
                "transition",
                isSelected ? "text-accent" : "text-neutral-500"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
