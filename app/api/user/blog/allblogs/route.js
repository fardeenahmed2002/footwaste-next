import { getAllBlogs } from "@/app/controllers/blogController"
import connectToDB from "@/app/Utils/database"
// /api/user/blog/allblogs
export const GET = async () => {
    await connectToDB()
    const result = await getAllBlogs()
    return result
}