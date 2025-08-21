// app/models/donationModel.js
import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
    donorType: String,
    fullName: String,
    email: String,
    phone: String,
    address: String,
    amount: Number,
    message: String,
    selectedNgo: String,
    createdAt: { type: Date, default: Date.now },
});

const Donation = mongoose.models.Donation || mongoose.model("Donation", donationSchema);

export default Donation
