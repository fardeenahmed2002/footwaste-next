import { requestToReceiveFood, showRequestedFoodToReveive } from "@/app/controllers/collectorController"
import { userAuth } from "@/app/middlewares/userAuth"
import { NextResponse } from "next/server"

export const POST = async (req) => {
    try {
        const auth = await userAuth(req)
        const { foodID } = await req.json()
        if (!auth.authorized) {
            return NextResponse.json({
                success: false,
                message: `not authorized`
            })
        }
        return requestToReceiveFood(auth.userid, foodID)
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: `server error`
        })
    }
}


export const GET = async (req) => {
    try {
        const auth = await userAuth(req)
        if (!auth.authorized) {
            return NextResponse.json({
                success: false,
                message: `not authorized`
            })
        }
        return showRequestedFoodToReveive(auth.userid)
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: `server error`
        })
    }
}