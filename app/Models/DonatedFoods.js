import mongoose from "mongoose"
const donatedFoodsSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String
    },
    quantity: {
        type: String,
    },
    location: {
        type: String,
    },
    expiryDate: {
        type: Date,
    },
    pickupTime: {
        type: String
    },
    foodType: {
        type: String
    },
    foodCategory: {
        type: String
    },
    storageCondition: {
        type: String
    },
    imageOfDonatedFood: {
        type: String
    },
    donorOfThisFood: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    },
    pickedBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        default: null
    },
    status: {
        type: String,
        default: 'pending....'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const DonatedFoodModel = mongoose.models.DonatedFoods || mongoose.model("DonatedFoods", donatedFoodsSchema)
