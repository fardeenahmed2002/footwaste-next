import { ban } from "@/app/controllers/adminController"
import { userAuth } from "@/app/middlewares/userAuth"
import { NextResponse } from "next/server"
export const POST = async (req) => {
    try {
        const auth = await userAuth(req)
        const { userID } = await req.json()
        if (!auth.authorized) {
            return NextResponse.json({
                success: false,
                message: `not authorized`
            }, { status: 401 })
        }
        return ban(userID)
    } catch (error) {
        console.log(error)
        console.error("donate error:", error)
                return NextResponse.json(
                    { success: false, message: "Something went wrong" },
                    { status: 500 }
                )
    }
}