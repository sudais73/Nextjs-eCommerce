'use client';

import { assets } from '@/app/assets/assets';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useCart } from '../context/cartContext';
import { useAuth } from '../context/AuthContext';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const { getCartCount } = useCart();
  const { currentUser, fetchUser, logoutUser, loading } = useAuth();
  const path = usePathname();
  const isHomePath = path === "/";

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setShowProfileDropdown(false);
  };

  return (
    <>
      <nav className="flex justify-between items-center py-3 px-[6%] border-b z-20 bg-white fixed top-0 left-0 w-full shadow-md">
        {/* Logo */}
        <div>
          <Link href="/">
            <Image
              className="w-20 md:w-30 cursor-pointer"
              src={assets.logo}
              alt="E-commerce Logo"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-gray-700 font-medium text-lg">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/products">All Products</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>

        {/* Action Icons */}
        <div className="flex items-center gap-4 md:gap-6 relative">
          {!loading && (
            currentUser ? (
              <div className="relative">
                <Image
                  className="w-6 md:w-8 cursor-pointer rounded-full"
                  src={assets.profile_icon}
                  alt="Profile Icon"
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                />
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border shadow-lg rounded-md py-2 z-20">
                    <Link href="/orders" onClick={() => setShowProfileDropdown(false)}>
                      <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer">My Orders</p>
                    </Link>
                    <p
                      onClick={handleLogout}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Logout
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/auth">
                <button className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition">
                  Login
                </button>
              </Link>
            )
          )}

          {/* Cart */}
          <Link href="/cart" className="relative">
            <Image
              className="w-5 md:w-6 cursor-pointer"
              src={assets.cart_icon}
              alt="Cart Icon"
            />
            {getCartCount() > 0 && (
              <p className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                {getCartCount()}
              </p>
            )}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <Image
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="w-6 cursor-pointer"
            alt="Menu Toggle"
            src={assets.menu_icon}
          />
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden py-4 border-t z-10">
            <ul className="flex flex-col gap-4 text-gray-800 text-lg px-6">
              <li><Link href="/" onClick={() => setShowMobileMenu(false)}>Home</Link></li>
              <li><Link href="/products" onClick={() => setShowMobileMenu(false)}>All Products</Link></li>
              <li><Link href="/about" onClick={() => setShowMobileMenu(false)}>About</Link></li>
              <li><Link href="/contact" onClick={() => setShowMobileMenu(false)}>Contact</Link></li>
            </ul>
          </div>
        )}
      </nav>

      {/* Spacer to push content below navbar */}
      <div className={`${isHomePath ? "mt-16" : "mt-20"}`} />
    </>
  );
};

export default Navbar;
