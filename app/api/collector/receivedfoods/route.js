import connectToDB from "@/app/Utils/database"
import { receivedfoods, receiveTheFoodbyCollector } from "@/app/controllers/collectorController"
import { userAuth } from "@/app/middlewares/userAuth"
import { NextResponse } from 'next/server';
export const GET = async (req) => {
    try {
        await connectToDB()
        const auth = await userAuth(req)
        if (!auth.authorized) {
            return NextResponse.json(
                { success: false, message: auth.error },
                { status: 401 }
            );
        }
        return receivedfoods(auth.userid)
    } catch (error) {
        console.log(error)
    }
}


export const PUT = async (req) => {
    try {
        await connectToDB()
        const { foodid } = await req.json()
        return receiveTheFoodbyCollector(foodid)
    } catch (error) {

    }
}