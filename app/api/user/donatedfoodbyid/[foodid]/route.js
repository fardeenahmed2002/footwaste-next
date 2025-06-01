import { foodDetailsById } from "@/app/controllers/donatedFoodController"
import { userAuth } from "@/app/middlewares/userAuth"
// http://localhost:3000/api/user/donatedfoodbyid/.......
export const GET = async (req, { params }) => {
    try {
        const auth = await userAuth(req)
        if (!auth.authorized) {
            return NextResponse.json(
                { success: false, message: auth.error },
                { status: 401 }
            )
        }
        const { foodid } = params
        return foodDetailsById(auth.userid, foodid)
    } catch (error) {

    }
}