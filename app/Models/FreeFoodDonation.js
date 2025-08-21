import mongoose from "mongoose";

const FreeFoodDonationSchema = new mongoose.Schema(
  {
    donorName: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    pickupLocation: { type: String, required: true, trim: true },
    time: { type: String, required: true },
    foodName: { type: String, required: true, trim: true },
    quantity: { type: String, required: true, trim: true },
    tag: { type: String, default: `non-user` }
  },
  { timestamps: true }
)

const FreeFoodDonation =
  mongoose.models.FreeFoodDonation ||
  mongoose.model("FreeFoodDonation", FreeFoodDonationSchema);

export default FreeFoodDonation
