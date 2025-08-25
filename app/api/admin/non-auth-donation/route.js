import { getNonAuthDonation } from "@/app/controllers/adminController"
import connectToDB from "@/app/Utils/database"

export const GET = async()=>{
    try {
        await connectToDB()
        return getNonAuthDonation()
    } catch (error) {
        console.log(error)
    }
}