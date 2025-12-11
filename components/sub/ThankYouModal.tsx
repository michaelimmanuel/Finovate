"use client";
import { Modal } from "@/components/ui/modal";
import Link from "next/link";

interface ThankYouModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ThankYouModal({ open, onClose }: ThankYouModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="relative bg-white rounded-xl p-6 w-[90%] max-w-sm shadow-xl animate-in fade-in zoom-in-95">
          <div className="p-6 text-center space-y-4">
            <h1 className="text-xl font-bold">🎉 Thank you!</h1>
            <p>Your subscription is now active.</p>
            <p>Please complete the following survey!</p>

            <Link href="/onboard">
              <button
                className="w-full py-1.5 bg-accent text-white rounded-lg font-semibold text-center mt-4 hover:opacity-90 transition hover:scale-95 hover:cursor-pointer"
                onClick={onClose}
              >
                Back
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
}
