import { NextResponse } from "next/server"
import { Usermodel } from "../Models/User"

export const clearNotificationCount = async (id) => {
    try {
        const user = await Usermodel.findByIdAndUpdate(
            id,
            { notificationcount: 0 },
            { new: true }
        )

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 404 })
        }

        return NextResponse.json({
            success: true,
            message: "Notification count cleared",
            user
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json({
            success: false,
            message: "Server error"
        }, { status: 500 })
    }
}



export const deletenotification = async (userid, indexToRemove) => {
    try {
        if (!userid) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            )
        }
        await Usermodel.findByIdAndUpdate(userid, {
            $unset: { [`notifications.${indexToRemove}`]: 1 }
        })

        const updatedUser = await Usermodel.findByIdAndUpdate(
            userid,
            { $pull: { notifications: null } },
            { new: true }
        )

        return NextResponse.json({
            success: true,
            message: 'Notification deleted successfully',
            notifications: updatedUser.notifications
        })
    } catch (error) {
        console.error('Error deleting notification:', error)
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        )
    }
}