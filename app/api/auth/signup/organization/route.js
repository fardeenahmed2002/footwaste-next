import { signup } from "@/app/controllers/authController"
import connectToDB from "@/app/Utils/database"
import { uploadProfileImage } from "@/app/Utils/uploadimage"
import { uploadCertificateImage } from "@/app/Utils/uploadimage"
import { NextResponse } from "next/server"

export const POST = async (req) => {
    await connectToDB()

    try {
        const formData = await req.formData()

        const name = formData.get("name")
        const email = formData.get("email")
        const password = formData.get("password")
        const contactNumber = formData.get("contactNumber")
        const address = formData.get("address")
        const role = formData.get("role")
        const donorof = formData.get("donorof")
        const collectorType = formData.get("collectorType")
        const noOfTeamMember = formData.get("noOfTeamMember")
        const yourCollectingArea = formData.get("yourCollectingArea")
        const ngoRegistrationNumber = formData.get("ngoRegistrationNumber")
        let certificateimage
        // Upload avatar image
        const avatarResult = await uploadProfileImage(formData, "avatar")
        if (!avatarResult || !avatarResult.success) {
            return NextResponse.json({
                success: false,
                message: avatarResult?.message || "Avatar upload failed",
            })
        }

        // Upload certificate image
        try {
            certificateimage = await uploadCertificateImage(formData, 'certificateimage', 'certificate-images')
        } catch (uploadError) {
            return NextResponse.json({
                success: false,
                message: uploadError.message
            },
                { status: 400 }
            )
        }

        const image = avatarResult.url
        const result = await signup({
            name,
            email,
            password,
            contactNumber,
            address,
            role,
            image,
            donorof,
            collectorType,
            noOfTeamMember,
            yourCollectingArea,
            ngoRegistrationNumber,
            certificateimage,
        })

        return result
    } catch (error) {
        console.error("Signup error:", error)
        return new Response("Something went wrong", { status: 500 })
    }
}
