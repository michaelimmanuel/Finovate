"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Check } from "lucide-react";

interface IconSelectProps {
  icon: string;
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
        "relative flex flex-col items-center justify-center rounded-xl border transition-all",
        "w-28 h-28 p-4",      
        "md:w-40 md:h-40 md:p-8", 
        selected
          ? "bg-[var(--accent)/10] border-accent"
          : "bg-white border-gray-300 hover:border-gray-500"
      )}
    >
      <div className="mb-2 md:mb-3">
        <Image
          src={icon}
          alt={label}
          width={48}
          height={48}
          className={cn(
            "opacity-90",
            selected ? "opacity-100" : "opacity-80",
            "w-10 h-10 md:w-14 md:h-14" // icon base + md
          )}
        />
      </div>

      <span
        className={cn(
          "font-medium",
          "text-xs md:text-base",
          selected ? "text-accent" : "text-neutral-700"
        )}
      >
        {label}
      </span>

      {selected && (
        <div className="absolute -bottom-3">
          <div className="h-6 w-6 md:h-8 md:w-8 bg-accent rounded-full flex items-center justify-center text-white shadow">
            <Check size={18} />
          </div>
        </div>
      )}
    </button>
  );
}
