
import { postday } from "@/app/controllers/collectorController"
import { userAuth } from "@/app/middlewares/userAuth"
import { uploadImage } from "@/app/Utils/uploadimage"
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
        const formData = await req.formData();
        const title = formData.get("title");
        const content = formData.get("content");
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

        const result = await postday({
            title, content, image
        }, auth.userid)
        return result
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: `server error`
        })
    }
}