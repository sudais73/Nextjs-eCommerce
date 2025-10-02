import dbConnect from "@/app/lib/dbConnect";
import Order from "@/models/Order";
import { NextResponse } from "next/server";
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export async function POST(request) {
  try {
    const { orderId } = await request.json();
    if (!orderId) throw new Error("orderId is required");

    await dbConnect();

    const order = await Order.findById(orderId);
    if (!order) throw new Error("Order not found");

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.total * 100), // convert dollars to cents
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: { orderId: order._id.toString() },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Payment Intent Error:", error.message);
    return NextResponse.json({ msg: error.message }, { status: 500 });
  }
}
