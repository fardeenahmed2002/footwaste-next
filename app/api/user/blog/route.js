import { displayUsersBlogPost, postBlog } from "@/app/controllers/blogController"
import { userAuth } from "@/app/middlewares/userAuth"
import connectToDB from "@/app/Utils/database"
import { uploadImage } from "@/app/Utils/uploadimage"
import { NextResponse } from "next/server"
// /api/user/blog
export const POST = async (req) => {
    try {
        await connectToDB()
        const auth = await userAuth(req)
        if (!auth.authorized) {
            return NextResponse.json(
                { success: false, message: auth.error },
                { status: 401 }
            )
        }
        const formData = await req.formData()
        const title = formData.get('title')
        const content = formData.get('content')

        let image
        try {
            image = await uploadImage(formData, 'image', 'blogs')
        } catch (uploadError) {
            return NextResponse.json({
                success: false,
                message: uploadError.message
            },
                { status: 400 }
            )
        }
        const result = await postBlog({
            title, content, image
        }, auth.userid)
        return result
    } catch (error) {
        console.error("blog error:", error)
        return new Response("Something went wrong", { status: 500 })
    }
}
// /api/user/blog
export const GET = async (req) => {
    try {
        await connectToDB()
        const auth = await userAuth(req)
        if (!auth.authorized) {
            return NextResponse.json(
                { success: false, message: auth.error },
                { status: 401 }
            )
        }
        return displayUsersBlogPost(auth.userid)
    } catch (error) {
        console.error("blog error:", error)
        return new Response("Something went wrong", { status: 500 })
    }
}