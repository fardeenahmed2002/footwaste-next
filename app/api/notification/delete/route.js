import { deletenotification } from "@/app/controllers/notificationController";
import { userAuth } from "@/app/middlewares/userAuth";
import connectToDB from "@/app/Utils/database";

// /api/notification/delete
export const POST = async (req) => {
    try {
        await connectToDB()
        const auth = await userAuth(req)
        if (!auth.authorized) {
            return NextResponse.json(
                {
                    success: false,
                    message: auth.error
                },
                { status: 401 }
            );
        }
        const { index } = await req.json()
        return deletenotification(auth.userid, index)
    } catch (error) {
        console.error("deleting error:", error)
        return new Response("Something went wrong", { status: 500 })
    }
}