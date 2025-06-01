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
        const user = await Usermodel.findById(userid).select('-password')
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
        user.donatedFoods.push(donatedFood._id)
        await user.save()
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

export const displayUsersDonatedFoods = async (userid) => {
    try {
        if (!userid) {
            return NextResponse.json({
                success: false,
                message: "not authorized"
            })
        }
        const user = await Usermodel.findById(userid).select('-password').populate('donatedFoods')
        if (!user) {
            return NextResponse.json({
                success: fale,
                message: "not no user found"
            })
        }
        if (!user.donatedFoods.length) {
            return NextResponse.json({
                success: false,
                message: "No donated food found"
            });
        }
        return NextResponse.json({
            success: true,
            message: "food found",
            food: user.donatedFoods
        })
    } catch (error) {
        console.error("food fetching failed", error.message)
        return NextResponse.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 })
    }
}

export const foodDetailsById = async (userid, foodid) => {
    try {
        if (!userid) {
            return NextResponse.json({
                success: false,
                message: "not authorized"
            })
        }
        if (!foodid) {
            return NextResponse.json({
                success: false,
                message: "no food id found"
            })
        }
        const food = await DonatedFoodModel.findById(foodid)
        if (!food) {
            return NextResponse.json({
                success: false,
                message: "no food details found",
                
            })
        }
        return NextResponse.json({
            success: true,
            message: "food found",
            food
        })
    } catch (error) {
        console.error("food details fetching failed", error.message)
        return NextResponse.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 })
    }
}