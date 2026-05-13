import { useState } from "react";

interface PaymentOptions {
  appointmentId: string;
  amount: number; // in INR
  name: string;
  email: string;
  phone: string;
  description?: string;
  onSuccess?: (paymentId: string) => void;
  onFailure?: (error: string) => void;
}

export const useRazorpay = () => {
  const [loading, setLoading] = useState(false);

  const initiatePayment = async (opts: PaymentOptions) => {
    setLoading(true);
    try {
      // 1. Create order server-side
      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appointmentId: opts.appointmentId, amount: opts.amount }),
      });
      const order = await res.json();
      if (!res.ok) throw new Error(order.error || "Failed to create order");

      // 2. Load Razorpay script dynamically
      await loadRazorpayScript();

      // 3. Open Razorpay modal
      const rzp = new (window as any).Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Maxcare",
        description: opts.description || "Appointment Payment",
        order_id: order.orderId,
        prefill: { name: opts.name, email: opts.email, contact: opts.phone },
        theme: { color: "#06b6d4" },
        handler: async (response: any) => {
          // 4. Verify signature server-side
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              appointmentId: opts.appointmentId,
            }),
          });
          const result = await verifyRes.json();
          if (!verifyRes.ok) throw new Error(result.error || "Verification failed");
          opts.onSuccess?.(response.razorpay_payment_id);
        },
        modal: {
          ondismiss: () => opts.onFailure?.("Payment cancelled"),
        },
      });

      rzp.on("payment.failed", (response: any) => {
        opts.onFailure?.(response.error?.description || "Payment failed");
      });

      rzp.open();
    } catch (err: any) {
      opts.onFailure?.(err.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return { initiatePayment, loading };
};

function loadRazorpayScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.getElementById("razorpay-script")) return resolve();
    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay script"));
    document.body.appendChild(script);
  });
}
