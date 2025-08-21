import { acceptNGO } from "@/app/controllers/userController"
import { userAuth } from "@/app/middlewares/userAuth"
import { NextResponse } from "next/server"

export const POST = async (req) => {
    try {
        const auth = await userAuth(req)
        const { ngoID, foodID } = await req.json()
        if (!auth.authorized) {
            return NextResponse.json({
                success: false,
                messge: `not authorized`
            })
        }
        return acceptNGO(auth.userid, ngoID, foodID)
    } catch (error) {
        console.log(error)
    }
}