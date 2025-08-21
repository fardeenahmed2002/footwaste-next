// app/api/save-donation/route.js
import { NextResponse } from "next/server";
import { donate } from "@/app/controllers/donateController";
export const POST = async (req) => {
    try {
        const data = await req.json();
        return donate(data)
    } catch (err) {
        console.error("Error in save-donation API:", err);
        return NextResponse.json(
            { success: false, message: "Something went wrong" },
            { status: 500 }
        );
    }
};
