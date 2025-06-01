import mongoose from "mongoose";
const donatedFoodsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "food name is required"]
    },
    quantity: {
        type: String,
        required: [true, "quantity is required"]
    },
    location: {
        type: String,
        required: [true, 'enter from where are u donating']
    },
    description: {
        type: String
    },
    expiryDate: {
        type: Date,
        required: [true, 'enter the expiry date']
    },
    imageOfDonatedFood: {
        type: String
    },
    donorOfThisFood: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const DonatedFoodModel = mongoose.models.DonatedFoods || mongoose.model("DonatedFoods", donatedFoodsSchema)
