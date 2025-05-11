import { isLoggedIn, login } from "@/app/controllers/authController";
import connectToDB from "@/app/Utils/database";
import { userAuth } from "@/app/middlewares/userAuth";
import { NextResponse } from "next/server";
// http://localhost:3000/api/auth/login
export const POST = async (req) => {
    await connectToDB()
    try {
        return login(req)
    } catch (error) {
        console.log(error.message)
    }
}

export const GET = async (req) => {
    try {
        const auth = await userAuth(req)
        if (!auth.authorized) {
            return NextResponse.json(
                { success: false, message: auth.error },
                { status: 401 }
            );
        }
        return isLoggedIn(req)
    } catch (error) {
        console.log(error.message)
    }
}