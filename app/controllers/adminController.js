
import { NextResponse } from "next/server"
import { DonatedFoodModel } from "../Models/DonatedFoods"
import Organization from "../Models/Organization"
import { Usermodel } from "../Models/User"
import transporter from "../Utils/nodemailer"
import { sentVerifyOTPtoMail } from "./authController"

export const getStatus = async () => {
    try {
        const totalUsers = await Usermodel.countDocuments({ role: `user` })
        const totalNgos = await Usermodel.countDocuments({ role: `collector` })
        const totalDonors = await Usermodel.countDocuments({ role: `donor` })
        const totalOrgs = await Usermodel.countDocuments({ role: `organization` })
        const newNgos = await Usermodel.countDocuments({ role: `collector`, isVerified: false })
        const totalBannedUsers = await Usermodel.countDocuments({ isBanned: true })
        const totalFoods = await DonatedFoodModel.countDocuments({ isApprovedByAdmin: "pending" })
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



export const detailsOFNGO = async (id) => {
    try {
        const ngo = await Usermodel.findById(id)
        if (!ngo) {
            return NextResponse.json({
                success: false,
                message: `no ngo found`
            })
        }
        return NextResponse.json({
            success: true,
            message: `ngo found`,
            ngo
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
        )
    }
}

export const acceptngo = async (id) => {
    try {
        if (!id) {
            return NextResponse.json({
                success: false,
                message: `no id found`
            })
        }
        const ngo = await Usermodel.findById(id)
        if (!ngo) {
            return NextResponse.json({
                success: false,
                message: `no ngo found`
            })
        }
        return sentVerifyOTPtoMail(id)

    } catch (error) {
        console.log(error)
    }
}

export const rejectngo = async (id, reason) => {
    try {
        const ngo = await Usermodel.findById(id)
        if (!ngo) {
            return NextResponse.json({
                success: false,
                message: `no ngo found`
            })
        }
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: ngo.email,
            subject: "এনজিও নিবন্ধন বাতিল হয়েছে",
            text: `প্রিয় ${ngo.name},

                        আমরা দুঃখের সঙ্গে জানাচ্ছি যে আপনার এনজিও যাচাইকরণ আবেদন এই মুহূর্তে অনুমোদিত হয়নি।
                        কারণ: ${reason || "আপনার আবেদন আমাদের প্রয়োজনীয় মানদণ্ড পূরণ করেনি।"}

                        আপনি প্রয়োজনীয় সংশোধন করে পুনরায় আবেদন করতে পারেন।

                        ধন্যবাদান্তে,
                        খাদ্য বাঁচাও দল`,
            html: `
                        <!DOCTYPE html>
                        <html lang="bn">
                        <body style="margin:0;padding:0;background:#f6f7fb;font-family:Arial,Helvetica,sans-serif;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                                <td align="center" style="padding:24px;">
                                <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;">
                                    <tr>
                                    <td style="background:#BB71FF;color:#fff;padding:20px 24px;text-align:center;font-size:18px;font-weight:700;">
                                        এনজিও যাচাইকরণ — সিদ্ধান্ত
                                    </td>
                                    </tr>
                                    <tr>
                                    <td style="padding:24px;color:#0f172a;font-size:15px;line-height:22px;">
                                        <p style="margin:0 0 12px 0;">প্রিয় <strong>${ngo.name}</strong>,</p>
                                        <p style="margin:0 0 12px 0;">
                                        আমরা দুঃখের সঙ্গে জানাচ্ছি যে আপনার এনজিও যাচাইকরণ আবেদন এই মুহূর্তে অনুমোদিত হয়নি।
                                        </p>
                                        <div style="margin:12px 0 16px 0;padding:12px 14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;">
                                        <strong>কারণ:</strong><br/>
                                        ${reason || "আপনার আবেদন আমাদের প্রয়োজনীয় মানদণ্ড পূরণ করেনি।"}
                                        </div>
                                        <p style="margin:0 0 16px 0;">
                                        আপনি প্রয়োজনীয় সংশোধন করে পুনরায় আবেদন করতে পারেন।
                                        </p>
                                        <p style="margin:0;color:#64748b;font-size:13px;">
                                        — খাদ্য বাঁচাও দল
                                        </p>
                                    </td>
                                    </tr>
                                    <tr>
                                    <td style="padding:16px 24px;border-top:1px solid #eef2f7;color:#94a3b8;font-size:12px;text-align:center;">
                                        © ${new Date().getFullYear()} খাদ্য বাঁচাও। সর্বস্বত্ব সংরক্ষিত।
                                    </td>
                                    </tr>
                                </table>
                                </td>
                            </tr>
                            </table>
                        </body>
                        </html>`
        }

        await transporter.sendMail(mailOptions)
        return NextResponse.json({
            success: true,
            message: `rejection message has sent to email`
        })
    } catch (error) {

    }
}

export const showFoods = async () => {
    try {
        const foods = await DonatedFoodModel.find({ isApprovedByAdmin: "pending" })
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
            .populate("donorOfThisFood", "name email contactNumber area")

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
                isApprovedByAdmin: "approved",
                status: "approved by Admin"
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
            { isApprovedByAdmin: "rejected" },
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
        const foods = await DonatedFoodModel.find({ isApprovedByAdmin: "approved" })
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
        const foods = await DonatedFoodModel.find({ isApprovedByAdmin: "rejected" })
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


export const getAllorgs = async () => {
    try {
        const organizations = await Organization.find().sort({ createdAt: -1 })
        return NextResponse.json({
            success: true,
            message: `orgs got`,
            organizations
        })
    }
    catch (error) {
        console.error("Error in addOrganization controller:", err)
        return NextResponse.json({
            success: false,
            message: "Something went wrong"
        },
            { status: 500 });
    }
}