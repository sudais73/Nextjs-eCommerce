'use client';

import React, { createContext, useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userCart, setUserCart] = useState([])

  const router = useRouter();

  // ✅ Define fetchUser //
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/auth/me", { withCredentials: true });
      if (data.success) {
        setCurrentUser(data.user);
        setUserCart(data.user.cartData)
      } else {
        setCurrentUser(null);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (currentUser) {
      console.log("Updated user:", currentUser);
    }
  }, [currentUser]);

  const registerUser = async (formData) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/signup", formData);
      toast.success(data.msg);
      router.push("/");
      return true;
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error(error.message || "Registration failed.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (formData) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/login", formData, { withCredentials: true });
      if (data.success) {
        toast.success(data.msg);
        setCurrentUser(data.user)
        await fetchUser(); // ✅ refresh user after login
        router.push("/");

        return true;
      }


    } catch (error) {
      if (error.response) {
        // Extract the error message from the server's response body
        const errorMessage = error.response.data.msg || 'An unexpected error occurred.';
        toast.error(errorMessage);
      } else if (error.request) {
        toast.error("Network error: Server is unreachable.");
      } else {
        toast.error("An unknown error occurred during login.");
      }
    } finally {
      setLoading(false);
    }
  };


  const adminLogin = async (formData) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/admin/login", formData, { withCredentials: true });

      if (data.success) {
        toast.success(data.msg);
        router.push("/admin");
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      if (error.response) {
        // Extract the error message from the server's response body
        const errorMessage = error.response.data.msg || 'An unexpected error occurred.';
        toast.error(errorMessage);
      } else if (error.request) {
        toast.error("Network error: Server is unreachable.");
      } else {
        toast.error("An unknown error occurred during login.");
      }
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/logout", {}, { withCredentials: true });
      toast.success(data.msg);
      router.push("/auth");
      return true;
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error(error.message || "Logout failed.");
      return false;
    } finally {
      setLoading(false);
    }
  };


  // logout admin//
  const logoutAdmin = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/admin/logout", {}, { withCredentials: true });
      setCurrentUser(null);
      toast.success(data.message);
      router.push("/");
      return true;
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error(error.message || "Logout failed.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
    currentUser,
    logoutAdmin,
    loading,
    registerUser,
    loginUser,
    logoutUser,
    fetchUser,
    userCart,
    adminLogin


  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};
