// app/success/SuccessPage.jsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const sessionId = searchParams.get("sessionId");
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!orderId || !sessionId) {
      router.push("/");
      return;
    }

    const verifyPayment = async () => {
      try {
        const res = await axios.post("/api/orders/verify-payment", { orderId });

        if (res.data.success) {
          setSuccessMessage("✅ Payment verified successfully! Your order is now paid.");
        } else {
          setSuccessMessage("❌ Payment verification failed: " + res.data.message);
        }
      } catch (err) {
        console.error("Verification error:", err);
        setSuccessMessage("⚠️ Error verifying payment.");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [orderId, sessionId, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4 text-green-600">
          {loading ? "Verifying Payment..." : "Payment Status"}
        </h1>
        <p className="mb-2">{loading ? "Please wait..." : successMessage}</p>

        <a
          href="/orders"
          className="mt-6 inline-block px-6 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-800 transition"
        >
          Go to Your Orders
        </a>
      </div>
    </div>
  );
}
