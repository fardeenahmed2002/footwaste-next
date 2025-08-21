import { getFoodDetails } from "@/app/controllers/adminController"
import { userAuth } from "@/app/middlewares/userAuth"
import { NextResponse } from "next/server"

export const GET = async (req, { params }) => {
    try {
        const auth = await userAuth(req)
        const { id } =await params
        if (!auth.authorized) {
            return NextResponse.json({
                success: false,
                message: `not authorized`
            })
        }
        return getFoodDetails(id)
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "server error"
        }, { status: 500 })
    }
}