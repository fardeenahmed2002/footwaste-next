import { getRejectedFood } from "@/app/controllers/adminController"

export const GET = async () => {
    try {
        return getRejectedFood()
    } catch (error) {
        console.error("donate error:", error)
        return NextResponse.json(
            { success: false, message: "Something went wrong" },
            { status: 500 }
        )
    }
}