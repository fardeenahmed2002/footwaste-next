import { postComment } from "@/app/controllers/CommentController"
import { userAuth } from "@/app/middlewares/userAuth"
import { NextResponse } from "next/server"

export const POST = async (req) => {
    try {
        const auth = await userAuth(req)
        if (!auth.authorized) {
            return NextResponse.json({
                success: false,
                message: `not authorized`
            })
        }
        const { comment, id } = await req.json()
        return postComment(comment, auth.userid, id)
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: `server error`
        })
    }
}