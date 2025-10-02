import dbConnect from '@/app/lib/dbConnect';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  await dbConnect(); // Ensure connection to the database

  const { id } = params; // Extract id from dynamic route parameter

  try {
    const product = await Product.findOne({ _id: id }); // Find product by id

    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error(`Error fetching product with slug ${id}:`, error);
    return NextResponse.json({ message: 'Error fetching product.', error: error.message }, { status: 500 });
  }
}