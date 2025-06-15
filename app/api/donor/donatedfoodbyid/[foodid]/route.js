import { deletefoodbyid, editDonatedfood, foodDetailsById } from "@/app/controllers/donatedFoodController"
import { userAuth } from "@/app/middlewares/userAuth"
import { uploadImage } from "@/app/Utils/uploadimage"
import { NextResponse } from "next/server"
// /api/donor/donatedfoodbyid/id
export const GET = async (req, { params }) => {
    try {
        const auth = await userAuth(req)
        if (!auth.authorized) {
            return NextResponse.json(
                { success: false, message: auth.error },
                { status: 401 }
            )
        }
        const { foodid } = await params
        return foodDetailsById(auth.userid, foodid)
    } catch (error) {
        console.error("updating error:", error)
        return new Response("Something went wrong", { status: 500 })
    }
}
// /api/donor/donatedfoodbyid/id
export const PUT = async (req, { params }) => {
    try {
        const auth = await userAuth(req)
        if (!auth.authorized) {
            return NextResponse.json(
                { success: false, message: auth.error },
                { status: 401 }
            )
        }
        const { foodid } = await params
        const formData = await req.formData()
        const title = formData.get('title')
        const quantity = formData.get('quantity')
        const location = formData.get('location')
        const expiryDate = formData.get('expiryDate')
        const description = formData.get('description')
        let imageOfDonatedFood
        try {
            imageOfDonatedFood = await uploadImage(formData, 'imageOfDonatedFood', 'donated-foods')
        } catch (uploadError) {
            return NextResponse.json({
                success: false,
                message: uploadError.message
            },
                { status: 400 }
            )
        }
        const result = await editDonatedfood({
            title,
            description,
            location,
            expiryDate,
            imageOfDonatedFood,
            quantity
        }, auth.userid, foodid)
        return result
    } catch (error) {
        console.error("updating error:", error)
        return new Response("Something went wrong", { status: 500 })
    }
}
// /api/donor/donatedfoodbyid/id
export const DELETE = async (req, { params }) => {
    try {
        const { foodid } = await params
        const auth = await userAuth(req)
        if (!auth.authorized) {
            return NextResponse.json(
                { success: false, message: auth.error },
                { status: 401 }
            )
        }
        return deletefoodbyid(auth.userid, foodid)
    } catch (error) {
        console.error("updating error:", error)
        return new Response("Something went wrong", { status: 500 })
    }
}