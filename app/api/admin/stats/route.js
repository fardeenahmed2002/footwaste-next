import { getStatus } from "@/app/controllers/adminController"
import { userAuth } from "@/app/middlewares/userAuth"
import { NextResponse } from "next/server"

export const GET = async (req) => {
    try {
        const auth = await userAuth(req)
        if (!auth.authorized) {
            return NextResponse.json({
                success: false,
                message: `not authorized`
            }, { status: 401 })
        }
        return getStatus()
    } catch (error) {
        console.error("donate error:", error)
        return NextResponse.json(
            { success: false, message: "Something went wrong" },
            { status: 500 }
        )
    }
}