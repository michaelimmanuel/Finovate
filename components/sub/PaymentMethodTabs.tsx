// components/sub/PaymentMethodTabs.tsx
"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CardPaymentForm } from "./CardPaymentForm";
import QRISPayment from "./QRISPayment";
import ConfirmModal from "./ConfirmModal";
import ThankYouModal from "./ThankYouModal";

interface PaymentMethodTabsProps {
  totalPayment: number;
  planName: string;        // <-- NEW
  onComplete: () => void;
}

export default function PaymentMethodTabs({
  totalPayment,
  planName,
  onComplete,
}: PaymentMethodTabsProps) {
  const [tab, setTab] = useState("card");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const [cardForm, setCardForm] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-gray-200 rounded-xl">
        <button
          onClick={() => setTab("card")}
          className={cn(
            "w-full py-2 rounded-lg text-sm font-medium transition",
            tab === "card" ? "bg-white" : "opacity-50"
          )}
        >
          Card Payment
        </button>

        <button
          onClick={() => setTab("qris")}
          className={cn(
            "w-full py-2 rounded-lg text-sm font-medium transition",
            tab === "qris" ? "bg-white" : "opacity-50"
          )}
        >
          QRIS
        </button>
      </div>

      {/* Content */}
      {tab === "card" ? (
        <CardPaymentForm
          cardNumber={cardForm.cardNumber}
          setCardNumber={(v) =>
            setCardForm((prev) => ({ ...prev, cardNumber: v }))
          }
          cardName={cardForm.cardName}
          setCardName={(v) => setCardForm((prev) => ({ ...prev, cardName: v }))}
          expiry={cardForm.expiry}
          setExpiry={(v) => setCardForm((prev) => ({ ...prev, expiry: v }))}
          cvv={cardForm.cvv}
          setCvv={(v) => setCardForm((prev) => ({ ...prev, cvv: v }))}
          totalPayment={totalPayment}
          planName={planName}
          onContinue={() => setShowConfirm(true)}
        />
      ) : (
        <QRISPayment
          totalPayment={totalPayment}
          planName={planName}
          onComplete={() => setShowConfirm(true)}
        />
      )}

      {/* Confirm Modal */}
      {showConfirm && (
        <ConfirmModal
          open={showConfirm}
          amount={totalPayment}
          planName={planName}
          method={tab}
          onConfirm={() => {
            setShowConfirm(false);
            setShowThankYou(true);
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      {showThankYou && (
        <ThankYouModal
          open={showThankYou}
          onClose={() => setShowThankYou(false)}
        />
      )}
    </div>
  );
}
