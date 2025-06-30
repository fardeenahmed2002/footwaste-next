import { NextResponse } from "next/server"
import { DonatedFoodModel } from "../Models/DonatedFoods"
import { Usermodel } from "../Models/User"

export const getalldonatedfoodpost = async () => {
  try {
    const posts = await DonatedFoodModel.find().sort({ createdAt: -1 }).populate({ path: 'pickedBy', select: 'name' })
    return NextResponse.json({
      success: true,
      message: `food post found`,
      posts
    })
  } catch (error) {
    console.error("food getting error", error.message)
    return NextResponse.json({
      success: false,
      message: "Internal server error"
    }, { status: 500 })
  }
}

export const getfoodDetails = async (id) => {
  try {
    if (!id) {
      return NextResponse.json({
        message: 'no food id found',
        success: false
      })
    }
    const food = await DonatedFoodModel.findById(id).populate({ path: 'donorOfThisFood', select: 'name email address _id' })

    if (!food) {
      return NextResponse.json({
        success: false,
        message: 'no food found'
      })
    }
    return NextResponse.json({
      success: true,
      message: 'food details found',
      food
    })
  } catch (error) {
    console.error("food getting error", error.message)
    return NextResponse.json({
      success: false,
      message: "Internal server error"
    }, { status: 500 })
  }

}

export const receiveAFood = async (userid, foodid) => {
  try {
    if (!userid) {
      return NextResponse.json({
        success: false,
        message: 'not authed'
      });
    }

    if (!foodid) {
      return NextResponse.json({
        success: false,
        message: 'food id not found'
      });
    }

    const receiver = await Usermodel.findById(userid).select('-password');

    const newfood = await DonatedFoodModel.findByIdAndUpdate(
      foodid,
      { pickedBy: receiver._id },
      { new: true }
    );

    const receiversDetails = await DonatedFoodModel.findById(foodid).populate({
      path: 'pickedBy',
      select: 'name email'
    });

    const ORG = await Usermodel.findById(receiver.organizationID);
    const receiversORG = ORG?.name || "Unknown organization";

    return NextResponse.json({
      success: true,
      message: 'receiving.......',
      receiversDetails,
      receiversORG
    });
  } catch (error) {
    console.error("food getting error", error.message);
    return NextResponse.json({
      success: false,
      message: "Internal server error"
    }, { status: 500 });
  }
};
