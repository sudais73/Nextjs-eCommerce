'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { 
  FaBoxes, FaClipboardList, FaChartLine, 
  FaSignOutAlt, FaTimes, FaBars, FaPlus, 
  FaUsers 
} from 'react-icons/fa';
import { useAuth } from '@/app/context/AuthContext';

const AdminLayout = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logoutAdmin } = useAuth();

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: FaChartLine },
    { name: 'Add Products', href: '/admin/add-products', icon: FaPlus },
    { name: 'Products', href: '/admin/products', icon: FaBoxes },
    { name: 'Orders', href: '/admin/orders', icon: FaClipboardList },
    { name: 'Users', href: '/admin/users', icon: FaUsers },
  ];

  const handleLogout = () => {
    logoutAdmin();
    setSidebarOpen(false); // ✅ close after logout too
  };

  const handleNavClick = () => {
    // ✅ only close sidebar in mobile (md:hidden)
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 max-md:mt-20">
      {/* Mobile Sidebar Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-indigo-600 text-white md:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-800 text-white transition-transform duration-300 ease-in-out 
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:flex-shrink-0`}
      >
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-2xl font-semibold text-center">Admin Panel</h1>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={handleNavClick}  // ✅ close sidebar when link clicked
              className={`flex items-center px-4 py-2 rounded-md transition duration-200 
                ${pathname === item.href ? 'bg-indigo-700 text-white' : 'hover:bg-gray-700 hover:text-white'}`}
            >
              <item.icon />
              <span className="ml-3">{item.name}</span>
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 rounded-md transition duration-200 hover:bg-red-700 hover:text-white text-red-300"
          >
            <FaSignOutAlt className="mr-3" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow p-4 hidden md:block">
          <h2 className="text-xl font-semibold">
            {navItems.find(item => pathname === item.href)?.name || 'Admin Panel'}
          </h2>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
