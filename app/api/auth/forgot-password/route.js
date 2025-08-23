import { generateResetToken } from "@/app/controllers/authController"

export const POST = async (req) => {
    try {
        const { email } = await req.json()
        return generateResetToken(email)
    } catch (error) {
        console.log(error)
    }
}