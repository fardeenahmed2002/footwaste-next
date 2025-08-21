export const runtime = "nodejs"; // force Node runtime

import { NextResponse } from "next/server";
import axios from "axios";

const store_id = "68a48d55d18a2";
const store_passwd = "68a48d55d18a2@ssl";
const is_live = false;

export async function POST(req) {
  try {
    const { amount } = await req.json();

    if (!amount || isNaN(amount)) {
      return NextResponse.json(
        { success: false, message: "Invalid payment amount" },
        { status: 400 }
      );
    }

    const tran_id = `tran_${Date.now()}`;
    const postData = new URLSearchParams({
      store_id,
      store_passwd,
      total_amount: amount,
      currency: "BDT",
      tran_id,
      success_url: "https://8739e3a8014b.ngrok-free.app/success",
      fail_url: "https://8739e3a8014b.ngrok-free.app/fail",
      cancel_url: "https://8739e3a8014b.ngrok-free.app/cancel",
      ipn_url: "https://8739e3a8014b.ngrok-free.app/ipn",
      shipping_method: "NO",
      product_name: "Donation",
      product_category: "General",
      product_profile: "general",
      cus_name: "Customer",
      cus_email: "customer@example.com",
      cus_add1: "Dhaka",
      cus_city: "Dhaka",
      cus_country: "Bangladesh",
      cus_phone: "01711111111",
    });

    const sslUrl = is_live
      ? "https://securepay.sslcommerz.com/gwprocess/v4/api.php"
      : "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";

    const response = await axios.post(sslUrl, postData.toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    if (!response.data?.GatewayPageURL) {
      return NextResponse.json(
        { success: false, message: "Gateway URL not found" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, url: response.data.GatewayPageURL });
  } catch (error) {
    console.error("Payment Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Payment failed" },
      { status: 500 }
    );
  }
}
