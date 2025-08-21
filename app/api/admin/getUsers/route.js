import { getUsers } from "@/app/controllers/adminController"
import { userAuth } from "@/app/middlewares/userAuth"
import { NextResponse } from "next/server"
export const GET = async (req) => {
    try {
        const auth = await userAuth(req)

        if (!auth.authorized) {
            return NextResponse.json({
                success: false,
                message: `not authorized`
            }, { status: 401 })
        }

        const url = new URL(req.url)
        const search = url.searchParams.get("search") || ""
        
        return getUsers(search)

    } catch (error) {
        console.log(error)
        console.error("donate error:", error)
                return NextResponse.json(
                    { success: false, message: "Something went wrong" },
                    { status: 500 }
                )
    }
}