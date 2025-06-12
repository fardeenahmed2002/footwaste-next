import mongoose from "mongoose"

const blogsSchema = new mongoose.Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    image: {
        type: String
    },
    blogger: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const BlogModel = mongoose.models.Blog || mongoose.model('Blog', blogsSchema)