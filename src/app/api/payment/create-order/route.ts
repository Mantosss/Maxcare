import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: NextRequest) {
  try {
    const { appointmentId, amount } = await req.json();

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    if (!appointmentId || !amount) {
      return NextResponse.json({ error: "appointmentId and amount are required" }, { status: 400 });
    }

    const amountInPaise = Math.round(Number(amount) * 100);
    if (!Number.isFinite(amountInPaise) || amountInPaise <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: String(appointmentId),
    });

    return NextResponse.json({ orderId: order.id, amount: order.amount, currency: order.currency });
  } catch (err: any) {
    console.error("[create-order]", err);
    return NextResponse.json({ error: err.message || "Failed to create order", detail: JSON.stringify(err) }, { status: 500 });
  }
}
