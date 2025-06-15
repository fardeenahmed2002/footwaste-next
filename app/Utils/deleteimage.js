import fs from 'fs'
import path from 'path'
import { deleteFromCloudinary } from './cloudinary'

export const deleteImage = async (oldImage) => {
    if (oldImage.startsWith("https://res.cloudinary.com")) {
        await deleteFromCloudinary(oldImage)
    } else {
        const oldPath = path.join(process.cwd(), "public", oldImage)
        if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath)
        }
    }
}
