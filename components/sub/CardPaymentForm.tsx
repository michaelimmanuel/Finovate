"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type CardPaymentFormProps = {
  cardNumber: string;
  setCardNumber: (v: string) => void;

  cardName: string;
  setCardName: (v: string) => void;

  expiry: string;
  setExpiry: (v: string) => void;

  cvv: string;
  setCvv: (v: string) => void;

  totalPayment: number;

  planName?: string;

  onContinue?: () => void;
};

export function CardPaymentForm({
  cardNumber,
  setCardNumber,
  cardName,
  setCardName,
  expiry,
  setExpiry,
  cvv,
  setCvv,
  totalPayment,
  onContinue,
  planName,
}: CardPaymentFormProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start p-6">
      <div className="flex-row">
        <div className="relative w-full max-w-sm mx-auto z-20">
          <div className="rounded-3xl p-8 text-white shadow-xl bg-linear-to-br from-pink-500 to-rose-500 relative overflow-hidden">
            <div className="w-10 h-8 bg-yellow-300 rounded-md mb-6 mt-10" />

            <div className="tracking-widest text-2xl font-semibold">
              {cardNumber ? cardNumber : "1234 5678 9012 3456"}
            </div>

            <div className="flex justify-between mt-6 text-md">
              <div>{expiry || "12/24"}</div>
              <div className="text-sm">{cardName || "CARDHOLDER NAME"}</div>
            </div>

            <div className="absolute bottom-4 right-4 w-10 h-10 bg-yellow-300 rounded-full opacity-70"></div>
          </div>
        </div>
        <div className="relative w-full max-w-sm mx-auto z-10 -mt-46 mr-20">
          <div className="rounded-3xl p-8 text-white shadow-xl bg-linear-to-br bg-gray-200 relative overflow-hidden">
            <div className="w-10 h-8 rounded-md mb-6 mt-10" />

            <div className="h-4"></div>

            <div className="h-4 flex justify-between mt-6 text-sm"></div>

            <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full opacity-70"></div>
          </div>
        </div>
      </div>

      <Card className="shadow-md w-full">
        <CardContent className="p-6 space-y-6">
          <h2 className="text-2xl font-bold">Payment Details</h2>
          <div className="space-y-4">
            <div className="flex flex-col space-y-1">
              <p>Cardholder Name</p>
              <Input
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="John Doe"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <p>Card Number</p>
              <Input
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="1234 5678 9012 3456"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1">
                <p>Expiry</p>
                <Input
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="12/24"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <p>CVV</p>
                <Input
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="123"
                />
              </div>
            </div>
          </div>

          {/* TOTAL */}
          <div className="flex-row">
            <div className="border-t pt-4 flex justify-between text-lg font-bold">
              <span>Total Payment:</span>
              <span>Rp {totalPayment.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-end">
              <div className="text-sm text-gray-500">
                Subcription: {planName || "Selected plan"}
              </div>
            </div>
          </div>

          {/* CONTINUE BUTTON */}
          <button
            onClick={() => onContinue?.()}
            className="w-full py-2 bg-accent text-white rounded-lg font-semibold text-center mt-4 hover:opacity-90 transition hover:scale-95 hover:cursor-pointer"
          >
            Continue Transaction
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
