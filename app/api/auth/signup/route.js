import { signup } from "@/app/controllers/authController";
import connectToDB from "@/app/Utils/database";
import { uploadProfileImage } from "@/app/Utils/uploadimage";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  await connectToDB();

  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const contactNumber = formData.get("contactNumber");
    const address = formData.get("address");
    const role = formData.get("role"); 
    const userType = formData.get("userType"); 
    const cityCorp = formData.get("cityCorp");
    const area = formData.get("area");
    const addressDetails = formData.get("addressDetails");

    const license = formData.get("license") || "";
    const donationCapacity = formData.get("donationCapacity") || 0;

    const imageResult = await uploadProfileImage(formData, "avatar");
    const image = imageResult?.success ? imageResult.url : null;

    if (!image && formData.has("avatar")) {
      return NextResponse.json({
        success: false,
        message: imageResult?.message || "Image upload failed",
      });
    }

    const result = await signup({
      name,
      email,
      password,
      contactNumber,
      address,
      role,
      userType,
      donationCapacity,
      license,
      cityCorp,
      area,
      addressDetails,
      image,
    });

    return result

  } catch (error) {
    console.error("Signup error:", error);
    return new Response("Something went wrong", { status: 500 });
  }
};
