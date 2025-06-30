import { getfoodDetails } from "@/app/controllers/collectorController"
import connectToDB from "@/app/Utils/database"

export const GET = async (req, { params }) => {
    try {
        await connectToDB()
        const { id } = await params
        return getfoodDetails(id)
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Server error"
        },
            { status: 500 })
    }
}