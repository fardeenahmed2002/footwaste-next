import { userAuth } from "@/app/middlewares/userAuth"
import connectToDB from "@/app/Utils/database"
import { sentVerifyOTPtoMail } from "@/app/controllers/authController"
// http://localhost:3000/api/auth/accountverification/sendOTPtoMail
export const POST = async (req) => {
    await connectToDB()
    try {
        const auth = await userAuth(req)
        if (!auth.authorized) {
            return NextResponse.json(
                { success: false, message: auth.error },
                { status: 401 }
            );
        }
        return sentVerifyOTPtoMail(auth.userid)
    } catch (error) {
        console.log(error.message)
    }
}

