"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/admin/users");
        if (res.data.success) {
          setUsers(res.data.users);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
      return (
        <div className="flex justify-center items-center h-[70vh] text-indigo-600 text-xl">
          <FaSpinner className="animate-spin mr-3" /> Loading Users...
        </div>
      );
    }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Users List</h1>

      {users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="text-left px-4 py-2 border-r max-md:hidden">User ID</th>
                <th className="text-left px-4 py-2 border-r">Name</th>
                <th className="text-left px-4 py-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user._id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-2 border-r font-mono text-sm max-md:hidden">{idx+1}</td>
                  <td className="px-4 py-2 border-r">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
