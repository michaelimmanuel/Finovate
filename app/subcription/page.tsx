"use client";
import { useState } from "react";
import { PlanSelector } from "@/components/sub/PlanSelector";
import PaymentMethodTabs from "@/components/sub/PaymentMethodTabs";

export default function SubscribePage() {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  const totalPayment = selectedPlan?.price ?? 0;

  return (
    <div className="w-2/3 mx-auto p-6 flex flex-col gap-6">
      <h1 className="text-3xl font-semibold">Subscription</h1>

      {step === 1 && (
        <>
          <PlanSelector
            value={selectedPlan}
            onChange={(p) => setSelectedPlan(p)}
          />

          <button
            disabled={!selectedPlan}
            onClick={() => setStep(2)}
            className="w-full py-3 rounded-xl bg-accent text-white disabled:opacity-50"
          >
            Continue
          </button>
        </>
      )}

      {step === 2 && (
        <PaymentMethodTabs
          totalPayment={totalPayment}
          planName={selectedPlan?.label}
          onComplete={() => console.log("Payment Complete")}
        />
      )}
    </div>
  );
}
