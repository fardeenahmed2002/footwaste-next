import { NextResponse } from "next/server"
import { Usermodel } from "../Models/User"

export const getallchat = async (userid) => {
    try {
        if (!userid) {
            return NextResponse.json({
                success: false,
                message: "not authed"
            })
        }
        const chattedpersons = await Usermodel.findById(userid)
    } catch (error) {

    }
}