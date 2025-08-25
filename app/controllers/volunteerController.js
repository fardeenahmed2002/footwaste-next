import Volunteer from "../Models/Volunteer";
import { NextResponse } from "next/server";

export const addVolunteer = async (data) => {
  try {
    const newVolunteer = new Volunteer(data);
    await newVolunteer.save();

    return NextResponse.json(
      { success: true, message: "Volunteer added successfully", data: newVolunteer },
      { status: 201 }
    );
  } catch (error) {
    console.error("Add Volunteer Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to add volunteer", error: error.message },
      { status: 500 }
    );
  }
};
