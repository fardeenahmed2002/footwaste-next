import { rejectngo } from "@/app/controllers/adminController"

export const POST = async (req) => {
    try {
        const { id, reason } = await req.json()
        return rejectngo(id, reason)
    } catch (error) {
        console.log(error)
    }
}