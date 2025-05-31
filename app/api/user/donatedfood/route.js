import { postOfFoodDonation } from "@/app/controllers/donatedFoodController"
import connectToDB from "@/app/Utils/database"
import { uploadDonatedFoods } from "@/app/Utils/uploadimage"
import { NextResponse } from "next/server"
import { userAuth } from "@/app/middlewares/userAuth"
// http://localhost:3000/api/user/donatedfood
export const POST = async (req) => {
    await connectToDB()
    try {
        const auth = await userAuth(req)
        if (!auth.authorized) {
            return NextResponse.json(
                { success: false, message: auth.error },
                { status: 401 }
            )
        }
        const formData = await req.formData()
        const title = formData.get('title')
        const quantity = formData.get('quantity')
        const location = formData.get('location')
        const expiryDate = formData.get('expiryDate')
        const description = formData.get('description')
        const imageOfDonatedFood = await uploadDonatedFoods(formData, 'imageOfDonatedFood', '')
        const foodsImage = imageOfDonatedFood
        const result = await postOfFoodDonation({
            title,
            description,
            location,
            expiryDate,
            foodsImage,
            quantity
        }, auth.userid)
        return result
    } catch (error) {
        console.error("donate error:", error)
        return new Response("Something went wrong", { status: 500 })
    }
}