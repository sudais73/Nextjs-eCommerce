import dbConnect from "@/app/lib/dbConnect";
import Order from "@/models/Order";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export async function POST(request) {
  try {
    await dbConnect();
    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json({ success: false, message: "No orderId" }, { status: 400 });
    }

    // 3. Update order in DB
    const order = await Order.findByIdAndUpdate(
      orderId,
      { isPaid: true },
      { new: true }
    );

    return NextResponse.json({ success: true, order });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
