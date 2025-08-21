
import { NextResponse } from "next/server"
import { DonatedFoodModel } from "../Models/DonatedFoods"
import Organization from "../Models/Organization"
import { Usermodel } from "../Models/User"

export const getStatus = async () => {
    try {
        const totalUsers = await Usermodel.countDocuments({ role: `user` })
        const totalNgos = await Usermodel.countDocuments({ role: `collector` })
        const totalDonors = await Usermodel.countDocuments({ role: `donor` })
        const totalOrgs = await Usermodel.countDocuments({ role: `organization` })
        const newNgos = await Usermodel.countDocuments({ role: `collector`, isVerified: false })
        const totalBannedUsers = await Usermodel.countDocuments({ isBanned: true })
        const totalFoods = await DonatedFoodModel.countDocuments({ isApproved: "pending" })
        return NextResponse.json({
            success: true,
            message: `data found`,
            totalUsers,
            totalDonors,
            totalNgos,
            totalOrgs,
            newNgos,
            totalBannedUsers,
            totalFoods
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: `server error`
        }, { statur: 500 })
    }
}



export const getUsers = async (searchvalue) => {
    try {
        const searchRegex = new RegExp('.*' + searchvalue + '.*', 'i')
        const conditions = {
            role: { $in: ['user', 'collector'] },
            $or: [
                { name: { $regex: searchRegex } },
                { email: { $regex: searchRegex } },]
        }
        const usersData = await Usermodel.find(conditions, { password: 0 })
        return NextResponse.json({
            success: true,
            message: `userdata found`,
            usersData
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: `server error`
        }, { status: 500 })
    }
}

export const ban = async (userid) => {
    try {
        if (!userid) {
            return NextResponse.json({
                success: false,
                message: "No user found",
            })
        }


        const user = await Usermodel.findByIdAndUpdate(
            userid,
            { isBanned: true },
            { new: true }
        )

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found",
            })
        }

        return NextResponse.json({
            success: true,
            message: "User suspended",
            user,
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
        )
    }
}


export const unban = async (userid) => {
    try {
        if (!userid) {
            return NextResponse.json({
                success: false,
                message: "No user found",
            })
        }
        const getUser = await Usermodel.findById(userid)

        if (!getUser.isBanned) {
            return NextResponse.json({
                success: false,
                message: `user is already unbanned`
            })
        }

        const user = await Usermodel.findByIdAndUpdate(
            userid,
            { isBanned: false },
            { new: true }
        )

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found",
            })
        }

        return NextResponse.json({
            success: true,
            message: "User suspended",
            user,
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
        )
    }
}


export const getNGOs = async () => {
    try {
        const ngos = await Usermodel.find({ role: `collector`, isVerified: false })

        return NextResponse.json({
            success: true,
            message: `found`,
            ngos,
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
        )
    }
}


export const showFoods = async () => {
    try {
        const foods = await DonatedFoodModel.find({ isApproved: "pending" })
        return NextResponse.json({
            success: true,
            message: `food got`,
            foods
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
        )
    }
}


export const getFoodDetails = async (foodid) => {
    try {
        const getDetails = await DonatedFoodModel.findById(foodid)
            .populate("donorOfThisFood", "name email contactNumber address")

        if (!getDetails) {
            return NextResponse.json({
                success: false,
                message: "Food not found"
            }, { status: 404 })
        }

        return NextResponse.json({
            success: true,
            message: `got it`,
            food: getDetails
        })

    } catch (error) {
        console.error(error)
        return NextResponse.json({
            success: false,
            message: "server error"
        }, { status: 500 })
    }
}


export const accecptTheFood = async (id) => {
    try {
        const acceptedFood = await DonatedFoodModel.findByIdAndUpdate(
            id,
            {
                isApproved: "approved",
                status: "APPROVED"
            },
            { new: true }
        )

        if (!acceptedFood) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Food not found"
                }
                , { status: 404 })
        }

        const donorId = acceptedFood.donorOfThisFood
        const user = await Usermodel.findById(donorId)
        if (user) {
            const notif = `Your food "${acceptedFood.title}" was accepted successfully.`;
            user.notifications.push(notif)
            user.notificationcount += 1
            await user.save()
        }

        return NextResponse.json({
            success: true,
            message: "Food accepted successfully",
            acceptedFood
        })

    } catch (error) {
        console.error(error)
        return NextResponse.json({
            success: false,
            message: "Server error"
        }, { status: 500 })
    }
}



export const rejectTheFood = async (id, reason) => {
    try {
        const food = await DonatedFoodModel.findByIdAndUpdate(
            id,
            { isApproved: "rejected" },
            { new: true }
        ).populate("donorOfThisFood")

        if (!food) {
            return NextResponse.json(
                { success: false, message: "Food not found" },
                { status: 404 }
            )
        }
        const donorId = food.donorOfThisFood
        const user = await Usermodel.findById(donorId)
        if (user) {
            user.notifications.push(reason)
            await user.save()
        }

        return NextResponse.json({
            success: true,
            message: "Food rejected successfully"
        })

    } catch (error) {
        console.error(error)
        return NextResponse.json(
            {
                success: false,
                message: "Server error"
            },
            { status: 500 }
        )
    }
}



export const getAccecptedFood = async () => {
    try {
        const foods = await DonatedFoodModel.find({ isApproved: "approved" })
        return NextResponse.json({
            success: true,
            message: `food got`,
            foods
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            {
                success: false,
                message: "Server error"
            },
            { status: 500 }
        )

    }
}
export const getRejectedFood = async () => {
    try {
        const foods = await DonatedFoodModel.find({ isApproved: "rejected" })
        return NextResponse.json({
            success: true,
            message: `food got`,
            foods
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            {
                success: false,
                message: "Server error"
            },
            { status: 500 }
        )

    }
}

export const addOrganization = async (data) => {
    try {
        const { titleBn, titleEn, descBn, descEn, siteLink, logo } = data;

        if (!titleBn || !titleEn || !siteLink) {
            return NextResponse.json(
                { success: false, message: "Required fields are missing!" },
                { status: 400 }
            );
        }

        const newOrg = await Organization.create({
            titleBn,
            titleEn,
            descBn,
            descEn,
            siteLink,
            logo
        });

        return NextResponse.json({
            success: true,
            message: "Organization added successfully!",
            organization: newOrg
        })

    } catch (err) {
        console.error("Error in addOrganization controller:", err)
        return NextResponse.json(
            { success: false, message: "Something went wrong" },
            { status: 500 }
        );
    }
};
