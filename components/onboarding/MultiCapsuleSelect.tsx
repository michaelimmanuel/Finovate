'use client';
import { cn } from "@/lib/utils";

export function MultiCapsuleSelect({ options, selected, setSelected }: any) {
  function toggle(opt: string) {
    if (selected.includes(opt)) {
      setSelected(selected.filter((x: string) => x !== opt));
    } else {
      setSelected([...selected, opt]);
    }
  }

  return (
    <div className="flex flex-wrap gap-3">
      {options.map((opt: string) => (
        <button
          key={opt}
          onClick={() => toggle(opt)}
          className={cn(
            "px-4 py-2 border rounded-full text-sm",
            selected.includes(opt)
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
