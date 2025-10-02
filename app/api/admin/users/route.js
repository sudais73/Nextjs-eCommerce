import dbConnect from "@/app/lib/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    // Fetch only non-admin users (exclude role = 'admin')
    const users = await User.find({ role: { $ne: "admin" } }, "_id name email").lean();

    return NextResponse.json({ success: true, users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
