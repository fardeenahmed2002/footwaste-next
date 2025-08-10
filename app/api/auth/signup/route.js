import { signup } from "@/app/controllers/authController"
import connectToDB from "@/app/Utils/database"
import { uploadProfileImage } from "@/app/Utils/uploadimage"
import { NextResponse } from "next/server"

export const POST = async (req) => {
  await connectToDB()
  try {
    const formData = await req.formData()
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')
    const contactNumber = formData.get('contactNumber')
    const address = formData.get('address')
    const role = formData.get('role')
    const imageResult = await uploadProfileImage(formData, 'avatar');
    if (!imageResult || !imageResult.success) {
      return NextResponse.json({
        success: false,
        message: imageResult?.message || 'Unknown image upload error'
      })
    }

    const image = imageResult.url
    const result = await signup({
      name,
      email,
      password,
      contactNumber,
      address,
      role,
      image,
    })

    return result
  } catch (error) {
    console.error("Signup error:", error)
    return new Response("Something went wrong", { status: 500 })
  }
}

