'use client';

import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import AdminNavbar from "./components/AdminNav";
import Footer from "./components/Footer";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isAdminPath = pathname.startsWith("/admin");

  return (
    <>
      {isAdminPath ? <AdminNavbar /> : <Navbar />}
      {children}
      {!isAdminPath && <Footer />}
    </>
  );
}
