import connectToDB from "@/app/Utils/database";
import { freeDonateFood } from "@/app/controllers/donatedFoodController";
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

    const imageResult = await uploadImage(formData, "imageOfDonatedFood");
    const imageOfDonatedFood = imageResult?.success ? imageResult.url : null;

    if (!imageOfDonatedFood && formData.has("imageOfDonatedFood")) {
      return NextResponse.json({
        success: false,
        message: imageResult?.message || "Image upload failed",
      });
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

    return NextResponse.json(result);

  } catch (error) {
    console.error("Donate food error:", error);
    return new Response("Something went wrong", { status: 500 });
  }
};
