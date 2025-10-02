import dbConnect from '@/app/lib/dbConnect';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await dbConnect();
    return NextResponse.json({ message: 'Database connected successfully!' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Database connection failed.', error: error.message }, { status: 500 });
  }
}