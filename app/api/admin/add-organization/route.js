import connectToDB from "@/app/Utils/database";
import { uploadImage } from "@/app/Utils/uploadimage";
import { addOrganization } from "@/app/controllers/adminController";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  await connectToDB();

  try {
    const formData = await req.formData();


    const titleBn = formData.get("titleBn");
    const titleEn = formData.get("titleEn");
    const descBn = formData.get("descBn") || "";
    const descEn = formData.get("descEn") || "";
    const siteLink = formData.get("siteLink");

    if (!titleBn || !titleEn || !siteLink) {
      return NextResponse.json(
        { success: false, message: "Required fields are missing!" },
        { status: 400 }
      );
    }


    let logo = null;
    if (formData.get("logo") && formData.get("logo").size > 0) {
      const logoResult = await uploadImage(formData, "logo", "organizations-logo");
      if (!logoResult) {
        return NextResponse.json({
          success: false,
          message: "Logo upload failed",
        });
      }
      logo = logoResult; 
    }

    const result = await addOrganization({
      titleBn,
      titleEn,
      descBn,
      descEn,
      siteLink,
      logo,
    });

    return result;
  } catch (error) {
    console.error("Add Organization error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
};
