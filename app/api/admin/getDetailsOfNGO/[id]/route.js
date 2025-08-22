import { detailsOFNGO } from "@/app/controllers/adminController"

export const GET = async (req, { params }) => {
    try {
        const { id } = await params
        return detailsOFNGO(id)
    } catch (error) {
        console.log(error)
    }
}