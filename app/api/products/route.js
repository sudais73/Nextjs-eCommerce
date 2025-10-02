import dbConnect from '@/app/lib/dbConnect';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

export async function GET(request) {
  await dbConnect(); // Ensure connection to the database

  try {
    const products = await Product.find({}); // Fetch all products from MongoDB
    return NextResponse.json({success:true, products}, { status: 200 }); // Send products as JSON response
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ message: 'Error fetching products.', error: error.message }, { status: 500 });
  }
}