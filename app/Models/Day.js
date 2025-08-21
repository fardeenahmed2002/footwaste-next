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
    stars: {
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
    }
})

export const DayModel = mongoose.models.Day || mongoose.model('Day', daysSchema)