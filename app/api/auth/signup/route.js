import { signup } from "@/app/controllers/authController";
import connectToDB from "@/app/Utils/database";
import { uploadImage } from "@/app/Utils/uploadimage";
export const POST = async (req) => {
  await connectToDB();
  try {
    const formData = await req.formData();

    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const contactNumber = formData.get('contactNumber');
    const address = formData.get('address');
    const role = formData.get('role');
    const image = await uploadImage(formData, 'avatar', '/uploads/person.png');
    const result = await signup({
      name,
      email,
      password,
      contactNumber,
      address,
      role,
      image
    });
    return result;
  } catch (error) {
    console.error("Signup error:", error);
    return new Response("Something went wrong", { status: 500 });
  }
};
