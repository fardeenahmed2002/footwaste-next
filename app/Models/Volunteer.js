
import mongoose from "mongoose";

const VolunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contactNumber: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, default: "volunteer" },
  image: { type: String, default: null },
}, { timestamps: true });

const Volunteer = mongoose.models.Volunteer || mongoose.model("Volunteer", VolunteerSchema);

export default Volunteer;
