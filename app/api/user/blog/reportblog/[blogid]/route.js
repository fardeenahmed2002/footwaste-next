import { getBlogsById, reportblogbyid } from "@/app/controllers/blogController"
import connectToDB from "@/app/Utils/database"
// /api/user/blog/reportblog/id
export const GET = async (req, { params }) => {
    try {
        await connectToDB()
        const { blogid } = await params

        return getBlogsById(blogid)
    } catch (error) {
        console.error("blog error:", error)
        return new Response("Something went wrong", { status: 500 })
    }
}
// /api/user/blog/reportblog/id
export const POST = async (req, { params }) => {
    try {
        await connectToDB()
        const { blogid } = await params
        const { report, userid } = await req.json()

        return reportblogbyid(userid, blogid, report)
    } catch (error) {
        console.error("blog error:", error)
        return new Response("Something went wrong", { status: 500 })
    }
}