import { NextResponse } from "next/server";
import User from "@/models/User";
import dbConnect from "@/app/lib/dbConnect";
import getDataFromToken from "@/app/lib/getDataFromTheToken";
import Order from "@/models/Order";

// ✅ CREATE NEW ORDER
export async function POST(request) {
  try {
    await dbConnect();

    const userId = await getDataFromToken(request); 
    const { items, total } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, message: "No items in order" },
        { status: 400 }
      );
    }

    // Create new order
    const newOrder = await Order.create({
      user: userId,
      items,
      total,
      status: "Pending",
    });

    //clear user’s cart after placing order
    await User.findByIdAndUpdate(userId, { cartItems: {} });

    return NextResponse.json(
      { success: true, message: "Order placed successfully", order: newOrder },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

// ✅ GET USER ORDERS
export async function GET(request) {
  try {
    await dbConnect();
    const userId = await getDataFromToken(request);

    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
