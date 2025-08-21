import { NextResponse } from "next/server"
import { DonatedFoodModel } from "../Models/DonatedFoods"
import { Usermodel } from "../Models/User"


export const getUserData = async (userid) => {
    try {

        const user = await Usermodel.findById(userid)
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "user not found"
            })
        }
        return NextResponse.json({
            success: true,
            message: 'user found',
            user
        })
    } catch (error) {
        console.log(error.message)
    }
}



export const getallbitters = async (foodid) => {
    try {
        const food = await DonatedFoodModel.findById(foodid).populate("biter", "name image email")
        return NextResponse.json({
            success: true,
            message: "found",
            food,
        });
    } catch (error) {
        console.error("Controller Error:", error)
    }
}


export const acceptNGO = async (userid, ngoid, foodid) => {
    try {
        if (!ngoid) {
            return NextResponse.json({
                success: false,
                message: `id not found`
            })
        }
        const ngo = await Usermodel.findById(ngoid)
        const food = await DonatedFoodModel.findById(foodid)
        const user = await Usermodel.findById(userid)
        
        ngo.notifications.push(`Your request for collecting ${food.title} of ${user.name} has been approved.`)

        food.biter = []
        food.foodToPick = true
        food.save()
        await ngo.save()

        return NextResponse.json({
            success: true,
            message: "Notification sent to NGO"
        })
    } catch (error) {
        console.log(error.message)
    }
}


export const declineNGO = async (userid, ngoid, foodid) => {
    try {
        if (!ngoid || !foodid) {
            return NextResponse.json({
                success: false,
                message: "id not found"
            })
        }


        await DonatedFoodModel.findByIdAndUpdate(
            foodid,
            { $pull: { biter: ngoid } },
            { new: true }
        )

        const ngo = await Usermodel.findById(ngoid)
        if (ngo) {
            ngo.notifications.push(`Your request for food was declined.`)
            await ngo.save()
        }
        return NextResponse.json({
            success: true,
            message: "NGO declined successfully"
        })
    } catch (error) {
        console.error(error.message)
        return NextResponse.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 })
    }
}
