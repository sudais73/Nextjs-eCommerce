"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/admin/orders");
      if (data.success) setOrders(data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update order status
  const updateStatus = async (orderId, status) => {
    try {
      const { data } = await axios.patch("/api/admin/orders", {
        orderId,
        status,
      });
      if (data.success) {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, status } : order
          )
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-indigo-600 text-xl">
        <FaSpinner className="animate-spin mr-3" /> Loading Orders...
      </div>
    );
  }

  return (
    <section className="w-[95%] md:w-[90%] mx-auto py-10">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
        Admin Dashboard – Orders
      </h1>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full border-collapse text-sm md:text-base">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs md:text-sm">
            <tr>
              <th className="px-4 py-3 text-left">No</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Paid</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order, index) => (
              <tr
                key={order._id}
                className="hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3 font-mono text-xs md:text-sm">
                  {index+1}
                </td>
                <td className="px-4 py-3">
                  {order.user?.name || "Guest"} <br />
                  <span className="text-gray-500 text-xs">
                    {order.user?.email}
                  </span>
                </td>
                <td className="px-4 py-3 font-bold text-gray-900">
                  ${order.total.toFixed(2)}
                </td>
                <td className="px-4 py-3">
                  {order.isPaid ? (
                    <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                      Paid
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
                      Not Paid
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      order.status === "Delivered"
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
                </td>
                <td className="px-4 py-3">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order._id, e.target.value)
                    }
                    className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:ring focus:ring-indigo-200"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminOrdersPage;
