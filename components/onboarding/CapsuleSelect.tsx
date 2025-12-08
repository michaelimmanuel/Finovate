'use client';
import { cn } from "@/lib/utils";

export function CapsuleSelect({ options, selected, setSelected }: any) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((opt: string) => (
        <button
          key={opt}
          onClick={() => setSelected(opt)}
          className={cn(
            "px-4 py-2 border rounded-full text-sm",
            selected === opt
              ? "bg-accent text-white border-accent"
              : "border-gray-300"
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
