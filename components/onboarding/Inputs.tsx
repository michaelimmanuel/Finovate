import { cn } from "@/lib/utils";

export function InputField({ label, value, setValue, className }: any) {
  return (
    <div className="mb-4">
      <label className="text-sm text-gray-700">{label}</label>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={cn(
          "w-full p-2 border rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-accent",
          className
        )}
      />
    </div>
  );
}

export function SelectField({
  label,
  options,
  value,
  setValue,
  className
}: any) {
  return (
    <div className="mb-4">
      <label className="text-sm text-gray-700">{label}</label>
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={cn(
          "w-full p-2 border rounded-md mt-1 bg-white focus:outline-none focus:ring-2 focus:ring-accent",
          className
        )}
      >
        <option value="">Select...</option>
        {options.map((o: string) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
