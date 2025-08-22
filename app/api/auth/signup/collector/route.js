import { signup } from "@/app/controllers/authController";
import connectToDB from "@/app/Utils/database";
import { uploadImage } from "@/app/Utils/uploadimage";

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
    const collectorType = formData.get("collectorType");
    const cityCorp = formData.get("cityCorp");
    const area = formData.get("area");



    const noOfTeamMember = formData.get("noOfTeamMember") || 0;
    const ngoRegistrationNumber = formData.get("ngoRegistrationNumber") || "";

    let image
    try {
      image = await uploadImage(formData, "avatar", "ngo-avatar");
    } catch (uploadError) {
      console.error('Upload failed:', uploadError);
      return NextResponse.json({
        success: false,
        message: uploadError.message
      },
        { status: 400 }
      )
    }


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

    return result;
  } catch (error) {
    console.error("Collector signup error:", error);
    return new Response("Something went wrong", { status: 500 });
  }
};
