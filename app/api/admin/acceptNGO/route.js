import { acceptngo } from "@/app/controllers/adminController"

export const POST = async (req) => {
    try {
        const { id } = await req.json()
        return acceptngo(id)
    } catch (error) {
        console.log(error)
    }
}