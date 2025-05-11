import { NextResponse } from "next/server"
import { Usermodel } from "../Models/User"


export const getUserData = async (userid) => {
    try {

        const user = await Usermodel.findById(userid)
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "user not found"
            })
        }
        return NextResponse.json({
            success: true,
            message: 'user found',
            user
        })
    } catch (error) {
        console.log(error.message)
    }
}
