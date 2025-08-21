import { showFoods } from "@/app/controllers/adminController"
import { userAuth } from "@/app/middlewares/userAuth"
import { NextResponse } from "next/server"

export const GET = async (req) => {
    try {
        const auth = await userAuth(req)
        if (!auth.authorized) {
            return NextResponse.json({
                success: false,
                message: `not authorize`
            })
        }
        return showFoods()
    } catch (error) {
        console.error("donate error:", error)
                return NextResponse.json(
                    { success: false, message: "Something went wrong" },
                    { status: 500 }
                )
    }
}