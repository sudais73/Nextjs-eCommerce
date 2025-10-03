"use client";

import React, { useContext, useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { ProductContext } from "@/app/context/shopContext";
import RelatedProduct from "@/app/components/RelatedProduct";
import { useCart } from "@/app/context/cartContext";
import { AuthContext, useAuth } from "@/app/context/AuthContext"; // ✅ import AuthContext
import { useRouter } from "next/navigation"; // ✅ import router

const ProductDetailPage = ({ params }) => {
  const { allProducts } = useContext(ProductContext);
  const { id } = use(params);

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const { addToCart } = useCart();
  const { currentUser, fetchUser } = useAuth(); // ✅ get user
  const router = useRouter();

  // --- Find the product based on the id ---
  useEffect(() => {
    if (allProducts.length > 0 && id) {
      const foundProduct = allProducts.find((p) => p._id === id);
      setProduct(foundProduct);
      if (foundProduct?.image?.length > 0) {
        setMainImage(foundProduct.image[0]);
      }
    }
  }, [allProducts, id]);
  useEffect(()=>{
fetchUser()
  },[])

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-600">Loading product details...</p>
      </div>
    );
  }

  // ✅ handle Add to Cart
  const handleAddToCart = () => {
    if (!currentUser) {
      toast.error("Please log in to add items to your cart.");
      router.push("/login"); // redirect
      return;
    }
    addToCart(product._id);
    toast.success("Item added to cart!");
  };

  return (
    <section className="w-[90%] md:w-[80%] mx-auto py-10">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Product Image Gallery */}
        <div className="lg:w-1/2 flex flex-col items-center">
          <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-lg shadow-md mb-4">
            <Image
              src={mainImage || product.image[0]}
              alt={product.name}
              fill
              style={{ objectFit: "contain", objectPosition: "center" }}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
              className="rounded-lg"
            />
          </div>
          {product.image?.length > 1 && (
            <div className="flex gap-3 justify-center">
              {product.image.map((img, index) => (
                <div
                  key={index}
                  className={`relative w-20 h-20 cursor-pointer border-2 ${
                    img === mainImage ? "border-blue-600" : "border-gray-200"
                  } rounded-md overflow-hidden`}
                  onClick={() => setMainImage(img)}
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    fill
                    style={{ objectFit: "contain" }}
                    className="rounded-md"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="lg:w-1/2 flex flex-col gap-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            {product.name}
          </h1>
          <p className="text-xl font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </p>

          <div className="border-t border-b py-4">
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          <div className="flex gap-2 text-sm text-gray-500">
            <p>
              Category:{" "}
              <Link
                href={`/products?category=${product.category}`}
                className="font-semibold text-blue-600 hover:underline"
              >
                {product.category}
              </Link>
            </p>
            {product.subCategory && (
              <p>
                {" "}
                | Subcategory:{" "}
                <Link
                  href={`/products?subCategory=${product.subCategory}`}
                  className="font-semibold text-blue-600 hover:underline"
                >
                  {product.subCategory}
                </Link>
              </p>
            )}
          </div>

          {/* ✅ Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="mt-6 w-full py-4 bg-blue-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <RelatedProduct
        category={product.category}
        subCategory={product.subCategory}
        currentProductId={product._id}
      />
    </section>
  );
};

export default ProductDetailPage;
