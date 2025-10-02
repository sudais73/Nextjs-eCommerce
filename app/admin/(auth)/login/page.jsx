'use client'

import { useAuth } from "@/app/context/AuthContext";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AdminLogin() {
  const { adminLogin } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
       await adminLogin({ email: formData.email, password: formData.password });
    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>

      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-slate-900 border border-slate-700">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-white">Admin Login</h2>
            <p className="text-slate-400 mt-1">Access your dashboard</p>
          </div>

          <form onSubmit={loginHandler} className="space-y-5">
            <div>
              <label htmlFor="email" className="block mb-1 font-medium text-slate-300">Email</label>
              <input
                onChange={handleChange}
                value={formData.email}
                type="email"
                id="email"
                name="email"
                placeholder="Enter email"
                className="w-full p-3 bg-slate-800 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-1 font-medium text-slate-300">Password</label>
              <input
                onChange={handleChange}
                value={formData.password}
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
                className="w-full p-3 bg-slate-800 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="text-right mt-1">
                <a href="#" className="text-sm text-indigo-500 hover:underline">Forgot password?</a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
