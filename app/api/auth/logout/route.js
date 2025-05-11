import { logout } from "@/app/controllers/authController"
// http://localhost:3000/api/auth/logout
export const POST = async () => {
    try {
        return await logout()
    } catch (error) {
        console.log(error.message)
    }
}