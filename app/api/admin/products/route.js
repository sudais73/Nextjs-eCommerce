import dbConnect from '@/app/lib/dbConnect';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from "cloudinary";

// Handler for HTTP GET (Retrieve All Products)
export async function GET(request) {
  try {
     await dbConnect();
    const products = await Product.find({}); 
    return NextResponse.json({ success: true, count: products.length, data: products }, { status: 200 });
  } catch (error) {
    console.error('Error fetching admin products:', error);
    return NextResponse.json({ success: false, message: 'Server error fetching products.' }, { status: 500 });
  }
}

// Configure Cloudinary
export const cloudinaryConfig = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
  });
};

export async function uploadSingleImage(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const imageUrl = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result.secure_url);
        }
      ).end(buffer);
    });

    return imageUrl;
  } catch (error) {
    console.error("Image upload error:", error);
    throw new Error("Failed to upload image");
  }
}


export async function POST(request) {
  try {
    await dbConnect();
    cloudinaryConfig();

    const formData = await request.formData();

    const name = formData.get("name");
    const description = formData.get("description");
    const price = formData.get("price");
    const category = formData.get("category");
    const subCategory = formData.get("subCategory");
    const sizes = formData.getAll("size[]"); // multiple sizes
    const file = formData.get("image");

    let image = null;
    if (file) {
      image = await uploadSingleImage(file); // must handle File → Buffer → Cloudinary
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      subCategory,
      size: sizes,
      image,
    });

    return NextResponse.json({
      success: true,
      msg: "Product Added Successfully",
      product,
    });
  } catch (error) {
    console.error("POST /products error:", error);
    return NextResponse.json(
      { success: false, msg: error.message || "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await dbConnect();

    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { success: false, msg: "Product ID is required" },
        { status: 400 }
      );
    }

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return NextResponse.json(
        { success: false, msg: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      msg: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { success: false, msg: error.message || "Server error" },
      { status: 500 }
    );
  }
}
