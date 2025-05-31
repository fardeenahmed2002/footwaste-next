import { NextResponse } from "next/server"
import { DonatedFoodModel } from "../Models/DonatedFoods"
import { Usermodel } from "../Models/User"
export const postOfFoodDonation = async (formData, userid) => {
    const { title, description, quantity, location, expiryDate, foodsImage } = formData
    if (!userid) {
        return NextResponse.json({
            success: false,
            message: "unautorized"
        })
    }
    if (!title || !description || !quantity || !location || !expiryDate || !foodsImage) {
        return NextResponse.json({
            success: false,
            message: "All fields are required"
        }, { status: 400 })
    }
    try {
        const user = Usermodel.findById(userid)
        if (!user) {
            return NextResponse.json({
                message: "no user found",
                success: false
            })
        }
        const food = new DonatedFoodModel({
            title,
            description,
            quantity,
            location,
            expiryDate,
            imageOfDonatedFood: foodsImage,
            donorOfThisFood: userid
        })
        const donatedFood = await food.save()
        return NextResponse.json({
            success: true,
            message: 'Food donated successfully',
            donatedFood
        }, { status: 201 })
    } catch (error) {
        console.error("Donation failed:", error.message)
        return NextResponse.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 })
    }
}
