import { freeDonateFood } from "@/app/controllers/donatedFoodController";
import connectToDB from "@/app/Utils/database";
import { uploadImage } from "@/app/Utils/uploadimage";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  await connectToDB();

  try {
    const formData = await req.formData();

    const donorName = formData.get("donorName");
    const address = formData.get("address");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const title = formData.get("title");
    const description = formData.get("description");
    const quantity = formData.get("quantity");
    const location = formData.get("location");
    const expiryDate = formData.get("expiryDate");
    const pickupTime = formData.get("pickupTime");
    const foodType = formData.get("foodType");
    const foodCategory = formData.get("foodCategory");
    const storageCondition = formData.get("storageCondition");
    const cookedTime = formData.get("cookedTime");

    let imageOfDonatedFood
            try {
                imageOfDonatedFood = await uploadImage(formData, "imageOfDonatedFood", 'donated-foods');
            } catch (uploadError) {
                return NextResponse.json({
                    success: false,
                    message: uploadError.message
                },
                    { status: 400 }
                )
            }

    const result = await freeDonateFood({
      donorName,
      address,
      email,
      phone,
      title,
      description,
      quantity,
      location,
      expiryDate,
      pickupTime,
      foodType,
      foodCategory,
      storageCondition,
      cookedTime,
      imageOfDonatedFood,
    });

    return result;

  } catch (error) {
    console.error("Donate food error:", error);
    return new Response("Something went wrong", { status: 500 });
  }
};
