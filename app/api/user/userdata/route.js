import { getUserData } from "@/app/controllers/userController"
import connectToDB from "@/app/Utils/database"
import { NextResponse } from "next/server"
import { userAuth } from "@/app/middlewares/userAuth"

// http://localhost:3000/api/user/userdata
export const GET = async (req) => {
    try {
        const auth = await userAuth(req)
        if (!auth.authorized) {
            return NextResponse.json(
                {
                    success: false,
                    message: auth.error
                },
                { status: 401 }
            );
        }
        await connectToDB()
        return getUserData(auth.userid)

    } catch (error) {
        console.log(error.message)
    }
}