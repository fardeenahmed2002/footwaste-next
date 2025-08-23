import { updatePassword } from "@/app/controllers/authController"

export const POST = async (req, { params }) => {
    try {
        const { password } = await req.json()
        const { token } = params
        return updatePassword(token, password)
    } catch (error) {
        console.log(error)
    }
}