import mongoose from "mongoose";

const FreeFoodDonationSchema = new mongoose.Schema(
  {
    donorName: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    pickupTime: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    quantity: { type: String, required: true, trim: true },
    foodType: { type: String, required: true, trim: true },
    foodCategory: { type: String, required: true, trim: true },
    storageCondition: { type: String, required: true, trim: true },
    cookedTime: { type: String, required: true },
    imageOfDonatedFood: { type: String, required: true },
    tag: { type: String, default: "non-user" }
  },
  { timestamps: true }
);

const FreeFoodDonation =
  mongoose.models.FreeFoodDonation ||
  mongoose.model("FreeFoodDonation", FreeFoodDonationSchema);

export default FreeFoodDonation;
