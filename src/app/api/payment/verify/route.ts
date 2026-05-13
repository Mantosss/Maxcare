import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, appointmentId } =
      await req.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPERBASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPERBASE_ANON_KEY!
    );

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !appointmentId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Verify signature — same logic as clothfactory backend
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    const expectedBuf = Buffer.from(expected, "hex");
    const signatureBuf = Buffer.from(razorpay_signature, "hex");

    const isValid =
      expectedBuf.length === signatureBuf.length &&
      crypto.timingSafeEqual(expectedBuf, signatureBuf);

    if (!isValid) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    // Update appointment in Supabase
    const { error } = await supabase
      .from("appointment")
      .update({
        status: "paid",
        payment_id: razorpay_payment_id,
        razorpay_order_id: razorpay_order_id,
      })
      .eq("id", appointmentId);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Verification failed" }, { status: 500 });
  }
}
