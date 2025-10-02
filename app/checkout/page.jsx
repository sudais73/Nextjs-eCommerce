'use client';

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import StripeElement from "../components/StripeElement";

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const clientSecret = searchParams.get("clientSecret");
  const orderId = searchParams.get("orderId");

  if (!clientSecret) {
    return (
      <div className="w-full flex items-center justify-center h-[70vh]">
        <p className="text-gray-600 text-lg">
          Invalid checkout session. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="w-[90%] md:w-[60%] mx-auto py-10">
      <h1 className="text-3xl font-extrabold text-center mb-8">Checkout</h1>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <StripeElement />
      </Elements>
    </div>
  );
}
