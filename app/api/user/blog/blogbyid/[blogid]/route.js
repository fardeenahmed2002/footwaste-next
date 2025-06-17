import { deleteABlog, starTheBlog } from "@/app/controllers/blogController"
import { userAuth } from "@/app/middlewares/userAuth"
import { NextResponse } from "next/server"
// /api/user/blog/blogbyid/id
export const DELETE = async (req, { params }) => {
    try {
        const { blogid } = await params
        const auth = await userAuth(req)
        if (!auth.authorized) {
            return NextResponse.json(
                { success: false, message: auth.error },
                { status: 401 }
            )
        }
        return deleteABlog(auth.userid, blogid)
    } catch (error) {
        console.error("delete error:", error)
        return new Response("Something went wrong", { status: 500 })
    }
}

// /api/user/blog/blogbyid/id
export const POST = async (req, { params }) => {
    try {
        const body = await req.json()
        const { blogid } = await params
        const { status } = body
        const auth = await userAuth(req)
        if (!auth.authorized) {
            return NextResponse.json(
                { success: false, message: auth.error },
                { status: 401 }
            )
        }
        return starTheBlog(auth.userid, blogid, status)
    } catch (error) {
        console.error("ratting error:", error)
        return new Response("Something went wrong", { status: 500 })
    }

}