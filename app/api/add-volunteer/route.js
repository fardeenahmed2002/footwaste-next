import connectToDB from "@/app/Utils/database";
import { uploadProfileImage } from "@/app/Utils/uploadimage";
import { NextResponse } from "next/server";
import { addVolunteer } from "@/app/controllers/volunteerController";
export const POST = async (req) => {
  await connectToDB();

  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const contactNumber = formData.get("contactNumber");
    const address = formData.get("address");
    const role = formData.get("role") || "volunteer";


    const imageResult = await uploadProfileImage(formData, "image");
    const image = imageResult?.success ? imageResult.url : null;

    if (!image && formData.has("image")) {
      return NextResponse.json({
        success: false,
        message: imageResult?.message || "Image upload failed",
      });
    }


    const result = await addVolunteer({
      name,
      email,
      password,
      contactNumber,
      address,
      role,
      image,
    });

    return result;
  } catch (error) {
    console.error("Add Volunteer error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
};
