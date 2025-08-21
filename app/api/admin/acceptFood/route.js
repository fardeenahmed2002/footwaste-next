import { accecptTheFood, getAccecptedFood } from "@/app/controllers/adminController"
import { userAuth } from "@/app/middlewares/userAuth"
import { NextResponse } from "next/server"
export const POST = async (req, res) => {
    try {
        const auth = await userAuth(req)
        const { id } = await req.json()
        if (!auth.authorized) {
            return NextResponse.json({
                success: false,
                message: `not authorized`
            })
        }

        return accecptTheFood(id)
    } catch (error) {
        console.error("donate error:", error)
        return NextResponse.json(
            { success: false, message: "Something went wrong" },
            { status: 500 }
        )
    }
}


export const GET = async () => {
    try {
        return getAccecptedFood()
    } catch (error) {
        console.error("donate error:", error)
        return NextResponse.json(
            { success: false, message: "Something went wrong" },
            { status: 500 }
        )
    }
}