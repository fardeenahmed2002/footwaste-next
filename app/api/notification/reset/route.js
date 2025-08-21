import { clearNotificationCount } from "@/app/controllers/notificationController"
import { userAuth } from "@/app/middlewares/userAuth"
import { NextResponse } from "next/server"

export const POST = async (req) => {
    try {
        const auth = await userAuth(req)
        if (!auth.authorized) {
            return NextResponse.json({
                success: false,
                message: `not authorized`
            })
        }
        return clearNotificationCount(auth.userid)
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: `server error`
        })
    }
}