import dbConnect from "@/app/lib/dbConnect";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

// ✅ GET all orders (Admin only)
export async function GET() {
  try {
    await dbConnect();
    const orders = await Order.find({})
      .populate("user", "name email") 
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, orders ,count:orders.length });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// ✅ PATCH order status
export async function PATCH(request) {
  try {
    await dbConnect();
    const { orderId, status } = await request.json();

    const order = await Order.findById(orderId);
    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    order.status = status;
    await order.save();

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
