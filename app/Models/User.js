import mongoose from "mongoose";
import validator from "validator";
const bdPhoneRegex = /^(?:\+8801|01)[3-9]\d{8}$/;

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: "Invalid email format",
        },
    },
    password: {
        type: String,
        minLength: [3, "Min password length is 3"],
    },
    contactNumber: {
        type: String,
        required: [true, "Phone number is required"],
        unique: true,
        trim: true,
        match: [bdPhoneRegex, "Invalid phone number"],
    },
    address: String,
    verificationOtp: { type: String, default: "" },
    verificationOtpExpireAt: { type: Number, default: 0 },
    isVarified: { type: Boolean, default: false },
    resetOtp: { type: String, default: "" },
    resetOtpExpireAt: { type: Number, default: 0 },

    isAdmin: { type: Boolean, default: false },
    isUser: { type: Boolean, default: false },
    isCollector: { type: Boolean, default: false },
    isDonor: { type: Boolean, default: false },
    donorof: { type: String, default: '' },
    isBanned: { type: Boolean, default: false },
    banCount: { type: Number, default: 0 },
    role: { type: String, default: "" },
    collectorType: { type: String, default: "" },
    noOfTeamMember: { type: String, default: "" },
    ngoRegistrationNumber: { type: String, default: "" },
    yourCollectingArea: { type: String, default: "" },
    image: { type: String, default: '/uploads/person.png' },
    // donatedFoods: [{ type: mongoose.Schema.Types.ObjectId, ref: "foods" }],
    // saleFoods: [{ type: mongoose.Schema.Types.ObjectId, ref: "sellfoods" }],
    createdAt: { type: Date, default: Date.now },
});

export const Usermodel = mongoose.models.User || mongoose.model("User", userSchema);
