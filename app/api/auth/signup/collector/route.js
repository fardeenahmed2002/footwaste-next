import { signup } from "@/app/controllers/authController";
import connectToDB from "@/app/Utils/database";
import { uploadProfileImage } from "@/app/Utils/uploadimage";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  await connectToDB();

  try {
    const formData = await req.formData();

    // Required collector fields
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const contactNumber = formData.get("contactNumber");
    const address = formData.get("address");
    const role = formData.get("role"); // should be "collector"
    const collectorType = formData.get("collectorType"); // NGO, Individual Volunteer, Charity Group
    const cityCorp = formData.get("cityCorp");
    const area = formData.get("area");
    const organizationID = formData.get("organizationID") || "";

    // Conditional fields
    const noOfTeamMember = formData.get("noOfTeamMember") || 0; // for volunteers or charity groups
    const ngoRegistrationNumber = formData.get("ngoRegistrationNumber") || ""; // for NGO

    // Upload avatar image
    const avatarResult = await uploadProfileImage(formData, "avatar");
    if (!avatarResult || !avatarResult.success) {
      return NextResponse.json({
        success: false,
        message: avatarResult?.message || "Avatar upload failed",
      });
    }

    const image = avatarResult.url;

    // Call signup controller
    const result = await signup({
      name,
      email,
      password,
      contactNumber,
      address,
      role,
      collectorType,
      cityCorp,
      area,
      noOfTeamMember: Number(noOfTeamMember),
      ngoRegistrationNumber,
      image,
    });

    return result; // Should return JSON like { success: true, user: {...} }
  } catch (error) {
    console.error("Collector signup error:", error);
    return new Response("Something went wrong", { status: 500 });
  }
};
