import { deleteABlog } from "@/app/controllers/blogController"
import { userAuth } from "@/app/middlewares/userAuth"
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