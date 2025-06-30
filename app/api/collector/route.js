import { getalldonatedfoodpost, receiveAFood } from "@/app/controllers/collectorController"
import connectToDB from "@/app/Utils/database"
import { userAuth } from "@/app/middlewares/userAuth"
export const GET = async (req) => {
    try {
        await connectToDB()
        return getalldonatedfoodpost(req)
    } catch (error) {
        console.log(error)
    }

}

export const PUT = async (req) => {
    try {
        await connectToDB()
        const { foodid } =await req.json()
        const auth = await userAuth(req)
        if (!auth.authorized) {
            return NextResponse.json(
                { success: false, message: auth.error },
                { status: 401 }
            );
        }
        return receiveAFood(auth.userid, foodid)
    } catch (error) {
        console.log(error)
    }
}