'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {
  FaBoxes,
  FaClipboardList,
  FaDollarSign,
  FaSpinner,
} from 'react-icons/fa';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalEarnings: 0,
    recentOrders: [],
    loading: true,
    error: null,
  });
  

  // Helper function to calculate total earnings from paid orders
  const calculateTotalEarnings = (orders) => {
    if (!orders || orders.length === 0) return 0;
    return orders
      .filter((order) => order.isPaid)
      .reduce((acc, order) => acc + (order.total || 0), 0);
  };

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const productsRes = await axios.get('/api/admin/products');
        const ordersRes = await axios.get('/api/admin/orders');

        setStats({
          totalProducts: productsRes.data.count || 0,
          totalOrders: ordersRes.data.count || 0,
          totalEarnings: calculateTotalEarnings(ordersRes.data.orders),
          recentOrders: ordersRes.data.orders || [],
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        toast.error(
          error.response?.data?.message || 'Failed to fetch dashboard stats.'
        );
        setStats((prev) => ({
          ...prev,
          loading: false,
          error: error.message,
        }));
      }
    };

    fetchDashboardStats();
  }, []);

  

  if (stats.loading) {
    return (
      <div  className="flex justify-center items-center h-[70vh] text-indigo-600 text-xl" >
      <FaSpinner className="animate-spin mr-3" />
        <p className="text-lg">Loading Dashboard Data...</p>
      </div>
    );
  }

  if (stats.error) {
    return (
      <div className="flex justify-center items-center h-full text-red-600">
        <p className="text-lg">Error: {stats.error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Products */}
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
          <div>
            <h2 className="text-gray-500 text-sm font-medium uppercase">
              Total Products
            </h2>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {stats.totalProducts}
            </p>
          </div>
          <FaBoxes className="text-indigo-500 text-5xl opacity-75" />
        </div>

        {/* Total Orders */}
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
          <div>
            <h2 className="text-gray-500 text-sm font-medium uppercase">
              Total Orders
            </h2>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {stats.totalOrders}
            </p>
          </div>
          <FaClipboardList className="text-green-500 text-5xl opacity-75" />
        </div>

        {/* Total Earnings */}
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
          <div>
            <h2 className="text-gray-500 text-sm font-medium uppercase">
              Total Earnings
            </h2>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              ${stats.totalEarnings.toFixed(2)}
            </p>
          </div>
          <FaDollarSign className="text-yellow-500 text-5xl opacity-75" />
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Orders
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 border">No</th>
                <th className="px-4 py-2 border">Customer</th>
                <th className="px-4 py-2 border">Amount</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders?.length > 0 ? (
                stats.recentOrders.map((order, index) => (
                  <tr key={order._id} className="text-center">
                    <td className="px-4 py-2 border">
                      {index+1}
                    </td>
                    <td className="px-4 py-2 border">
                      {order.user?.name || 'N/A'}
                    </td>
                    <td className="px-4 py-2 border">
                      ${order.total.toFixed(2)}
                    </td>
                    <td
                      className={`px-4 py-2 border font-medium ${order.isPaid ? 'text-green-600' : 'text-red-600'
                        }`}
                    >
                      {order.isPaid ? 'Paid' : 'Unpaid'}
                    </td>
                    <td className="px-4 py-2 border">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-2 border text-gray-500"
                  >
                    No recent orders.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Orders Trend */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Orders Trend
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.recentOrders}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="createdAt"
                tickFormatter={(d) => new Date(d).toLocaleDateString()}
              />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#4f46e5"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Paid vs Unpaid */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Paid vs Unpaid Orders
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  {
                    name: 'Paid',
                    value: stats.recentOrders.filter((o) => o.isPaid).length,
                  },
                  {
                    name: 'Unpaid',
                    value: stats.recentOrders.filter((o) => !o.isPaid).length,
                  },
                ]}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                <Cell fill="#22c55e" />
                <Cell fill="#ef4444" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
