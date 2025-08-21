import { getallbitters } from "@/app/controllers/userController"

export const GET = async ({ params }) => {
    try {
        await connectToDB()
        const { foodid } = await params
        return getallbitters(foodid)
    } catch (error) {
        console.error("Error fetching food:", error)

    }
}
