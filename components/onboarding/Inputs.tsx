export function InputField({ label, value, setValue }: any) {
  return (
    <div className="mb-4">
      <label className="text-sm text-gray-700">{label}</label>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-2 border rounded-md mt-1"
      />
    </div>
  );
}

export function SelectField({ label, options, value, setValue }: any) {
  return (
    <div className="mb-4">
      <label className="text-sm text-gray-700">{label}</label>
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-2 border rounded-md mt-1"
      >
        <option value="">Select...</option>
        {options.map((o: string) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
