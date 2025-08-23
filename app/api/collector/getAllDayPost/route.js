import { getAllDayPost } from "@/app/controllers/collectorController"
import { userAuth } from "@/app/middlewares/userAuth"
import { NextResponse } from "next/server"

export const GET = async (req) => {
    try {
        const auth = await userAuth(req)
        if (!auth.authorized) {
            return NextResponse.json({
                success: false,
                message: `not authorized`
            })
        }
        return getAllDayPost(auth.userid)
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: `server error`
        })
    }
}