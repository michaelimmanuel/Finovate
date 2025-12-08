"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { ReactNode } from "react";

interface IconSelectProps {
  icon: ReactNode;
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export function IconSelect({
  icon,
  label,
  selected = false,
  onClick
}: IconSelectProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-center justify-center p-6 rounded-xl border transition-all w-40 h-40",
        selected
          ? "bg-[var(--accent)/10] border-accent"
          : "bg-white border-gray-300 hover:border-gray-500"
      )}
    >
      <div
        className={cn(
          "mb-3 text-4xl",
          selected ? "text-accent" : "text-neutral-700"
        )}
      >
        {icon}
      </div>

      <span
        className={cn(
          "text-base font-medium",
          selected ? "text-accent" : "text-neutral-700"
        )}
      >
        {label}
      </span>

      {selected && (
        <div className="absolute bottom-2">
          <div className="h-5 w-5 bg-accent rounded-full flex items-center justify-center text-white">
            <Check size={14} />
          </div>
        </div>
      )}
    </button>
  );
}
