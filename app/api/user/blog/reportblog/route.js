import { removenotific } from "@/app/controllers/blogController"
import { userAuth } from "@/app/middlewares/userAuth"
import connectToDB from "@/app/Utils/database"
// /api/user/blog/reportblog
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
        return removenotific(auth.userid)
    } catch (error) {

    }
}