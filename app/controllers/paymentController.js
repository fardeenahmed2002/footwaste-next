// import SSLCommerzPayment from "sslcommerz-lts";
// import { NextResponse } from "next/server";
// import fetch from "node-fetch";

// // Polyfill fetch for Node
// if (!globalThis.fetch) {
//     globalThis.fetch = fetch;
// }

// const store_id = "68a48d55d18a2";
// const store_passwd = "68a48d55d18a2@ssl";
// const is_live = false;

// export const bkashPayment = async (payment) => {
//     try {
//         if (!payment || isNaN(payment)) {
//             return { success: false, message: "Invalid payment amount" };
//         }

//         const data = {
//             total_amount: Number(payment),
//             currency: "BDT",
//             tran_id: `tran_${Date.now()}`,
//             success_url: "https://8739e3a8014b.ngrok-free.app/success",
//             fail_url: "https://8739e3a8014b.ngrok-free.app/fail",
//             cancel_url: "https://8739e3a8014b.ngrok-free.app/cancel",
//             ipn_url: "https://8739e3a8014b.ngrok-free.app/ipn",
//             shipping_method: "NO",
//             product_name: "Donation",
//             product_category: "General",
//             product_profile: "general",
//             cus_name: "Customer",
//             cus_email: "customer@example.com",
//             cus_add1: "Dhaka",
//             cus_city: "Dhaka",
//             cus_country: "Bangladesh",
//             cus_phone: "01711111111",
//         };

//         const response = await axios({
//             method: "post",
//             url: config.ssl.sslPaymentApi,
//             data: data,
//             headers: {
//                 "Content-Type": "application/x-www-form-urlencoded",
//             },
//         });
//         return response.data;
//     };
