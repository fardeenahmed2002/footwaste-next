import { viewDays } from "@/app/controllers/collectorController"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        return viewDays()
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: `server error`
        })
    }

}