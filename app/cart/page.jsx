'use client';
import React, { useContext, useEffect } from "react";
import Image from "next/image";
import { ProductContext } from "../context/shopContext";
import { useCart } from "../context/cartContext";
import { FaLock } from "react-icons/fa";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const Cart = () => {
  const { cartItems, addToCart, updateCartQuantity, getCartCount, userCart} = useCart();
  const { allProducts} = useContext(ProductContext);
  const router = useRouter()
const{fetchUser,currentUser}= useAuth()
  useEffect(() => {
    userCart();
    fetchUser()
  }, []);

  // Calculate total
  const total = Object.keys(cartItems).reduce((acc, itemId) => {
    const product = allProducts.find((p) => p._id === itemId);
    if (!product) return acc;
    return acc + product.price * cartItems[itemId];
  }, 0);


const handleCheckout = async () => {
  if (!currentUser) {
    router.push("/auth"); // redirect to login if not logged in
    return;
  }

  const items = Object.keys(cartItems).map((itemId) => {
    const product = allProducts.find((p) => p._id === itemId);

    return {
      productId: itemId,
      name: product?.name,
      image: product?.image?.[0] || "",
      price: product?.price,
      quantity: cartItems[itemId],
    };
  });

  try {
    const { data } = await axios.post("/api/orders", {
      items,
      total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    });

    if (data.success) {
      router.push("/orders"); // redirect to Orders page
      toast.success(data.message);
    }
  } catch (error) {
    console.error("Checkout error:", error);
    toast.error("Something went wrong while placing order.");
  }
};


  return currentUser? (
    <section className="w-[95%] md:w-[85%] lg:w-[75%] mx-auto py-12 mt-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-10 border-b border-gray-200 pb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Your <span className="text-orange-600">Cart</span>
          <p>
          {cartItems.length===0?"Is Empty":""}</p>
        </h1>
        <p className="text-lg md:text-xl text-gray-500">{getCartCount()} items</p>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl shadow-md">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Product</th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-600">Price</th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-600">Quantity</th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-600">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(cartItems).map((itemId) => {
              const product = allProducts.find((p) => p._id === itemId);
              if (!product || cartItems[itemId] <= 0) return null;

              return (
                <tr key={itemId} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="py-6 px-6 flex items-center gap-4">
                    <Image
                      src={product.image[0]}
                      alt={product.name}
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-800">{product.name}</p>
                      <button
                        onClick={() => updateCartQuantity(product._id, 0)}
                        className="text-xs text-red-500 hover:text-red-700 mt-1"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                  <td className="py-6 px-6 text-gray-700 font-medium">
                    ${product.offerPrice?.toFixed(2) || product.price.toFixed(2)}
                  </td>
                  <td className="py-6 px-6">
                    <div className="flex items-center border rounded-lg overflow-hidden w-fit">
                      <button
                        onClick={() => updateCartQuantity(product._id, cartItems[itemId] - 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                        disabled={cartItems[itemId] <= 1}
                      >
                        –
                      </button>
                      <input
                        type="number"
                        value={cartItems[itemId]}
                        onChange={(e) => updateCartQuantity(product._id, Number(e.target.value))}
                        className="w-12 text-center border-x outline-none"
                      />
                      <button
                        onClick={() => addToCart(product._id)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-6 px-6 text-gray-800 font-semibold">
                    ${(product.price * cartItems[itemId]).toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" className="py-6 px-6 text-right text-lg font-bold text-gray-800">
                Total:
              </td>
              <td className="py-6 px-6 text-xl font-extrabold text-orange-600">
                ${total.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Mobile Grid */}
      <div className="grid md:hidden gap-6">
        {Object.keys(cartItems).map((itemId) => {
          const product = allProducts.find((p) => p._id === itemId);
          if (!product || cartItems[itemId] <= 0) return null;

          return (
            <div
              key={itemId}
              className="bg-white p-4 rounded-xl shadow-md flex flex-col gap-4"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={product.image[0]}
                  alt={product.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <p className="font-medium text-gray-800">{product.name}</p>
                  <p className="text-sm text-gray-600">
                    ${product.offerPrice?.toFixed(2) || product.price.toFixed(2)}
                  </p>
                  <button
                    onClick={() => updateCartQuantity(product._id, 0)}
                    className="text-xs text-red-500 hover:text-red-700 mt-1"
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* Quantity + Subtotal */}
              <div className="flex justify-between items-center">
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <button
                    onClick={() => updateCartQuantity(product._id, cartItems[itemId] - 1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                    disabled={cartItems[itemId] <= 1}
                  >
                    –
                  </button>
                  <input
                    type="number"
                    value={cartItems[itemId]}
                    onChange={(e) => updateCartQuantity(product._id, Number(e.target.value))}
                    className="w-10 text-center border-x outline-none"
                  />
                  <button
                    onClick={() => addToCart(product._id)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <p className="font-semibold text-gray-800">
                  ${(product.price * cartItems[itemId]).toFixed(2)}
                </p>
              </div>
            </div>
          );
        })}

        {/* Total */}
        <div className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center">
          <span className="font-bold text-lg text-gray-800">Total</span>
          <span className="text-xl font-extrabold text-orange-600">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex flex-col md:flex-row justify-between gap-4">
        <button
          onClick={() => router.push("/products")}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-orange-500 text-orange-600 font-medium hover:bg-orange-50 transition"
        >
          ⏩ Continue Shopping
        </button>
        <button
       onClick={handleCheckout}
          className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </section>
  ):(
   
   
      <section className="flex items-center justify-center h-[80vh] px-6">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-10 text-center border border-gray-200">
          {/* Icon */}
          <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-red-100 mb-6">
            <FaLock className="text-red-500 text-4xl" />
          </div>

          {/* Text */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Cart Access Restricted
          </h1>
          <p className="text-gray-600 mb-8 text-base leading-relaxed">
            Your shopping cart is securely stored on our servers.  
            Please log in to view and manage your items.
          </p>

          {/* CTA Button */}
          <Link href="/auth" passHref>
            <button className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition">
              🔑 Go to Login
            </button>
          </Link>
        </div>
      </section>
    

  );
};

export default Cart;
