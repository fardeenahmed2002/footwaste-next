
import { NextResponse } from "next/server";
import Donation from "../Models/Donation";
import connectToDB from "../Utils/database";

export const donate = async (data) => {
    try {
        await connectToDB();

        const newDonation = await Donation.create(data)

        return NextResponse.json({
            success: true,
            message: "Donation saved successfully",
            donation: newDonation,
        });
    } catch (err) {
        console.error("Error in donate handler:", err);
        return NextResponse.json(
            { success: false, message: "Failed to save donation" },
            { status: 500 }
        );
    }
};
