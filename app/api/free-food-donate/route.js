// app/api/donate-food/route.js
import connectToDB from "@/app/Utils/database";
import { freeDonateFood } from "@/app/controllers/donatedFoodController";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  await connectToDB();

  try {
    const data = await req.json();
    return await freeDonateFood(data)
  } catch (err) {
    console.error("Error in donate-food API route:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong!" },
      { status: 500 }
    );
  }
};
