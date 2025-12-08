"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface ListSelectProps {
  options: {
    label: string;
    icon?: string;
  }[];
  selected: string | null;
  setSelected: (val: string) => void;
}

export function ListSelect({ options, selected, setSelected }: ListSelectProps) {
  return (
    <div className="flex flex-col gap-3">
      {options.map((opt) => {
        const isSelected = selected === opt.label;

        return (
          <button
            key={opt.label}
            onClick={() => setSelected(opt.label)}
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

              <span
                className={cn(
                  "text-base font-medium",
                  isSelected ? "text-accent" : "text-neutral-700"
                )}
              >
                {opt.label}
              </span>
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
