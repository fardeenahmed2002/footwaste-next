import { receiveOTPfromUser } from "@/app/controllers/authController"
import { userAuth } from "@/app/middlewares/userAuth"
import connectToDB from "@/app/Utils/database"
// http://localhost:3000/api/auth/accountverification/receiveOTP
export const POST = async (req) => {
    await connectToDB()
    try {
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
        return receiveOTPfromUser(auth.userid, req)
    } catch (error) {
        console.log("Server Error:", error.message);
        return NextResponse.json({
            success: false,
            message: "Server error occurred",
            error: error.message
        }, { status: 500 });
    }
}