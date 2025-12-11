"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export interface QRISPaymentProps {
  totalPayment: number;
  onComplete: () => void;
  imageUrl?: string;
  planName?: string;
}

export default function QRISPayment({
  totalPayment,
  onComplete,
  imageUrl = "/qris-dummy.png",
  planName = "",
}: QRISPaymentProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-6">
      {/* LEFT: QR IMAGE */}
      <div className="flex justify-center">
        <div className="border rounded-xl p-4 shadow-md bg-white">
          <Image
            src={imageUrl}
            alt="QRIS Code"
            width={200}
            height={200}
            className="object-contain"
          />
        </div>
      </div>

      {/* RIGHT: Payment Detail */}
      <Card className="shadow-md w-full">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-bold">Payment Details</h2>

          <div className="space-y-2 text-sm">
            <div>
              <div className="text-gray-500">Selected Plan</div>
              <div className="font-semibold">{planName || "Selected plan"}</div>
            </div>

            <div>
              <div className="text-gray-500">Payment Method</div>
              <div className="font-semibold">QRIS</div>
            </div>
          </div>

          <div className="border-t pt-4 flex justify-between items-center text-lg font-bold">
            <span>Total Payment</span>
            <span>Rp {Number(totalPayment ?? 0).toLocaleString("id-ID")}</span>
          </div>

          <div>
            <button
              className="w-full py-2 bg-accent text-white rounded-lg font-semibold text-center mt-4 hover:opacity-90 transition hover:scale-95 hover:cursor-pointer"
              onClick={onComplete}
            >
              Complete Transaction
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
