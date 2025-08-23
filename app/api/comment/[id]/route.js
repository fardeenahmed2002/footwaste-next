import { getComments } from "@/app/controllers/CommentController"
import { NextResponse } from "next/server"

export const GET = async (req, { params }) => {
    try {
        const { id } = await params
        return getComments(id)
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: `server error`
        })
    }
}