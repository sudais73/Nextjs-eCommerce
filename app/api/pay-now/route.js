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

    const origin = request.headers.get("origin"); 
   const session = await stripe.checkout.sessions.create({
  payment_method_types: ["card"],
  mode: "payment",
  line_items: order.items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: { name: item.name },
      unit_amount: item.price * 100, // Stripe expects amount in cents
    },
    quantity: item.quantity, // ✅ required for each item
  })),
  success_url: `${origin}/success?sessionId={CHECKOUT_SESSION_ID}&orderId=${orderId}`,

  cancel_url: `${origin}/order?status=cancelled`,
  metadata: {
    orderID: orderId,
  },
});



     return NextResponse.json({ success: true, id: session.id });
  } catch (error) {
    console.error("Payment Intent Error:", error.message);
    return NextResponse.json({ msg: error.message }, { status: 500 });
  }
}
