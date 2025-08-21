import mongoose from "mongoose"

const OrganizationSchema = new mongoose.Schema(
  {
    titleBn: {
      type: String,
      required: true,
      trim: true,
    },
    titleEn: {
      type: String,
      required: true,
      trim: true,
    },
    descBn: {
      type: String,
      default: "",
      trim: true,
    },
    descEn: {
      type: String,
      default: "",
      trim: true,
    },
    siteLink: {
      type: String,
      required: true,
      trim: true,
    },
    logo: {
      type: String,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Organization =
  mongoose.models.Organization ||
  mongoose.model("Organization", OrganizationSchema);

export default Organization
