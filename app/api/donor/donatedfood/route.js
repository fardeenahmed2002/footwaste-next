import { displayUsersDonatedFoods, postOfFoodDonation } from "@/app/controllers/donatedFoodController"
import connectToDB from "@/app/Utils/database"
import { uploadDonatedFoods } from "@/app/Utils/uploadimage"
import { NextResponse } from "next/server"
import { userAuth } from "@/app/middlewares/userAuth"
// /api/donor/donatedfood
export const POST = async (req) => {
    await connectToDB();
    try {
        const auth = await userAuth(req);
        if (!auth.authorized) {
            return NextResponse.json(
                { success: false, message: auth.error },
                { status: 401 }
            );
        }

        const formData = await req.formData()
        const title = formData.get('title')
        const quantity = formData.get('quantity')
        const location = formData.get('location')
        const expiryDate = formData.get('expiryDate')
        const description = formData.get('description')
        const pickupTime = formData.get('pickupTime')
        const foodType = formData.get('foodType')
        const foodCategory = formData.get('foodCategory')
        const storageCondition = formData.get('storageCondition')

        const imageOfDonatedFood = await uploadDonatedFoods(formData, 'imageOfDonatedFood', '')

        const result = await postOfFoodDonation({
            title,
            description,
            location,
            expiryDate,
            pickupTime,
            foodType,
            foodCategory,
            storageCondition,
            imageOfDonatedFood,
            quantity
        }, auth.userid)

        return result;
    } catch (error) {
        console.error("donate error:", error)
        return new Response("Something went wrong", { status: 500 })
    }
};

// /api/user/donatedfood
export const GET = async (req) => {
    try {
        const auth = await userAuth(req)
        if (!auth.authorized) {
            return NextResponse.json(
                { success: false, message: auth.error },
                { status: 401 }
            )
        }
        return displayUsersDonatedFoods(auth.userid)
    } catch (error) {
        console.error("error to find foods:", error)
        return new Response("Something went wrong", { status: 500 })
    }
}