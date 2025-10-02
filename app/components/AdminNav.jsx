'use client';

import Link from "next/link";
import React from "react";

const AdminNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-center py-3 px-6 mb-100 bg-gray-900 text-white shadow-md md:hidden">
      {/*Title */}
      <div className="font-bold text-lg">
        <Link className=" items-center" href="/admin">Admin Dashboard</Link>
      </div>

     
    </nav>
  );
};

export default AdminNavbar;
