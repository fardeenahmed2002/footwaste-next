import { NextResponse } from "next/server"
import { DonatedFoodModel } from "../Models/DonatedFoods"
import { Usermodel } from "../Models/User"
import { deleteImage } from "../Utils/deleteimage"
export const postOfFoodDonation = async (formData, userid) => {
    const {
        title,
        description,
        quantity,
        location,
        expiryDate,
        imageOfDonatedFood,
        pickupTime,
        foodType,
        foodCategory,
        storageCondition
    } = formData;

    if (!userid) {
        return NextResponse.json({
            success: false,
            message: "unauthorized"
        });
    }

    try {
        const user = await Usermodel.findById(userid).select('-password');
        if (!user) {
            return NextResponse.json({
                message: "no user found",
                success: false
            });
        }

        if (!title || !description || !quantity || !location || !expiryDate || !imageOfDonatedFood) {
            return NextResponse.json({
                success: false,
                message: "All required fields must be filled"
            }, { status: 400 });
        }

        if (user.role === "donor") {
            if (!pickupTime || !foodType || !foodCategory || !storageCondition) {
                return NextResponse.json({
                    success: false,
                    message: "All required fields must be filled"
                }, { status: 400 });
            }
        }

        // Create the donated food
        const food = new DonatedFoodModel({
            title,
            description,
            quantity,
            location,
            expiryDate,
            imageOfDonatedFood,
            donorOfThisFood: userid,
            ...(user.role === "donor" && {
                pickupTime,
                foodType,
                foodCategory,
                storageCondition
            })
        });

        // Save the food donation
        const donatedFood = await food.save();

        // Reload and update the user
        const updatedUser = await Usermodel.findByIdAndUpdate(
            userid,
            {
                $inc: { totalDonatedFoods: 1 },
                $push: { donatedFoods: donatedFood._id }
            },
            { new: true } // to return updated user
        );

        // Calculate badge
        let badge = "";
        const count = updatedUser.totalDonatedFoods;
        if (count > 7000) badge = "💎 Diamond";
        else if (count > 3000) badge = "🥇 Gold";
        else if (count > 500) badge = "🥈 Silver";
        else if (count > 150) badge = "🥉 Bronze";

        // If badge changed, update it
        if (badge && updatedUser.donorBadge !== badge) {
            updatedUser.donorBadge = badge;
            updatedUser.notifications.push(`Congrates!! you have updated to ${badge}`)
            await updatedUser.save();
        }

        return NextResponse.json({
            success: true,
            message: 'Food donated successfully',
            donatedFood
        }, { status: 201 });

    } catch (error) {
        console.error("Donation failed:", error.message);
        return NextResponse.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 });
    }
};



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

export const editDonatedfood = async (formData, userid, foodid) => {
    try {
        const { title, description, quantity, location, expiryDate, imageOfDonatedFood } = formData

        if (!userid) {
            return NextResponse.json({ message: "no user found", success: false })
        }

        if (!foodid) {
            return NextResponse.json({ message: "no such name food found", success: false })
        }

        const getfood = await DonatedFoodModel.findById(foodid)
        if (!getfood) {
            return NextResponse.json({ success: false, message: "no food found by this id" })
        }
        const finalImage = imageOfDonatedFood || getfood.imageOfDonatedFood
        if (!title || !description || !quantity || !location || !expiryDate || !finalImage) {
            return NextResponse.json({
                success: false,
                message: "All fields are required"
            }, { status: 400 })
        }
        if (
            getfood.imageOfDonatedFood &&
            imageOfDonatedFood &&
            getfood.imageOfDonatedFood !== imageOfDonatedFood
        ) {
            const oldImage = getfood.imageOfDonatedFood;
            deleteImage(oldImage)
        }
        const updatedFood = await DonatedFoodModel.findByIdAndUpdate(
            foodid,
            {
                title,
                description,
                quantity,
                location,
                expiryDate,
                imageOfDonatedFood: finalImage
            },
            { new: true }
        )
        if (!updatedFood) {
            return NextResponse.json({ message: "no food found", success: false })
        }
        return NextResponse.json({
            message: "food updated successfully",
            success: true,
            food: updatedFood
        })
    } catch (error) {
        console.error("food updating failed", error.message)
        return NextResponse.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 })
    }
}
export const deletefoodbyid = async (userid, foodid) => {
    try {
        if (!userid) {
            return NextResponse.json({
                success: false,
                message: "no user found"
            })
        }
        if (!foodid) {
            return NextResponse.json({
                success: false,
                message: 'no food id found'
            })
        }
        const food = await DonatedFoodModel.findById(foodid)
        if (!food) {
            return NextResponse.json({
                success: false,
                message: "no food found"
            })
        }
        const foodTODetete = await DonatedFoodModel.findByIdAndDelete(foodid)
        const oldImage = foodTODetete.imageOfDonatedFood
        deleteImage(oldImage)

        return NextResponse.json({
            success: true,
            message: `${foodTODetete.title} is deteleted successfully`
        })
    } catch (error) {
        console.error("food deleting failed", error.message)
        return NextResponse.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 })
    }
}