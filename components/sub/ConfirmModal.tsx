"use client";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { ShieldCheck, X } from "lucide-react"; // ⬅ icon lucide

interface ConfirmModalProps {
  open: boolean;
  amount: number;
  planName: string;
  method: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  open,
  amount,
  planName,
  method,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <Modal open={open} onClose={onCancel}>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
        
        {/* Modal Box */}
        <div className="relative bg-white rounded-xl p-6 w-[90%] max-w-sm shadow-xl animate-in fade-in zoom-in-95">

          {/* Close button (X) */}
          <button
            onClick={onCancel}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition"
          >
            <X size={20} />
          </button>

          {/* Icon at top center */}
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-accent/10 text-accent rounded-full flex items-center justify-center">
              <ShieldCheck size={28} />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-semibold text-center">Confirm Transaction</h2>

          {/* Details */}
          <div className="space-y-1 text-md mt-4 mb-5">
            <p className="text-center">
              <strong>Plan:</strong> {planName}
            </p>

            <p className="text-center">
              <strong>Total:</strong> Rp{" "}
              {Number(amount).toLocaleString("id-ID")}
            </p>

            <p className="text-center">
              <strong>Payment Method:</strong>{" "}
              {method === "card" ? "Card Payment" : "QRIS"}
            </p>
          </div>

          {/* Button */}
          <button className="w-full py-1.5 bg-accent text-white rounded-lg font-semibold text-center mt-4 hover:opacity-90 transition hover:scale-95 hover:cursor-pointer" onClick={onConfirm}>
            Complete Transaction
          </button>
        </div>
      </div>
    </Modal>
  );
}
