import mongoose from "mongoose"

const commentsSchema = new mongoose.Schema({
    comment: {
        type: String
    },
    commenter: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    },
    post: {
        type: mongoose.Schema.Types.ObjectId, ref: "Day"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const Comment = mongoose.models.Comment || mongoose.model('Comment', commentsSchema)