'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

const StripeElement = () => {
  const stripe = useStripe();
  const elements = useElements();
  const searchParams = useSearchParams();

  const orderId = searchParams.get("orderId");
  const clientSecret = searchParams.get("clientSecret");

  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!stripe || !elements) return;

      const { error: submitError } = await elements.submit();
      if (submitError) {
        setErrorMessage(submitError.message || "Something went wrong");
        setLoading(false);
        return;
      }

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret: clientSecret ,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?orderId=${orderId}`,
        },
      });

      if (error) {
        setErrorMessage(error.message || "Payment failed");
      }
      setLoading(false);
    } catch (err) {
      console.error("Payment error:", err);
      setErrorMessage("Unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center bg-[#f6f7f9] py-6 h-screen">
      <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="bg-white p-6 rounded-xl flex flex-col gap-6">
          {clientSecret ? (
            <PaymentElement />
          ) : (
            <div className='w-full bg-gray-200 h-10 animate-pulse'></div>
          )}
          
          {errorMessage && (
            <div className='text-xs text-red-600'>{errorMessage}</div>
          )}

          <button
            disabled={!stripe || !clientSecret || loading}
            className="px-4 py-2 w-fit text-sm md:text-base bg-yellow-600 hover:bg-yellow-800 transition-all disabled:opacity-50 text-white rounded-md"
          >
            {!loading ? `Pay Now` : "Processing..."}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StripeElement;
