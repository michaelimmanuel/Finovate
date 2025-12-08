export function AlertModal({ open, onClose, title, children }: any) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-sm shadow-xl animate-in fade-in zoom-in-95">
        <h2 className="text-xl font-semibold mb-3">{title}</h2>

        <div className="text-gray-600 mb-6">{children}</div>

        <button
          onClick={onClose}
          className="w-full py-2 rounded-lg bg-amber-400 text-white font-medium"
        >
          OK
        </button>
      </div>
    </div>
  );
}
