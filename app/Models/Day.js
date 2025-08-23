import mongoose from "mongoose"

const daysSchema = new mongoose.Schema({
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
    likes: {
        type: Number,
        default: 0
    },
    reportCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    comments: [{
        comment: { type: String },
        commenter: { type: String },
        image: { type: String }
    }],

    commentCount: { type: Number, default: 0 }
})

export const DayModel = mongoose.models.Day || mongoose.model('Day', daysSchema)