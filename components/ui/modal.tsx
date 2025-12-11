import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";


export function Modal({ open, onClose, children}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  React.useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={onClose}
          aria-modal="true"
          role="dialog"
          tabIndex={-1}
          data-slot="modal-backdrop"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.35 }}
        >
          <div
            className="w-full h-full max-w-none max-h-none rounded-none shadow-2xl relative flex flex-col overflow-auto"
            onClick={e => e.stopPropagation()}
            data-slot="modal"
          >
            <button
              className="absolute top-4 right-6 text-3xl text-muted-foreground hover:text-primary focus:outline-none z-10"
              onClick={onClose}
              aria-label="Close modal"
            >
              ×
            </button>
            <div className="p-8 pt-16 w-full h-full overflow-y-auto flex-1 flex flex-col items-center justify-center">
              {children}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
