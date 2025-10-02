'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBoxOpen, FaSpinner } from "react-icons/fa";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";

const OrdersPage = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders
  useEffect(() => {
    if (!currentUser) return;

    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("/api/orders", {
          withCredentials: true,
        });
        if (data.success) setOrders(data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser]);

  // Start payment
  const startPayment = async (orderId, isPaid) => {
    if (isPaid) return; // stop if already paid ✅

    try {
      const res = await axios.post("/api/payment-intent", { orderId });
      const { clientSecret } = res.data;
      if (!clientSecret) throw new Error("No client secret returned");

      window.location.href = `/checkout?orderId=${orderId}&clientSecret=${clientSecret}`;
    } catch (error) {
      console.error("Error starting payment:", error);
      alert("Something went wrong, please try again.");
    }
  };

  // If not logged in
  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] px-6 text-center">
        <FaBoxOpen className="text-red-500 text-6xl mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Orders Locked</h1>
        <p className="text-gray-600 mb-6">
          Please log in to view your past orders and track deliveries.
        </p>
        <Link href="/auth">
          <button className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition">
            Go to Login
          </button>
        </Link>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-indigo-600 text-xl">
        <FaSpinner className="animate-spin mr-3" /> Loading Orders...
      </div>
    );
  }

  // Empty orders
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <FaBoxOpen className="text-gray-400 text-6xl mb-4" />
        <h1 className="text-2xl font-bold text-gray-700 mb-2">No Orders Yet</h1>
        <p className="text-gray-600 mb-6">
          Your past orders will appear here once you start shopping.
        </p>
        <Link href="/products">
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
            Start Shopping
          </button>
        </Link>
      </div>
    );
  }

  // Orders list
  return (
    <section className="w-[95%] md:w-[80%] mx-auto py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
        Your Orders
      </h1>

      <div className="grid gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition"
          >
            {/* Order Header */}
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-700 text-sm">
                <span className="font-semibold">Order ID:</span> {order._id}
              </p>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : order.status === "Shipped"
                      ? "bg-blue-100 text-blue-700"
                      : order.status === "Cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                  }`}
              >
                {order.status}
              </span>
            </div>

            {/* Items */}
            <ul className="divide-y divide-gray-200 mb-4">
              {order.items.map((item, idx) => (
                <li
                  key={idx}
                  className="py-3 flex items-center justify-between gap-4"
                >
                  {/* Left side: image + details */}
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden border border-gray-200">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>

                  {/* Right side: subtotal */}
                  <span className="font-semibold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>

            {/* Footer */}
            <div className="flex justify-between items-center">
              <p className="text-gray-600 text-sm">
                Placed on {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <div className="flex items-center gap-3">
                <p className="text-lg font-bold text-gray-900">
                  Total: ${order.total.toFixed(2)}
                </p>

                <button
                  onClick={() => startPayment(order._id, order.isPaid)}
                  disabled={order.isPaid}
                  className={`px-5 py-2 rounded-lg font-semibold transition ${order.isPaid
                      ? "bg-green-600 text-white cursor-not-allowed opacity-80"
                      : "bg-yellow-600 text-white hover:bg-yellow-700"
                    }`}
                >
                  {order.isPaid ? "Paid" : "Pay Online"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OrdersPage;
